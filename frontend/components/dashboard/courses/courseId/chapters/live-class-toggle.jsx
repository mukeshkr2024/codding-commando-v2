import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "antd";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import apiClient from "lib/api-client";
import { ErrorToast } from "@/components/error-toast";
import toast from "react-hot-toast";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const installmentSchema = z.object({
  isLive: z.boolean().default(false),
});

function LiveClassToggle({
  initialData,
  courseId,
  moduleId,
  chapterId,
  onUpdateSuccess,
}) {
  const { authToken } = useUserAccessToken();
  const [isDirty, setIsDirty] = useState(false);

  const form = useForm({
    resolver: zodResolver(installmentSchema),
    defaultValues: {
      isLive: initialData?.isLive,
    },
  });

  useEffect(() => {
    form.setValue("isLive", initialData?.isLive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await apiClient.patch(
        `/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}/update`,
        values,
        config,
      );
      toast.success("Chapter Updated");
      onUpdateSuccess();
      setIsDirty(false); // Reset dirty state after successful update
    } catch (error) {
      ErrorToast(error);
    }
  };

  useEffect(() => {
    // Check if form is dirty whenever form values change
    setIsDirty(form.formState.isDirty);
  }, [form.formState.isDirty]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mt-6 flex flex-col gap-y-2.5 rounded-md bg-slate-100 p-4">
        <FormField
          control={form.control}
          name="isLive"
          render={({ field }) => (
            <div className="flex justify-between">
              <div className="">
                <label className="font-medium">Enable Live Classes</label>
                <p className="text-sm text-slate-500">
                  Live Classes is currently{" "}
                  {field.value ? "enabled" : "disabled"}
                </p>
              </div>
              <Switch
                checked={field.value}
                onChange={(checked) => {
                  form.setValue("isLive", checked);
                  setIsDirty(true); // Set dirty state when toggle changes
                }}
                className="bg-slate-400"
              />
            </div>
          )}
        />
        {isDirty && ( // Render save button only if form is dirty
          <Button
            type="submit"
            className="w-16"
            disabled={form.formState.isSubmitting}
          >
            Save
          </Button>
        )}
      </div>
    </form>
  );
}

export default LiveClassToggle;
