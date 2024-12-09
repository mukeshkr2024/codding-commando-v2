import { ErrorToast } from "@/components/error-toast";
import { useMutation } from "@tanstack/react-query";
import { useAuthConfig } from "hooks/use-auth-config";
import apiClient from "lib/api-client";
import toast from "react-hot-toast";

export const useCreateQuizQuestion = (courseId, moduleId, lessonId) => {
  const config = useAuthConfig();

  const mutation = useMutation({
    mutationFn: async (questionData) => {
      await apiClient.post(
        `/quiz-questions/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
        questionData,
        config,
      );
    },
    onSuccess: () => {
      toast.success("Question created successfully");
    },
    onError: (error) => {
      ErrorToast(error);
    },
  });

  return mutation;
};
