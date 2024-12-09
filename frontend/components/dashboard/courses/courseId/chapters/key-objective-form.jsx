"use client";
import { ErrorToast } from "@/components/error-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { cn } from "lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { KeyLearningObjectivesList } from "./key-objective-list";

const formSchema = z.object({
  description: z.string().min(1),
});

export const KeyLearningObjectives = ({
  initialData,
  courseId,
  moduleId,
  chapterId,
  onUpdateSuccess,
}) => {
  const { authToken } = useUserAccessToken();
  const [isCreating, setIsCreating] = useState(false);

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

  const toggleEdit = () => setIsCreating((current) => !current);

  const onSubmit = async (values) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      await apiClient.post(
        `/courses/key-objectives/${courseId}/modules/${moduleId}/chapters/${chapterId}`,
        values,
        config,
      );

      toast.success("key Objective added");
      toggleEdit();
      onUpdateSuccess();
    } catch (error) {
      ErrorToast(error);
    }
  };

  const onDelete = async (keyObjectiveId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      await apiClient.delete(
        `/courses/key-objectives/${courseId}/modules/${moduleId}/chapters/${chapterId}/${keyObjectiveId}`,
        config,
      );

      toast.success("key Objective deleted");
      onUpdateSuccess();
    } catch (error) {
      ErrorToast(error);
    }
  };

  return (
    <div>
      <div className="relative mt-6 rounded-md border bg-slate-100 p-4">
        <div className="flex items-center justify-between font-medium">
          Key Learning Objectives
          <Button onClick={toggleCreating} variant="ghost">
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add a New Objectives
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
                name="description"
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
              !initialData?.length && "italic text-slate-500",
            )}
          >
            {!initialData?.keyObjectives?.length && "No Chapters"}
            <KeyLearningObjectivesList
              onDelete={onDelete}
              items={initialData?.keyObjectives}
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
  );
};
