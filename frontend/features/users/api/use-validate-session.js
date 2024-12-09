import apiClient from "lib/api-client";
import { useUserAccessToken } from "../hooks/use-user-accessToken";
import { usePathname, useRouter } from "next/navigation";
import { useAuthConfig } from "hooks/use-auth-config";
import { useQuery } from "@tanstack/react-query";

export const useValidateSession = (values) => {
  const { removeAuthToken, authToken } = useUserAccessToken();
  const router = useRouter();
  const config = useAuthConfig();
  const pathname = usePathname();

  const validateSession = async () => {
    try {
      await apiClient.get("/validate-session", config);
      return { success: true };
    } catch (error) {
      removeAuthToken();
      router.push("/");
      return { success: false };
    }
  };

  return useQuery({
    queryKey: ["validateSession", authToken, pathname],
    queryFn: validateSession,
    enabled: !!authToken,
  });
};
