import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateQuizQuestion } from "features/admin/courses/modules/lessons/quiz/api/use-create-quizQuestion";
import { cn } from "lib/utils";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ChapterList } from "../chapter-lists";

const formSchema = z.object({
  title: z.string().min(1),
});

export default function QuizQuestions({
  courseId,
  moduleId,
  chapterId,
  onUpdateSuccess,
  questions,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const { mutate, isPending } = useCreateQuizQuestion(
    courseId,
    moduleId,
    chapterId,
  );

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onEdit = (questionId) => {
    router.push(
      `/teacher/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}/quiz-question/${questionId}`,
    );
  };

  const { isSubmitting, isValid } = form.formState;

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const onSubmit = (values) => {
    mutate(values);
    form.reset();
    toggleCreating();
    onUpdateSuccess();
  };

  return (
    <div>
      <div className="relative mt-6 rounded-md border bg-slate-100 p-4">
        <div className="flex items-center justify-between font-medium">
          Quiz Questions
          <Button onClick={toggleCreating} variant="ghost">
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add a Questions
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
              <Button disabled={!isValid || isSubmitting || isPending}>
                Create
              </Button>
            </form>
          </Form>
        )}
        {!isCreating && (
          <div
            className={cn(
              "mt-2 text-sm",
              !questions?.length && "italic text-slate-500",
            )}
          >
            {!questions?.length && "No Questions"}
            {/* <ChapterList
              onEdit={onEdit}
              items={moduleData?.chapters || []}
              onReorder={() => {}}
            /> */}

            <ChapterList
              onEdit={onEdit}
              items={questions}
              onReorder={() => {}}
            />
          </div>
        )}
        {!isCreating && (
          <p className="mt-4 text-xs text-muted-foreground">
            Drag and drop to reorder the quiz questions
          </p>
        )}
      </div>
    </div>
  );
}
