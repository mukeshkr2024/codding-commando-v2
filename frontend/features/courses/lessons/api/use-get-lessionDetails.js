import { ErrorToast } from "@/components/error-toast";
import { useQuery } from "@tanstack/react-query";
import { useAuthConfig } from "hooks/use-auth-config";
import apiClient from "lib/api-client";

export const useGetLessonDetails = (courseId, moduleId, lessonId) => {
  const config = useAuthConfig();

  const fetchLessonData = async () => {
    try {
      const { data } = await apiClient.get(
        `/enrolled/course/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
        config,
      );
      return data?.lesson;
    } catch (error) {
      ErrorToast(error.message);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["lessonData", courseId, moduleId, lessonId],
    queryFn: fetchLessonData,
    enabled: !!courseId && !!moduleId && !!lessonId,
  });
};
