import { useAuthConfig } from "hooks/use-auth-config";
import apiClient from "lib/api-client";
import { useCourseLessonData } from "../hooks/use-course-lesson-data";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseDetails = (courseId) => {
  const config = useAuthConfig();
  const { setTotalLessons, setCompletedLessons } = useCourseLessonData();

  const fetchCourseDetails = async () => {
    try {
      const { data } = await apiClient.get(
        `/enrolled/course/${courseId}/get-details`,
        config,
      );

      const total = data?.course.modules.reduce(
        (count, module) =>
          count + module.chapters.filter((lesson) => !lesson.isLive).length,
        0,
      );

      setTotalLessons(total);

      const completed = data?.course.modules.reduce(
        (count, module) =>
          count +
          module.chapters.filter(
            (lesson) => !lesson?.isLive && lesson?.is_video_completed,
          ).length,
        0,
      );

      setCompletedLessons(completed);

      return data?.course;
    } catch (error) {
      console.error(error);
    }
  };

  return useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: fetchCourseDetails,
    enabled: !!courseId,
  });
};
