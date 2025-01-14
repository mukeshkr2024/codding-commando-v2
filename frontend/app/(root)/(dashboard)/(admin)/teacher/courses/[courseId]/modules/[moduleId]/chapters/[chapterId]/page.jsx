"use client";

import { ChapterVideo } from "@/components//dashboard/courses/courseId/chapters/chapter-video";
import { Banner } from "@/components/banner";
import { ChapterTitleForm } from "@/components/dashboard/courses/courseId/chapters/ChapterTitle";
import { AttachDownloadClassLink } from "@/components/dashboard/courses/courseId/chapters/add-download-link";
import { AssignMentorToChapter } from "@/components/dashboard/courses/courseId/chapters/assign-mentor-to-chapter";
import { ChapterActions } from "@/components/dashboard/courses/courseId/chapters/chapter-actions";
import { ChapterDescriptionForm } from "@/components/dashboard/courses/courseId/chapters/chapter-description";
import { KeyLearningObjectives } from "@/components/dashboard/courses/courseId/chapters/key-objective-form";
import { AttachLiveClassLink } from "@/components/dashboard/courses/courseId/chapters/live-class-link";
import LiveClassToggle from "@/components/dashboard/courses/courseId/chapters/live-class-toggle";
import LiveClassTiming from "@/components/dashboard/courses/courseId/chapters/live-classes-timing";
import QuizQuestions from "@/components/dashboard/courses/courseId/chapters/quiz/quiz-questions";
import { ErrorToast } from "@/components/error-toast";
import { IconBadge } from "@/components/icon-bagde";
import LoadingAnimation from "@/components/shared/loading-animation";
import { Button } from "@/components/ui/button";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { ArrowLeft, BellIcon, LayoutDashboard, VideoIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgAttachment } from "react-icons/cg";

const ChapterIdPage = ({ params }) => {
  const [chapterData, setchapterData] = useState({});
  const { authToken } = useUserAccessToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const fetchChapterData = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await apiClient.get(
        `/courses/${params.courseId}/modules/${params.moduleId}/chapters/${params.chapterId}`,
        config,
      );

      setchapterData(data?.chapter);
    } catch (error) {
      ErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  }, [params.chapterId, params.courseId, params.moduleId, authToken]);

  useEffect(() => {
    fetchChapterData();
  }, [
    fetchChapterData,
    params.chapterId,
    params.courseId,
    params.moduleId,
    authToken,
  ]);

  const requiredFields = [
    chapterData?.title,
    chapterData?.description,
    chapterData?.isLive ? chapterData?.liveUrl : chapterData?.videoUrl,
    // chapterData?.mentors?.some((mentor) => mentor),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  const onUpdateSuccess = () => {
    fetchChapterData();
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const handleSendRemainder = async () => {
    try {
      setIsSending(true);
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await apiClient.post(
        `/courses/${params?.courseId}/modules/${params?.moduleId}/chapters/${params?.chapterId}/remainder-notifications`,
        config,
      );
      toast.success(`Remainder sent to ${data?.students} students `);
    } catch (error) {
      ErrorToast(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {!chapterData?.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is not published. It will not visible on the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}/modules/${params.moduleId}`}
              className="mb-6 flex items-center text-sm transition hover:opacity-75"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Module Setup
            </Link>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Setup</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                courseId={params?.courseId}
                moduleId={params?.moduleId}
                chapterId={params?.chapterId}
                isPublished={chapterData?.isPublished}
                disabled={!isComplete}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="space-y-4">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your Chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={chapterData}
                courseId={params.courseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                onUpdateSuccess={onUpdateSuccess}
              />
              {/* <AssignMentorToChapter
                initialData={chapterData}
                courseId={params.courseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                onUpdateSuccess={onUpdateSuccess}
              /> */}
              <LiveClassToggle
                initialData={chapterData}
                courseId={params.courseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                onUpdateSuccess={onUpdateSuccess}
              />
              <ChapterDescriptionForm
                initialData={chapterData}
                courseId={params.courseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                onUpdateSuccess={onUpdateSuccess}
              />
              <QuizQuestions
                questions={chapterData?.quiz_questions || []}
                courseId={params.courseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                onUpdateSuccess={onUpdateSuccess}
              />
            </div>
          </div>
          <div>
            {chapterData?.isLive ? (
              <div className="space-y-4">
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={CgAttachment} />
                  <h2 className="text-xl">Attach Live Class Link</h2>
                </div>
                <AttachLiveClassLink
                  initialData={chapterData}
                  courseId={params.courseId}
                  moduleId={params.moduleId}
                  chapterId={params.chapterId}
                  onUpdateSuccess={onUpdateSuccess}
                />
                {chapterData?.isPublished && (
                  <>
                    <div className="flex items-center gap-x-2">
                      <IconBadge icon={BellIcon} />
                      <h2 className="text-xl">Notifications</h2>
                    </div>

                    {chapterData?.live_date && chapterData?.live_time && (
                      <div className="rounded-md border bg-slate-100 p-4">
                        <Button
                          disabled={isSending}
                          onClick={handleSendRemainder}
                        >
                          Send Remainder{" "}
                        </Button>
                      </div>
                    )}
                    <LiveClassTiming
                      initialData={chapterData}
                      courseId={params.courseId}
                      moduleId={params.moduleId}
                      chapterId={params.chapterId}
                      onUpdateSuccess={onUpdateSuccess}
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={VideoIcon} />
                  <h2 className="text-xl">Chapter Video</h2>
                </div>
                <ChapterVideo
                  initialData={chapterData}
                  courseId={params.courseId}
                  moduleId={params.moduleId}
                  chapterId={params.chapterId}
                  onUpdateSuccess={onUpdateSuccess}
                />
                <KeyLearningObjectives
                  initialData={chapterData}
                  courseId={params.courseId}
                  moduleId={params.moduleId}
                  chapterId={params.chapterId}
                  onUpdateSuccess={onUpdateSuccess}
                />
              </div>
            )}
            <AttachDownloadClassLink
              initialData={chapterData}
              courseId={params.courseId}
              moduleId={params.moduleId}
              chapterId={params.chapterId}
              onUpdateSuccess={onUpdateSuccess}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
