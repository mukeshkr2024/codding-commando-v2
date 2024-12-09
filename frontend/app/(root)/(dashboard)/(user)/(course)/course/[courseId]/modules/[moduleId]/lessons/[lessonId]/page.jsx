"use client";

import VideoPlayer from "@/components/courseView/player";
import InstructorDetail from "@/components/dashboard/enrolled-course/instructor-details";
import { Button } from "@/components/ui/button";
import { useGetLessonDetails } from "features/courses/lessons/api/use-get-lessionDetails";
import useCourseStore from "hooks/use-course-store";
import { cn } from "lib/utils";
import { ArrowDownToLine, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const details = [
  { id: 1, title: "Details" },
  { id: 2, title: "Instructor" },
];

const mobileDetails = [
  { id: 1, title: "Curriculum" },
  { id: 2, title: "Details" },
  { id: 3, title: "Instructor" },
];

const LessonPage = ({ params }) => {
  const { courseId, moduleId, lessonId } = params;
  const [currentDetails, setCurrentDetails] = useState(1);
  const router = useRouter();

  const {
    setCurrentModuleId,
    setCurrentLessonId,
    currentMobileViewDetailId,
    setCurrentMobileViewDetailId,
    nextLessonId,
    nextModuleId,
    prevModuleId,
    prevLessonId,
    disablePrevBtn,
    disableNextBtn,
  } = useCourseStore();

  useEffect(() => {
    setCurrentModuleId(moduleId);
    setCurrentLessonId(lessonId);
  }, [courseId, moduleId, lessonId, setCurrentModuleId, setCurrentLessonId]);

  const { data: lessonData, isLoading } = useGetLessonDetails(
    courseId,
    moduleId,
    lessonId,
  );

  const handleNext = () => {
    if (nextLessonId && nextModuleId) {
      router.push(
        `/course/${courseId}/modules/${nextModuleId}/lessons/${nextLessonId}`,
      );
    }
  };

  const handlePrev = () => {
    if (prevLessonId && prevModuleId) {
      router.push(
        `/course/${courseId}/modules/${prevModuleId}/lessons/${prevLessonId}`,
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center lg:h-96">
        <Loader2 className="h-16 w-16 animate-spin text-sky-700" />
      </div>
    );
  }

  console.log(lessonData?.keyObjectives?.length);

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-4">
        <h3 className="text-2xl font-semibold">{lessonData?.title}</h3>
        {lessonData?.isLive ? (
          <div className="flex h-[400px] items-center justify-center">
            <Button className="flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600">
              <Link href={lessonData?.liveUrl} target="_blank">
                Join Live Class
              </Link>
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="aspect-video w-full overflow-hidden ">
            <VideoPlayer
              videoUrl={lessonData?.videoUrl}
              handleNext={handleNext}
              disabled={disableNextBtn}
            />
          </div>
        )}

        <div className="flex w-full items-center justify-between">
          <div className="flex w-full gap-3">
            <button
              className="w-28 rounded-[35px] border-2 border-[#000000] py-1.5 text-sm font-semibold sm:w-32 sm:text-base"
              onClick={handlePrev}
              disabled={disablePrevBtn}
            >
              Previous
            </button>
            <button
              className="w-28 rounded-[35px] border-2 border-[#000000] bg-[#000000] py-1.5 text-sm font-semibold text-white sm:w-32 sm:text-base"
              onClick={handleNext}
              disabled={disableNextBtn}
            >
              Next
            </button>
          </div>

          <div className="lg:hidden">
            {lessonData?.downloadUrl && (
              <Link href={lessonData?.downloadUrl} target="_blank">
                <button className="flex items-center justify-center gap-1 rounded-[47px] bg-[#000000] px-3 py-2 text-xs text-white sm:text-sm ">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#DFF993]">
                    <ArrowDownToLine className="h-3 w-3 text-black" />
                  </div>
                  Notes
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="flex w-full items-center justify-between">
            <div className="mt-2 gap-4 lg:flex">
              {details.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentDetails(item.id)}
                  className={cn(
                    "w-48 rounded-[47px] py-2 text-lg font-semibold",
                    item.id === currentDetails && "bg-[#000000] text-white ",
                  )}
                >
                  {item.title}
                </button>
              ))}
            </div>
            {lessonData?.downloadUrl && (
              <Link href={lessonData?.downloadUrl} target="_blank">
                <button className="flex w-52 items-center justify-center gap-6 rounded-[47px] bg-[#000000] p-2 text-base font-semibold text-white">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DFF993]">
                    <ArrowDownToLine className="h-6 w-6 text-black" />
                  </div>
                  Download Notes
                </button>
              </Link>
            )}
          </div>
          <div className="my-3 h-[1px] w-full bg-[#E2E8F0]" />
          {currentDetails === 1 && (
            <>
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-semibold">Course Overview</h4>
                <p className="text-base font-normal">
                  {lessonData?.description}
                </p>
              </div>
              {lessonData?.keyObjectives &&
                lessonData?.keyObjectives.length > 0 && (
                  <div className="mt-2.5 ">
                    <h4 className="text-xl font-semibold">
                      Key Learning Objectives
                    </h4>
                    <ul className="ml-2.5 mt-1 flex flex-col gap-y-1">
                      {lessonData?.keyObjectives?.map((objective) => (
                        <li
                          key={objective?._id}
                          className="text-sm font-normal"
                        >
                          {objective?.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </>
          )}

          {currentDetails === 2 &&
            lessonData?.mentors &&
            lessonData?.mentors.map((mentor) => (
              <InstructorDetail
                key={mentor?._id}
                name={mentor?.name}
                description={mentor?.description}
                imageUrl={mentor?.imageUrl}
                additionInfo={mentor?.additionInfo}
              />
            ))}
        </div>

        <div className="w-full lg:hidden">
          <div className="flex gap-6">
            {mobileDetails.map((item) => (
              <button
                key={item.id}
                className={cn(
                  "w-48 rounded-[47px] py-2 text-sm font-semibold sm:text-lg",
                  item.id === currentMobileViewDetailId &&
                    "bg-[#000000] text-white ",
                )}
                onClick={() => setCurrentMobileViewDetailId(item.id)}
              >
                <p>{item.title}</p>
              </button>
            ))}
          </div>

          {currentMobileViewDetailId === 2 && (
            <div className="mt-4 flex flex-col gap-2">
              <h4 className="text-xl font-semibold">Course Overview</h4>
              <p className="text-base font-normal">{lessonData?.description}</p>
            </div>
          )}

          <div className="mt-3">
            {currentMobileViewDetailId === 3 &&
              lessonData?.mentors &&
              lessonData?.mentors.map((mentor) => (
                <InstructorDetail
                  key={mentor?._id}
                  name={mentor?.name}
                  description={mentor?.description}
                  imageUrl={mentor?.imageUrl}
                  additionInfo={mentor?.additionInfo}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
