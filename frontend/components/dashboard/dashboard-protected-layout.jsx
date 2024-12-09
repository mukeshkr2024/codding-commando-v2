"use client";

import { useValidateSession } from "features/users/api/use-validate-session";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export const ProtectDashboardLayout = ({ children }) => {
  const { authToken } = useUserAccessToken();
  const pathname = usePathname();

  useEffect(() => {
    if (!authToken) {
      redirect("/");
    }
  }, [authToken, pathname]);

  useValidateSession();

  return <div>{children}</div>;
};
