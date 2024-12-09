import { ErrorToast } from "@/components/error-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthConfig } from "hooks/use-auth-config";
import apiClient from "lib/api-client";
import toast from "react-hot-toast";

export const useUpdateQuizQuestion = (
  courseId,
  moduleId,
  lessonId,
  questionId,
) => {
  const config = useAuthConfig();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (questionData) => {
      await apiClient.patch(
        `/quiz-questions/${courseId}/modules/${moduleId}/lessons/${lessonId}/${questionId}`,
        questionData,
        config,
      );
      queryClient.invalidateQueries(["quiz-question"]);
    },
    onSuccess: () => {
      toast.success("Question Updated");
    },
    onError: (error) => {
      ErrorToast(error);
    },
  });

  return mutation;
};
