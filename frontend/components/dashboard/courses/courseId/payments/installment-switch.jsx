import React, { useEffect } from "react";
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
  enabledInstallement: z.boolean().default(false),
});

function InstallmentMode({ initialData, courseId, onSuccess }) {
  const { authToken } = useUserAccessToken();

  const form = useForm({
    resolver: zodResolver(installmentSchema),
    defaultValues: {
      enabledInstallement: initialData?.enabledInstallement,
    },
  });

  useEffect(() => {
    form.setValue("enabledInstallement", initialData?.enabledInstallement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (value) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await apiClient.patch(
        `/courses/${courseId}/payment-details`,
        value,
        config,
      );
      toast.success(
        `Installement ${value?.enabledInstallement ? "enabled" : "disabled"}`,
      );
      onSuccess();
    } catch (error) {
      ErrorToast(error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mt-6 flex flex-col gap-y-2.5 bg-slate-100 p-4">
        <FormField
          control={form.control}
          name="enabledInstallement"
          render={({ field }) => (
            <div className="flex justify-between">
              <div className="">
                <label className="font-medium">Enable Installment</label>
                <p className="text-sm text-slate-500">
                  Installment is currently{" "}
                  {field.value ? "enabled" : "disabled"}
                </p>
              </div>
              <Switch
                checked={field.value}
                onChange={(checked) =>
                  form.setValue("enabledInstallement", checked)
                }
                className="bg-slate-400"
              />
            </div>
          )}
        />
        <Button
          type="submit"
          className="w-16"
          disabled={form.formState.isSubmitting}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default InstallmentMode;
