import { useQuery } from "@tanstack/react-query";
import { useAuthConfig } from "hooks/use-auth-config";
import apiClient from "lib/api-client";

export const useGetQuizQuestion = (
  courseId,
  moduleId,
  lessonId,
  questionId,
) => {
  const config = useAuthConfig();
  const query = useQuery({
    queryKey: ["quiz-question"],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/quiz-questions/${courseId}/modules/${moduleId}/lessons/${lessonId}/${questionId}`,
        config,
      );

      return data?.question;
    },
  });
  return query;
};
