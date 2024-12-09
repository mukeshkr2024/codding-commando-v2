import { ErrorToast } from "@/components/error-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthConfig } from "hooks/use-auth-config";
import apiClient from "lib/api-client";
import toast from "react-hot-toast";

export const useUpdateQuestionOption = (
    courseId,
    moduleId,
    lessonId,
    questionId,
) => {
    const config = useAuthConfig();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (optionId) => {
            await apiClient.patch(
                `/quiz-questions/${courseId}/modules/${moduleId}/lessons/${lessonId}/${questionId}/option`,
                { optionId },
                config,
            );
            queryClient.invalidateQueries(["quiz-question"]);
        },
        onSuccess: () => {
            toast.success("Option Updated");
        },
        onError: (error) => {
            ErrorToast(error);
        },
    });

    return mutation;
};
