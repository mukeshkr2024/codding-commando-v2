"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "lib/utils";
import { Textarea } from "@/components/ui/textarea";
import apiClient from "lib/api-client";
import { ErrorToast } from "@/components/error-toast";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const formSchema = z.object({
  about: z.string().min(1, {
    message: "About is required",
  }),
});

export const AboutForm = ({ initialData, courseId, onUpdateSucess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { authToken } = useUserAccessToken();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      about: initialData?.about || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      await apiClient.patch(`/courses/update/${courseId}`, values, config);
      toast.success("Course updated");
      toggleEdit();
      onUpdateSucess();
    } catch (error) {
      ErrorToast(error);
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        About course
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit About
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "mt-2 text-sm",
            !initialData?.about && "italic text-slate-500",
          )}
        >
          {initialData?.about || "Nothing about course"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This course is about...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
