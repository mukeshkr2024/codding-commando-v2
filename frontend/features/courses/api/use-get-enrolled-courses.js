import { useQuery } from "@tanstack/react-query";
import { useAuthConfig } from "hooks/use-auth-config";
import apiClient from "lib/api-client";

export const useGetEnrolledCourses = () => {
  const config = useAuthConfig();

  const fetchCourses = async () => {
    try {
      const { data } = await apiClient.get("/enrolled-courses", config);
      return data?.courses;
    } catch (error) {
      console.log(error);
    }
  };

  return useQuery({
    queryKey: ["enrolled-courses"],
    queryFn: fetchCourses,
  });
};
