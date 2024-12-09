import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowUpRight, Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "lib/api-client";
import { ErrorToast } from "@/components/error-toast";
import Link from "next/link";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const formSchema = z.object({
  downloadUrl: z.string().url(),
});

export const AttachDownloadClassLink = ({
  initialData,
  courseId,
  moduleId,
  chapterId,
  onUpdateSuccess,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { authToken } = useUserAccessToken();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

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
      toast.success("Chapter updated");
      toggleEdit();
      onUpdateSuccess();
    } catch (error) {
      ErrorToast(error);
    }
  };

  return (
    <div className="mt-8 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Download URL
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit URL
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div>
          {initialData?.downloadUrl ? (
            <div>
              <Link
                href={initialData?.downloadUrl}
                target="_blank"
                className="flex items-center text-sm text-blue-600"
              >
                Download <ArrowUpRight className="h-5 w-5 text-blue-500" />
              </Link>
            </div>
          ) : (
            <p className="text-sm first-letter:text-slate-500">
              No Link Attached yet
            </p>
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="downloadUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'https://.....'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
