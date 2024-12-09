"use client";

import { Loader2 } from "lucide-react";
import { CourseDetailsCard } from "../shared/card/course-details-card";
import { useRouter } from "next/navigation";

export const WithoutEnrolledCourses = ({ courses, isLoading }) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="absolute right-0 top-0 flex size-full items-center justify-center rounded-md">
        <Loader2 className="size-16 animate-spin text-sky-700" />
      </div>
    );
  }

  const onClick = (courseId) => {
    if (!courseId) return;
    router.push(`/courses/${courseId}`);
  };

  return (
    <div className="mb-32 grid w-full gap-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-3 xl:gap-6 2xl:gap-12">
      {courses?.map((item) => (
        <CourseDetailsCard
          key={item?._id}
          title={item?.title}
          description={item?.description}
          courseImage={item?.imageUrl}
          onClick={onClick}
          courseId={item?._id}
          progress={50}
        />
      ))}
      {courses?.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          No courses found
        </div>
      )}
    </div>
  );
};
