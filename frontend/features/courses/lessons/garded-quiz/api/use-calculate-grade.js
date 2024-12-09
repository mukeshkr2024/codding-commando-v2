import { ErrorToast } from "@/components/error-toast";
import { useMutation } from "@tanstack/react-query";
import { useAuthConfig } from "hooks/use-auth-config";
import apiClient from "lib/api-client";

export const useCalculateGrade = (courseId, moduleId, lessonId, quesitonId) => {
  const config = useAuthConfig();

  return useMutation({
    mutationFn: async (selectedData) => {
      const { data } = await apiClient.post(
        `/enrolled/course/${courseId}/modules/${moduleId}/chapters/${lessonId}/calculate-grade`,
        selectedData,
        config,
      );

      return data;
    },
    onError: (error) => {
      ErrorToast(error);
    },
  });
};
