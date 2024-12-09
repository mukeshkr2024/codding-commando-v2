/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ErrorToast } from "@/components/error-toast";
import apiClient from "lib/api-client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const CourseIdPage = ({ params }) => {
  const [modules, setModules] = useState([]);
  const fetchCourseDetails = async () => {
    try {
      const { data } = await apiClient.get(
        `/enrolled/course/${params.courseId}`,
      );

      setModules(data?.modules);
    } catch (error) {
      ErrorToast(error);
      return redirect("/dashboard");
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  if (modules && modules.length > 0) {
    return redirect(
      `/course/${params.courseId}/modules/${modules[0]._id}/lessons/${modules[0].chapters[0]}`,
    );
  } else {
    console.log("redirecting");
    // redirect("/dashboard");
  }
};

export default CourseIdPage;
