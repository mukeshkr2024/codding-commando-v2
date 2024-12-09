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
  additionInfo: z
    .string()
    .min(1, {
      message: "additionInfo is required",
    })
    .max(250, {
      message: "Description is too long",
    }),
});

export const AditionalDetailForm = ({
  initialData,
  mentorId,
  onUpdateSucess,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { authToken } = useUserAccessToken();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      additionInfo: initialData?.additionInfo || "",
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

      await apiClient.patch(`/mentors/${mentorId}`, values, config);
      toast.success("Member Updated");
      toggleEdit();
      onUpdateSucess();
    } catch (error) {
      ErrorToast(error);
    }
  };

  return (
    <div className="mt-6 overflow-hidden rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Mentor additional informationw
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit additionInfo
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "mt-2 text-sm",
            !initialData?.additionInfo && "italic text-slate-500",
          )}
        >
          {initialData?.additionInfo || "No additionInfo"}
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
              name="additionInfo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This mentor is about...'"
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
