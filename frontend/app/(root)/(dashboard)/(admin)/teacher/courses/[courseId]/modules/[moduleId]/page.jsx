"use client";

import { Banner } from "@/components/banner";
import { ChapterList } from "@/components/dashboard/courses/courseId/chapters/chapter-lists";
import { ModuleTitleForm } from "@/components/dashboard/courses/courseId/modules/ModuleTitleForm";
import { ModuleActions } from "@/components/dashboard/courses/courseId/modules/module-actions";
import { ErrorToast } from "@/components/error-toast";
import LoadingAnimation from "@/components/shared/loading-animation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { cn } from "lib/utils";
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1),
});

const ModuleIdPage = ({ params }) => {
  const [moduleData, setModuleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { authToken } = useUserAccessToken();
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const fetchModuleData = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const { data } = await apiClient.get(
        `/courses/${params.courseId}/modules/${params.moduleId}`,
        config,
      );
      setModuleData(data?.module);
    } catch (error) {
      ErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  }, [params.courseId, params.moduleId, authToken]);

  useEffect(() => {
    fetchModuleData();
  }, [fetchModuleData, params.courseId, params.moduleId]);

  const requiredFields = [
    moduleData?.title,
    moduleData?.chapters?.some((item) => item),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  const onUpdateSucess = () => {
    fetchModuleData();
  };

  const onSubmit = async (values) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      await apiClient.post(
        `/courses/${params.courseId}/modules/${params.moduleId}/chapters`,
        values,
        config,
      );
      toast.success("Module updated");
      onUpdateSucess();
      toggleCreating();
      form.reset();
    } catch (error) {
      ErrorToast(error);
    }
  };

  const onEdit = (id) => {
    router.push(
      `/teacher/courses/${params?.courseId}/modules/${params?.moduleId}/chapters/${id}`,
    );
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      {!moduleData?.isPublished && (
        <Banner
          variant="warning"
          label="This module is not unpublished. It will not visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="mb-4 flex items-center text-sm transition hover:opacity-75"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to course setup
            </Link>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ModuleActions
                courseId={params?.courseId}
                moduleId={params?.moduleId}
                isPublished={moduleData?.isPublished}
                disabled={!isComplete}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-6 grid grid-cols-1 gap-6 px-6 md:grid-cols-2">
        <div>
          <ModuleTitleForm
            initialData={moduleData}
            courseId={params?.courseId}
            moduleId={params?.moduleId}
            onUpdateSucess={onUpdateSucess}
          />
        </div>
        <div>
          <div className="relative mt-6 rounded-md border bg-slate-100 p-4">
            <div className="flex items-center justify-between font-medium">
              Chapters
              <Button onClick={toggleCreating} variant="ghost">
                {isCreating ? (
                  <>Cancel</>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add a Chapter
                  </>
                )}
              </Button>
            </div>

            {isCreating && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-4 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="e.g. 'Introduction to the Salesforce'"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button disabled={!isValid || isSubmitting}>Create</Button>
                </form>
              </Form>
            )}
            {!isCreating && (
              <div
                className={cn(
                  "mt-2 text-sm",
                  !moduleData?.chapters?.length && "italic text-slate-500",
                )}
              >
                {!moduleData?.chapters?.length && "No Chapters"}
                <ChapterList
                  onEdit={onEdit}
                  items={moduleData?.chapters || []}
                  onReorder={() => {}}
                />
              </div>
            )}
            {!isCreating && (
              <p className="mt-4 text-xs text-muted-foreground">
                Drag and drop to reorder the chapters
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleIdPage;
