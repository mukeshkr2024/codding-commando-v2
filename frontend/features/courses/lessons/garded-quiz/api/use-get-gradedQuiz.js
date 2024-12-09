import { ErrorToast } from "@/components/error-toast";
import { useQuery } from "@tanstack/react-query";
import { useAuthConfig } from "hooks/use-auth-config";
import apiClient from "lib/api-client";

export const useGetGradedQuizs = (courseId, moduleId, lessonId) => {
  const config = useAuthConfig();

  const fetchGradedQuizs = async () => {
    try {
      const { data } = await apiClient.get(
        `/enrolled/course/${courseId}/modules/${moduleId}/chapters/${lessonId}/graded-quiz`,
        config,
      );
      return data?.lesson;
    } catch (error) {
      ErrorToast(error);
    }
  };

  return useQuery({
    queryKey: ["gradedQuizs", courseId, moduleId, lessonId],
    queryFn: fetchGradedQuizs,
    enabled: !!courseId && !!moduleId && !!lessonId,
  });
};
