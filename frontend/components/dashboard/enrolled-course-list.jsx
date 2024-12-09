import { Loader2 } from "lucide-react";
import { CourseDetailsCard } from "../shared/card/course-details-card";
import { useRouter } from "next/navigation";

export const EnrolledCourseList = ({ courses, isLoading }) => {
  const router = useRouter();

  const onClick = (courseId) => {
    if (!courseId) return;

    router.push(`/course/${courseId}`);
  };

  if (isLoading) {
    return (
      <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md">
        <Loader2 className="h-16 w-16 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <div className="w-full ">
      <div className="w-full">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-3 xl:gap-6 2xl:gap-12">
          {courses?.map((item) => (
            <CourseDetailsCard
              key={item?._id}
              courseId={item?._id}
              description={item?.description}
              title={item?.title}
              duration={item?.duration}
              courseImage={item?.imageUrl}
              onClick={onClick}
              progress={item?.progress}
              isEnrolled={true}
            />
          ))}
        </div>
        {courses?.length === 0 && (
          <div className="mt-10 text-center text-sm text-muted-foreground">
            No courses found
          </div>
        )}
      </div>
    </div>
  );
};
