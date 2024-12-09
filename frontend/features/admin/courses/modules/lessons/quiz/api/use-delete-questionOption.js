import { ErrorToast } from "@/components/error-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "lib/api-client";
import { config } from "process";
import toast from "react-hot-toast";

export const useDeleteQuestionOptions = (
  courseId,
  moduleId,
  lessonId,
  questionId,
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (optionId) => {
      await apiClient.delete(
        `/quiz-questions/options/${courseId}/modules/${moduleId}/lessons/${lessonId}/${questionId}/${optionId}`,
        config,
      );
      queryClient.invalidateQueries(["quiz-question"]);
    },
    onSuccess: () => {
      toast.success("Option deleted successfully");
    },
    onError: (error) => {
      ErrorToast(error);
    },
  });

  return mutation;
};
