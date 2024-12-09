import { ErrorToast } from "@/components/error-toast";
import { useMutation } from "@tanstack/react-query";
import { useAuthConfig } from "hooks/use-auth-config";
import apiClient from "lib/api-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useDeleteQuizQuestion = (
  courseId,
  moduleId,
  lessonId,
  questionId,
) => {
  const config = useAuthConfig();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(
        `/quiz-questions/${courseId}/modules/${moduleId}/lessons/${lessonId}/${questionId}`,
        config,
      );
      router.push(
        `/teacher/courses/${courseId}/modules/${moduleId}/chapters/${lessonId}`,
      );
    },
    onSuccess: () => {
      toast.success("Question Deleted");
    },
    onError: (error) => {
      ErrorToast(error);
    },
  });
  return mutation;
};
