"use client";

import { ErrorToast } from "@/components/error-toast";
import { useMutation } from "@tanstack/react-query";
import apiClient from "lib/api-client";
import toast from "react-hot-toast";
import { useUserAccessToken } from "../hooks/use-user-accessToken";

export const useUserLoginAccount = () => {
  const { setAuthToken } = useUserAccessToken();

  const mutation = useMutation({
    mutationFn: async (loginData) => {
      const { data } = await apiClient.post("/users/login", loginData);
      const accessToken = data?.user?.accessToken;
      if (accessToken) {
        if (typeof window !== "undefined" && accessToken) {
          localStorage.setItem("authToken", JSON.stringify(accessToken));
          setAuthToken(accessToken);
        }
      } else {
        throw new Error("No access token received");
      }
    },
    onSuccess: () => {
      toast.success("Logged In");
    },
    onError: (error) => {
      ErrorToast(error);
    },
  });

  return mutation;
};
