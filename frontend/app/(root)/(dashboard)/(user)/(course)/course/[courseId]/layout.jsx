"use client";

import { ProtectedCourse } from "@/components/dashboard/enrolled-course/protected-course";
import { LeftSideBar } from "@/components/dashboard/enrolled-course/sidebar";
import { useGetCourseDetails } from "features/courses/api/use-get-course-details";
import { useCourseLessonData } from "features/courses/hooks/use-course-lesson-data";
import useCourseStore from "hooks/use-course-store";

const CourseIdLayout = ({ children, params }) => {
  const { currentMobileViewDetailId } = useCourseStore();
  const { totalLessons, completedLessons } = useCourseLessonData();

  const courseQuery = useGetCourseDetails(params?.courseId);

  const progress = totalLessons ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <ProtectedCourse>
      <div>
        <div className="flex w-full flex-col gap-4 px-2 py-6 sm:px-8 lg:flex-row">
          <div className="flex-1">{children}</div>
          {/* desktop view */}
          <div className="mt-2 hidden w-full sm:mt-0 lg:block lg:w-[430px]">
            <LeftSideBar
              courseId={params.courseId}
              progress={progress}
              totalLessons={totalLessons}
              completedLessons={completedLessons}
              isLoading={courseQuery.isLoading}
              courseData={courseQuery.data}
            />
          </div>
          <div className=" w-full sm:mt-4 lg:hidden">
            {currentMobileViewDetailId === 1 && (
              <div className=" w-full sm:mt-0 lg:hidden lg:w-[430px]">
                <LeftSideBar
                  courseId={params.courseId}
                  progress={progress}
                  totalLessons={totalLessons}
                  completedLessons={completedLessons}
                  isLoading={courseQuery.isLoading}
                  courseData={courseQuery.data}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedCourse>
  );
};

export default CourseIdLayout;
