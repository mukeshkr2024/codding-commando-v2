"use client";

import { Banner } from "@/components/banner";
import { ProgramActions } from "@/components/dashboard/courses/courseId/programs/program-actions";
import { ProgramDescriptionForm } from "@/components/dashboard/courses/courseId/programs/program-description-form";
import { ProgramTitleForm } from "@/components/dashboard/courses/courseId/programs/program-title-form";
// import { ErrorToast } from "@/components/error-toast";
import { IconBadge } from "@/components/icon-bagde";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { ArrowLeft, LayoutDashboard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const ProgramId = ({ params }) => {
  const [programData, setProgramData] = useState({});
  const [loading, setLoading] = useState(true);
  const { authToken } = useUserAccessToken();

  const fetchProgram = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await apiClient.get(
        `/courses/${params.courseId}/program/${params.programId}`,
        config,
      );

      setProgramData(data?.program);
      setLoading(false);
    } catch (error) {
      // ErrorToast(error);
      setLoading(false);
    }
  }, [params.programId, authToken, params.courseId]);

  useEffect(() => {
    fetchProgram();
  }, [params.courseId, fetchProgram]);

  const requiredFields = [
    programData?.title,
    programData?.description?.some((item) => item),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  const onUpdateSucess = () => {
    fetchProgram();
  };

  if (loading) {
    return (
      <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md">
        <Loader2 className="h-16 w-16 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <>
      {!programData?.isPublished && (
        <Banner
          variant="warning"
          label="This program is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="mb-6 flex items-center text-sm transition hover:opacity-75"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to course setup
            </Link>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Program Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ProgramActions
                disabled={!isComplete}
                courseId={params.courseId}
                programId={params.programId}
                isPublished={programData.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <ProgramTitleForm
                initialData={programData}
                courseId={params.courseId}
                programId={params.programId}
                onUpdateSucess={onUpdateSucess}
              />
            </div>
            <ProgramDescriptionForm
              initialData={programData}
              courseId={params.courseId}
              programId={params.programId}
              onUpdateSucess={onUpdateSucess}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramId;
