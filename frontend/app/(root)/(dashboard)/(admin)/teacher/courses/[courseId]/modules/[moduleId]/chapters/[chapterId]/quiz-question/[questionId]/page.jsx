"use client";

import { Banner } from "@/components/banner";
import { AddOptionsForm } from "@/components/dashboard/courses/courseId/chapters/quiz/add-options-form";
import { QuestionActions } from "@/components/dashboard/courses/courseId/chapters/quiz/question-actions";
import { QuestionTitleForm } from "@/components/dashboard/courses/courseId/chapters/quiz/question-title";
import { SelectCorrectOption } from "@/components/dashboard/courses/courseId/chapters/quiz/select-correct-option";
import { IconBadge } from "@/components/icon-bagde";
import LoadingAnimation from "@/components/shared/loading-animation";
import { useDeleteQuizQuestion } from "features/admin/courses/modules/lessons/quiz/api/use-delete-questionQuiz";
import { useGetQuizQuestion } from "features/admin/courses/modules/lessons/quiz/api/use-get-quizQuestions";
import { useUpdateQuestionOption } from "features/admin/courses/modules/lessons/quiz/api/use-update-questionOption";
import { useUpdateQuizQuestion } from "features/admin/courses/modules/lessons/quiz/api/use-update-QuizQuestion";
import { ArrowLeft, LayoutDashboard, Option } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const QuestionIdPage = ({ params }) => {
  const { courseId, moduleId, chapterId, questionId } = params;
  const router = useRouter();

  const { data: question, isLoading } = useGetQuizQuestion(
    courseId,
    moduleId,
    chapterId,
    questionId,
  );

  const questionMutation = useUpdateQuizQuestion(
    courseId,
    moduleId,
    chapterId,
    questionId,
  );

  const questionDeleteMutation = useDeleteQuizQuestion(
    courseId,
    moduleId,
    chapterId,
    questionId,
  );

  const updateOptionMutation = useUpdateQuestionOption(
    courseId,
    moduleId,
    chapterId,
    questionId,
  );

  const requiredFields = [question?.title, question?.options?.length === 4];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  const onClick = () => {
    if (question?.isPublished) {
      questionMutation.mutate({
        isPublished: false,
      });
    } else {
      questionMutation.mutate({
        isPublished: true,
      });
    }

    router.push(
      `/teacher/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}`,
    );
  };

  const onDelete = () => {
    questionDeleteMutation.mutate();
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const saveOption = (optionId) => {
    updateOptionMutation.mutate(optionId);
  };

  return (
    <>
      {!question?.isPublished && (
        <Banner
          variant="warning"
          label="This questions is not published. It will no visible on the Quiz"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}/`}
              className="mb-4 flex items-center text-sm transition hover:opacity-75"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chapter setup
            </Link>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <QuestionActions
                isPublished={question?.isPublished}
                disabled={!isComplete}
                onClick={onClick}
                onDelete={onDelete}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="space-y-4">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customise your Question</h2>
              </div>
              <QuestionTitleForm
                initialData={question}
                courseId={courseId}
                moduleId={moduleId}
                chapterId={chapterId}
                questionId={questionId}
              />
              <AddOptionsForm
                initialData={question}
                courseId={courseId}
                moduleId={moduleId}
                chapterId={chapterId}
                questionId={questionId}
              />
            </div>
          </div>

          <div>
            <div className="space-y-4">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Option} />
                <h2 className="text-xl">Customise your Option</h2>
              </div>
              <SelectCorrectOption
                saveOption={saveOption}
                question={question}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionIdPage;
