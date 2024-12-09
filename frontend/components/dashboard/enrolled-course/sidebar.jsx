"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useQueryClient } from "@tanstack/react-query";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import useCourseStore from "hooks/use-course-store";
import apiClient from "lib/api-client";
import { formatVideoDuration } from "lib/format";
import { cn } from "lib/utils";
import { ArrowUpRight, ChevronUp, Loader2, VideoIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const LeftSideBar = ({
  courseId,
  progress,
  totalLessons,
  completedLessons,
  isLoading,
  courseData,
}) => {
  const {
    currentModuleId,
    currentLessonId,
    setNextModuleId,
    setNextLessonId,
    setPrevModuleId,
    setPrevLessonId,
    setDisablePrevBtn,
    setDisableNextBtn,
  } = useCourseStore();

  const queryClient = useQueryClient();

  const updateLessonCompletion = () => {
    queryClient.invalidateQueries("courseDetails");
  };

  useEffect(() => {
    if (courseData && courseData.modules && courseData.modules.length > 0) {
      const currentModuleIndex = courseData.modules.findIndex(
        (module) => module._id === currentModuleId,
      );

      if (currentModuleIndex !== -1) {
        const currentModule = courseData.modules[currentModuleIndex];
        const currentLessonIndex = currentModule.chapters.findIndex(
          (chapter) => chapter._id === currentLessonId,
        );

        if (currentLessonIndex !== -1) {
          if (currentLessonIndex === currentModule.chapters.length - 1) {
            if (currentModuleIndex < courseData.modules.length - 1) {
              const nextModule = courseData.modules
                .slice(currentModuleIndex + 1)
                .find((module) => module.chapters.length > 0);
              if (nextModule) {
                const nextLessonId = nextModule.chapters[0]._id;
                setNextModuleId(nextModule._id);
                setNextLessonId(nextLessonId);
                return;
              }
            }
          }
        }
        setNextModuleId(currentModuleId);
        if (
          currentLessonIndex !== -1 &&
          currentLessonIndex < currentModule.chapters.length - 1
        ) {
          const nextLessonId =
            currentModule.chapters[currentLessonIndex + 1]._id;
          setNextLessonId(nextLessonId);
        }
      }
    }
  }, [
    currentModuleId,
    currentLessonId,
    courseData,
    setNextModuleId,
    setNextLessonId,
  ]);

  useEffect(() => {
    if (courseData && courseData.modules && courseData.modules.length > 0) {
      const currentModuleIndex = courseData.modules.findIndex(
        (module) => module._id === currentModuleId,
      );

      if (currentModuleIndex !== -1) {
        const currentModule = courseData.modules[currentModuleIndex];
        const currentLessonIndex = currentModule.chapters.findIndex(
          (chapter) => chapter._id === currentLessonId,
        );

        if (currentLessonIndex !== -1) {
          if (currentLessonIndex === 0) {
            if (currentModuleIndex > 0) {
              const prevModule = courseData.modules
                .slice(0, currentModuleIndex)
                .reverse()
                .find((module) => module.chapters.length > 0);
              if (prevModule) {
                const prevLessonId =
                  prevModule.chapters[prevModule.chapters.length - 1]._id;
                setPrevModuleId(prevModule._id);
                setPrevLessonId(prevLessonId);
                return;
              }
            }
          }
        }
        setPrevModuleId(currentModuleId);
        if (currentLessonIndex !== -1 && currentLessonIndex > 0) {
          const prevLessonId =
            currentModule.chapters[currentLessonIndex - 1]._id;
          setPrevLessonId(prevLessonId);
        }
      }
    }
  }, [
    currentModuleId,
    currentLessonId,
    courseData,
    setPrevModuleId,
    setPrevLessonId,
  ]);

  useEffect(() => {
    if (courseData && courseData.modules && courseData.modules.length > 0) {
      const currentModuleIndex = courseData.modules.findIndex(
        (module) => module._id === currentModuleId,
      );

      if (currentModuleIndex !== -1) {
        const currentModule = courseData.modules[currentModuleIndex];
        const currentLessonIndex = currentModule.chapters.findIndex(
          (chapter) => chapter._id === currentLessonId,
        );

        // Check if the current lesson is not the first one
        if (currentLessonIndex > 0) {
          setDisablePrevBtn(false);
        } else {
          setDisablePrevBtn(true);
        }

        // Check if the current lesson is not the last one
        if (
          currentLessonIndex !== -1 &&
          currentLessonIndex < currentModule.chapters.length - 1
        ) {
          setDisableNextBtn(false);
        } else if (currentLessonIndex === currentModule.chapters.length - 1) {
          // Check if the current lesson is the last one in the module
          if (currentModuleIndex < courseData.modules.length - 1) {
            const nextModule = courseData.modules[currentModuleIndex + 1];
            if (nextModule && nextModule.chapters.length > 0) {
              setDisableNextBtn(false);
            } else {
              setDisableNextBtn(true);
            }
          } else {
            setDisableNextBtn(true);
          }
        } else {
          setDisableNextBtn(true);
        }
      }
    }
  }, [
    currentModuleId,
    currentLessonId,
    courseData,
    setDisablePrevBtn,
    setDisableNextBtn,
  ]);

  return (
    <div className="relative w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] py-6 lg:mt-[46px]">
      <h1 className="px-6 text-2xl font-semibold">Course Content</h1>

      {isLoading ? (
        <div className="mt-6 flex w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-sky-700" />
        </div>
      ) : (
        <>
          <div className="mt-3 px-6">
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2.5 rounded-full bg-[#8F00FF]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {completedLessons}/{totalLessons} lessons completed
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-y-4">
            {courseData?.modules?.map((module) => (
              <ModuleItem
                title={module.title}
                key={module._id}
                chapters={module.chapters}
                courseId={courseId}
                moduleId={module._id}
                updateLessonCompletion={updateLessonCompletion}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ModuleItem = ({
  title,
  chapters,
  courseId,
  moduleId,
  updateLessonCompletion,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentModuleId } = useCourseStore();

  useEffect(() => {
    if (moduleId === currentModuleId) {
      setIsOpen(true);
    }
  }, [moduleId, currentModuleId]);

  return (
    <div>
      <div
        className="flex cursor-pointer items-center gap-4 px-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronUp className={cn(isOpen ? "rotate-180" : "")} />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="flex flex-col gap-y-4">
        {isOpen &&
          chapters.map((lesson, index) => (
            <LessonItem
              title={lesson?.title}
              key={lesson?._id}
              index={index}
              courseId={courseId}
              moduleId={moduleId}
              lessonId={lesson?._id}
              isLive={lesson?.isLive}
              liveUrl={lesson?.liveUrl}
              isVideoCompleted={lesson.is_video_completed}
              isQuizCompleted={lesson?.is_quiz_completed}
              updateLessonCompletion={updateLessonCompletion}
              videoDuration={lesson?.videoDuration}
              quizQuestions={lesson?.quiz_questions}
              quizScore={lesson?.quiz_score}
            />
          ))}
      </div>
    </div>
  );
};

const LessonItem = ({
  title,
  index,
  courseId,
  moduleId,
  lessonId,
  isLive,
  liveUrl,
  isVideoCompleted,
  updateLessonCompletion,
  videoDuration,
  isQuizCompleted,
  quizQuestions,
  quizScore,
}) => {
  const { currentLessonId } = useCourseStore();
  const { authToken } = useUserAccessToken();

  const haveQuizes = quizQuestions > 0;

  const isActive = lessonId === currentLessonId;

  const onChange = async () => {
    if (!authToken) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      await apiClient.post(
        `/enrolled/course/${courseId}/modules/${moduleId}/chapters/${lessonId}/progress`,
        { is_video_completed: !isVideoCompleted },
        config,
      );

      updateLessonCompletion();
    } catch (error) {
      console.error(error);
    }
  };

  return isLive ? (
    <div
      className={cn(
        "flex w-full justify-between px-6 py-4 ",
        isActive ? "bg-[#17122E] text-white" : "",
      )}
    >
      <div className="flex">
        <div className="ml-6 max-w-xs">
          <h4 className="flex gap-2.5 text-base font-normal text-slate-500">
            <span>{index + 1}</span>
            {title}
          </h4>
        </div>
      </div>
      <Link
        href={liveUrl}
        target="_blank"
        className="flex items-center justify-center"
      >
        <p className="line-clamp-1 text-blue-600">Join</p>
        <ArrowUpRight className="h-5 w-5 text-blue-500" />
      </Link>
    </div>
  ) : (
    <Link
      className={cn(
        "flex w-full flex-col px-6 py-4",
        isActive ? "bg-[#8F00FF] text-white" : "",
      )}
      href={`/course/${courseId}/modules/${moduleId}/lessons/${lessonId}`}
    >
      <div className="flex w-full justify-between">
        <div className="flex">
          <div className="mr-1.5">
            <Checkbox
              // id="lesson"
              // checked={is_video_completed}
              // onCheckedChange={onChange}
              // checkClassName=""
              checked={isVideoCompleted && isQuizCompleted} // TODO:
              className={cn(
                "h-6 w-6 rounded-[5px] data-[state=checked]:bg-[#A94EFA]",
                isActive
                  ? "bg-white data-[state=checked]:bg-[#A94EFA]"
                  : "data-[state=checked]:bg-[#A94EFA]",
              )}
            />
          </div>
          <div className="max-w-xs">
            <h4 className="flex gap-2.5 text-base font-normal">
              <span>{index + 1}</span>
              {title}
            </h4>
          </div>
        </div>
        <div
          className={cn(
            "flex items-center justify-center gap-1.5",
            isActive ? "" : "text-[#64748B]",
          )}
        >
          <VideoIcon />
          <span className="text-sm">{formatVideoDuration(videoDuration)}</span>
        </div>
      </div>

      {isActive && (
        <div className="mx-auto mt-2 flex w-[75%] flex-col gap-y-3">
          <div className="flex items-center gap-4">
            <Checkbox
              id="lesson"
              checked={isVideoCompleted}
              onCheckedChange={onChange}
              checkClassName=""
              className={cn(
                "h-5 w-5 rounded-[5px] data-[state=checked]:bg-[#A94EFA]",
                isActive
                  ? "bg-white data-[state=checked]:bg-[#A94EFA]"
                  : "data-[state=checked]:bg-[#A94EFA]",
              )}
            />
            <span className="font-normal">Video assessment</span>
          </div>
          {haveQuizes && (
            <Link
              href={
                !isVideoCompleted
                  ? "#"
                  : `/course/${courseId}/modules/${moduleId}/lessons/${lessonId}/graded-quiz`
              }
              className="flex items-center justify-between"
              aria-disabled={true}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  // id="lesson"
                  // checked={is_video_completed}
                  // onCheckedChange={onChange}
                  // checkClassName=""
                  checked={isQuizCompleted}
                  disabled={!isVideoCompleted}
                  className={cn(
                    "h-5 w-5 rounded-[5px] data-[state=checked]:bg-[#A94EFA]",
                    isActive
                      ? "bg-white data-[state=checked]:bg-[#A94EFA]"
                      : "data-[state=checked]:bg-[#A94EFA]",
                  )}
                />
                <span className="font-normal">Graded Quiz</span>
              </div>
              <div>
                {quizScore}/{quizQuestions}
              </div>
            </Link>
          )}
        </div>
      )}
    </Link>
  );
};
