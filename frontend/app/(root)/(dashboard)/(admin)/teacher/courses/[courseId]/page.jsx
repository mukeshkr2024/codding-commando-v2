"use client";

import { Banner } from "@/components/banner";
import { AssignMentorForm } from "@/components/dashboard/courses/courseId/assign-mentor-form";
import { AboutForm } from "@/components/dashboard/courses/courseId/basicdata/about-form";
import { CourseImage } from "@/components/dashboard/courses/courseId/basicdata/course-image-form";
import { DescriptionForm } from "@/components/dashboard/courses/courseId/basicdata/description-form";
import { DurationForm } from "@/components/dashboard/courses/courseId/basicdata/duration-form";
import { ModeForm } from "@/components/dashboard/courses/courseId/basicdata/mode-form";
import { TitleForm } from "@/components/dashboard/courses/courseId/basicdata/title-form";
import { CourseActions } from "@/components/dashboard/courses/courseId/course-actions";
import { CourseBanner } from "@/components/dashboard/courses/courseId/course-banner";
import { CourseModule } from "@/components/dashboard/courses/courseId/modules/CourseModule";
import { PaymentDetails } from "@/components/dashboard/courses/courseId/payments/payment-details";
import { ProgramsForm } from "@/components/dashboard/courses/courseId/programs/ProgramsForm";
import { StrategyForm } from "@/components/dashboard/courses/courseId/strategy/strategy-form";
import { IconBadge } from "@/components/icon-bagde";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { LayoutDashboard, ListChecks, ListStart, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState, use } from "react";

const CourseIdPage = ({ params }) => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authToken } = useUserAccessToken();

  const { courseId } = use(params);

  const fetchCourseData = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const { data } = await apiClient.get(`/courses/${courseId}`, config);
      setCourseData(data?.course);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [courseId, authToken]);

  useEffect(() => {
    fetchCourseData();
  }, [courseId, authToken, fetchCourseData]);

  const requiredFields = [
    courseData?.title,
    courseData?.description,
    courseData?.imageUrl,
    courseData?.duration,
    courseData?.mode,
    courseData?.about,
    courseData?.program_curriculum.some((program) => program.isPublished),
    courseData?.strategy.some((item) => item.isPublished),
    courseData?.mentors.some((mentor) => mentor),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  if (loading) {
    return (
      <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md">
        <Loader2 className="h-16 w-16 animate-spin text-sky-700" />
      </div>
    );
  }

  const isComplete = requiredFields.every(Boolean);

  const handleupdateSuccess = () => {
    fetchCourseData();
  };

  return (
    <>
      {!courseData?.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <CourseActions
            disabled={!isComplete}
            courseId={courseId}
            isPublished={courseData?.isPublished}
            onUpdateSucess={handleupdateSuccess}
          />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-2xl">Customize your course</h2>
            </div>

            <TitleForm
              initialData={courseData}
              courseId={courseData?._id}
              onUpdateSucess={handleupdateSuccess}
            />
            <DescriptionForm
              initialData={courseData}
              courseId={courseData?._id}
              onUpdateSucess={handleupdateSuccess}
            />
            <CourseImage
              initialData={courseData}
              courseId={courseData?._id}
              onUpdateSucess={handleupdateSuccess}
            />
            <AboutForm
              initialData={courseData}
              courseId={courseData?._id}
              onUpdateSucess={handleupdateSuccess}
            />
            <ModeForm
              initialData={courseData}
              courseId={courseData?._id}
              onUpdateSucess={handleupdateSuccess}
            />
            <DurationForm
              initialData={courseData}
              courseId={courseData?._id}
              onUpdateSucess={handleupdateSuccess}
            />
            <AssignMentorForm
              initialData={courseData}
              courseId={courseData?._id}
              onUpdateSucess={handleupdateSuccess}
            />

            <div className="mt-6">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-2xl">Course Banner</h2>
              </div>
              <CourseBanner
                initialData={courseData}
                courseId={courseData?._id}
                onUpdateSucess={handleupdateSuccess}
              />
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-2xl">Course Module</h2>
              </div>
              <CourseModule
                initialData={courseData}
                courseId={courseData?._id}
                onUpdateSucess={handleupdateSuccess}
              />
            </div>
          </div>
          <div className="space-y-6">
            <PaymentDetails
              initialData={courseData?.paymentDetail}
              courseId={courseData?._id}
              onUpdateSucess={handleupdateSuccess}
              isPaid={courseData?.isPaid}
            />
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Program Curriculums</h2>
              </div>
              <ProgramsForm
                initialData={courseData}
                courseId={courseData?._id}
                onUpdateSucess={handleupdateSuccess}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListStart} />
                <h2 className="text-xl"> Curriculum strategy</h2>
              </div>
              <StrategyForm
                initialData={courseData}
                courseId={courseData?._id}
                onUpdateSucess={handleupdateSuccess}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
