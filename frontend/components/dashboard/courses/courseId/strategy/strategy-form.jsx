import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import apiClient from "lib/api-client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "lib/utils";
import * as z from "zod";
import { StrategiesList } from "./strategy-list";
import { useRouter } from "next/navigation";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const formSchema = z.object({
  title: z.string().min(1),
});

export const StrategyForm = ({ initialData, courseId, onUpdateSucess }) => {
  const [isCreating, setIsCreating] = useState(false);
  // const [isUpdating, setIsUpdating] = useState(false);
  const { authToken } = useUserAccessToken();
  const router = useRouter();

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
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

      await apiClient.post(
        `/courses/${courseId}/create-strategy`,
        values,
        config,
      );
      toast.success("Program created");
      toggleCreating();
      onUpdateSucess();
    } catch {
      toast.error("Something went wrong");
    }
  };

  // const onReorder = async (updateData) => {
  //   try {
  //     setIsUpdating(true);

  //     await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
  //       list: updateData,
  //     });
  //     toast.success("Chapters reordered");
  //     router.refresh();
  //   } catch {
  //     toast.error("Something went wrong");
  //   } finally {
  //     setIsUpdating(false);
  //   }
  // };

  const onEdit = (id) => {
    router.push(`/teacher/courses/${courseId}/strategies/${id}`);
  };

  return (
    <div className="relative mt-6 rounded-md border bg-slate-100 p-4">
      {/* {isUpdating && (
        <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md bg-slate-500/20">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )} */}
      <div className="flex items-center justify-between font-medium">
        Course Strategy
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a strategy
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
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "mt-2 text-sm",
            !initialData?.strategy.length && "italic text-slate-500",
          )}
        >
          {!initialData?.strategy.length && "No Programs"}
          <StrategiesList
            onEdit={onEdit}
            // onReorder={onReorder}
            items={initialData?.strategy || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};
