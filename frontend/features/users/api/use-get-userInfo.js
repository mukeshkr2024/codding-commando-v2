import { ErrorToast } from "@/components/error-toast";
import { useQuery } from "@tanstack/react-query";
import apiClient from "lib/api-client";
import { useUserInfo } from "../hooks/use-user-Info";
import { useUserAccessToken } from "../hooks/use-user-accessToken";

export const useGetUserInfo = () => {
  const setUser = useUserInfo((state) => state.setUser);
  const { authToken } = useUserAccessToken();

  const fetchUserInfo = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await apiClient.get("/users/session", config);
      setUser(data?.user);
      return data?.user;
    } catch (error) {
      ErrorToast(error);
      throw error;
    }
  };

  const query = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    enabled: !!authToken,
  });

  return query;
};
