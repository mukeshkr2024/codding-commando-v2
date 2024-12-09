/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { CoursePaymentDetail } from "@/components/dashboard/students/course-payement-detail";
import { StudentActions } from "@/components/dashboard/students/student-actions";
import { StudentCourseCard } from "@/components/dashboard/students/student-course-card";
import { StudentDetailCard } from "@/components/dashboard/students/studetail-card";
import apiClient from "lib/api-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const StudentProfile = ({ params }) => {
  const [studentData, setStudentData] = useState();
  const { authToken } = useUserAccessToken();
  const [loading, setLoading] = useState(true);

  const fetchStudentData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const { data } = await apiClient.get(
        `/users/students/${params.studentId}`,
        config,
      );

      setStudentData(data.user);
    } catch (error) {
      // toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md bg-white opacity-90">
        <Loader2 className="h-16 w-16 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <div className="h-full w-full  p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <Link
            href="/teacher/students"
            className="flex items-center gap-1 font-medium hover:text-slate-700"
          >
            <FaArrowLeft className="h-4 w-4" />
            Go Back
          </Link>{" "}
          <h1 className="mt-2 text-2xl font-medium text-slate-800 ">
            Student Profile
          </h1>
        </div>
        <div>
          <StudentActions
            studentId={params.studentId}
            isBlocked={studentData?.isBlocked}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <StudentDetailCard studentData={studentData} />
        <StudentCourseCard studentData={studentData} />
        <CoursePaymentDetail studentData={studentData} />
      </div>
    </div>
  );
};

export default StudentProfile;
