import { CourseList } from "@/components/courses/course-list";
import { WelcomeCard } from "@/components/dashboard/welcome-card";

const SearchCourses = () => {
  return (
    <div className="w-full px-6 md:px-12 lg:px-16">
      <div className="mt-4 flex w-full flex-col gap-8 sm:flex-row">
        <div className="sm:mt-12">
          <WelcomeCard />
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col gap-3">
            <h3 className="text-xl font-semibold text-[#0F172A] sm:text-2xl">
              Courses
            </h3>
            <CourseList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCourses;
