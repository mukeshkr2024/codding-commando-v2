"use client";

import { useGetUserInfo } from "features/users/api/use-get-userInfo";
import { redirect } from "next/navigation";
import React from "react";

export const TeacherProtectedLayout = ({ children }) => {
  const { data: user } = useGetUserInfo();

  if (user && user?.role !== "admin") {
    redirect("/dashboard");
  }

  return <div>{children}</div>;
};
