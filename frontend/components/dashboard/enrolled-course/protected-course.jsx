"use client";

import { ErrorToast } from "@/components/error-toast";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export const ProtectedCourse = ({ children }) => {
  const { authToken } = useUserAccessToken();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const validateCourse = useCallback(async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await apiClient.get(
        `/users/course/${params?.courseId}/validate-course`,
        config,
      );
    } catch (error) {
      ErrorToast(error);
      return router.push("/my-courses");
    } finally {
      setLoading(false);
    }
  }, [params?.courseId, authToken, router]);

  useEffect(() => {
    validateCourse();
  }, [validateCourse]);

  if (loading) {
    return (
      <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md">
        <Loader2 className="h-16 w-16 animate-spin text-sky-700" />
      </div>
    );
  }

  return <>{children}</>;
};
