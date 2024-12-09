"use client";

import { EnrolledCourseList } from "@/components/dashboard/enrolled-course-list";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { WithoutEnrolledCourses } from "@/components/dashboard/without-enrolled-courses";
import { useGetEnrolledCourses } from "features/courses/api/use-get-enrolled-courses";

const MyCoursesPage = () => {
  const { data, isLoading } = useGetEnrolledCourses();

  return (
    <div className="w-full px-6 md:px-12 lg:px-16">
      <div className="mt-4 flex w-full flex-col gap-8 sm:flex-row">
        <div className="sm:mt-12">
          <WelcomeCard />
        </div>
        <div className="flex w-full flex-col gap-5">
          <div
            className="flex
          min-h-[300px] flex-col gap-3"
          >
            <h3 className="text-xl font-semibold text-[#0F172A] sm:text-2xl">
              My Courses
            </h3>
            <EnrolledCourseList
              isLoading={isLoading}
              courses={data?.enrolled}
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <h3 className="text-xl font-semibold text-[#0F172A] sm:text-2xl">
              Recommended Courses
            </h3>
            <WithoutEnrolledCourses
              isLoading={isLoading}
              courses={data?.available}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesPage;
