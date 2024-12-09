"use client";

import { ErrorToast } from "@/components/error-toast";
import { useMutation } from "@tanstack/react-query";
import apiClient from "lib/api-client";
import { useUserRegistered } from "../hooks/use-user-registered";

export const useUserRegistration = () => {
  const { setRegistered } = useUserRegistered();
  const mutation = useMutation({
    mutationFn: async (registrationData) => {
      const { data } = await apiClient.post(
        "/users/register",
        registrationData,
      );
      setRegistered(data);
    },
    onSuccess: () => {},
    onError: (error) => {
      ErrorToast(error);
    },
  });

  return mutation;
};
