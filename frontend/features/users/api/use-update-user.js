import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "lib/api-client";
import { useUserAccessToken } from "../hooks/use-user-accessToken";
import toast from "react-hot-toast";
import { ErrorToast } from "@/components/error-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { authToken } = useUserAccessToken();
  const mutation = useMutation({
    mutationFn: async (userData) => {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await apiClient.patch(`/users/profile-update`, userData, config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userInfo"],
      });
      toast.success("Profile Updated");
    },
    onError: (error) => {
      ErrorToast(error);
    },
  });

  return mutation;
};
