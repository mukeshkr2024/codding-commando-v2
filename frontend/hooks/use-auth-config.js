import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

export const useAuthConfig = () => {
  const { authToken } = useUserAccessToken();

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return config;
};
