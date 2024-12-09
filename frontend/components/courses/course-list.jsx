"use client";

import React, { useEffect, useState } from "react";
// import { CourseCard } from "@/components/dashboard/search/cours-card"; // Corrected typo
import apiClient from "lib/api-client";
import { Loader2 } from "lucide-react";
import { CourseDetailsCard } from "../shared/card/course-details-card";
import { useRouter } from "next/navigation";
// import { ErrorToast } from "../error-toast";

export const CourseList = () => {
  const [courses, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCourses = async () => {
    try {
      const { data } = await apiClient.get("/get-all/courses");
      setCourse(data?.courses);
    } catch (error) {
      // ErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
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
    <div className="flex w-full flex-wrap items-center justify-center gap-5 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10">
      {courses.map((item) => (
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
