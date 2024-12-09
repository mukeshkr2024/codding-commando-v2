import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "lib/utils";
import { Input } from "@/components/ui/input";
import { useCreateQuestionOption } from "features/admin/courses/modules/lessons/quiz/api/use-create-questionOption";
import { OptionsList } from "./options-list";
import { useDeleteQuestionOptions } from "features/admin/courses/modules/lessons/quiz/api/use-delete-questionOption";

const formSchema = z.object({
  text: z.string().min(1, {
    message: "Title is required",
  }),
});

export function AddOptionsForm({
  initialData,
  courseId,
  moduleId,
  chapterId,
  questionId,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const { mutate } = useCreateQuestionOption(
    courseId,
    moduleId,
    chapterId,
    questionId,
  );
  const optionDeleteMutation = useDeleteQuestionOptions(
    courseId,
    moduleId,
    chapterId,
    questionId,
  );

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };
  const onSubmit = (values) => {
    mutate(values);
    form.reset();
    toggleCreating();
  };

  const onDelete = (optionId) => {
    optionDeleteMutation.mutate(optionId);
  };

  return (
    <div>
      <div className="relative mt-6 rounded-md border bg-slate-100 p-4">
        <div className="flex items-center justify-between font-medium">
          Options
          <Button onClick={toggleCreating} variant="ghost">
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add a Option
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
                name="text"
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
              !initialData?.options?.length && "italic text-slate-500",
            )}
          >
            {!initialData?.options?.length && "No Options"}

            <OptionsList items={initialData?.options} onDelete={onDelete} />
          </div>
        )}
        {!isCreating && (
          <p className="mt-4 text-xs text-muted-foreground">
            Drag and drop to reorder the options
          </p>
        )}
      </div>
    </div>
  );
}
