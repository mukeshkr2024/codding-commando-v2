"use client";

import { Banner } from "@/components/banner";
import { Actions } from "@/components/dashboard/courses/actions";
import { AditionalDetailForm } from "@/components/dashboard/mentors/additional-detail-form";
import { MentorDescriptionForm } from "@/components/dashboard/mentors/description-form";
import { MentorImageForm } from "@/components/dashboard/mentors/mentor-image";
import { MentorNameForm } from "@/components/dashboard/mentors/mentor-name-form";
import { SelectRole } from "@/components/dashboard/mentors/select-role";
import { IconBadge } from "@/components/icon-bagde";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { LayoutDashboard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const MentorIdPage = ({ params }) => {
  const [mentorData, setMentorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authToken } = useUserAccessToken();

  const fetchmentorData = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await apiClient.get(
        `/mentors/${params.mentorId}`,
        config,
      );
      setMentorData(data?.mentor);
    } catch (error) {
      // ErrorToast(error);
    } finally {
      setLoading(false);
    }
  }, [authToken, params.mentorId]);

  useEffect(() => {
    fetchmentorData();
  }, [authToken, params.mentorId, fetchmentorData]);

  const requiredFields = [
    mentorData?.name,
    mentorData?.description,
    mentorData?.imageUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  const handleUpdateSuccess = () => {
    fetchmentorData();
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
      {!mentorData?.isPublished && (
        <Banner label="This member is unpublished. It will not be visible to the students." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <Link
              href="/teacher/mentors"
              className="flex items-center gap-1 font-medium hover:text-slate-700"
            >
              <FaArrowLeft className="h-4 w-4" />
              Go Back
            </Link>{" "}
            <h1 className="text-2xl font-medium">Member Setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            mentorId={params.mentorId}
            isPublished={mentorData?.isPublished}
          />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-2xl">Customize your Member Details</h2>
            </div>
            <MentorNameForm
              initialData={mentorData}
              mentorId={params.mentorId}
              onUpdateSucess={handleUpdateSuccess}
            />
            <MentorDescriptionForm
              initialData={mentorData}
              mentorId={params.mentorId}
              onUpdateSucess={handleUpdateSuccess}
            />
            <SelectRole
              initialData={mentorData}
              mentorId={params.mentorId}
              onUpdateSucess={handleUpdateSuccess}
            />
          </div>
          <div className="md:mt-12">
            <MentorImageForm
              initialData={mentorData}
              mentorId={params.mentorId}
              onUpdateSucess={handleUpdateSuccess}
            />
            {mentorData?.role === "mentor" && (
              <AditionalDetailForm
                initialData={mentorData}
                mentorId={params.mentorId}
                onUpdateSucess={handleUpdateSuccess}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorIdPage;
