"use client";

import React, { useEffect, useState } from "react";
import QuizHeader from "@/components/quiz/quiz-header";
import { QuizQuestion } from "@/components/quiz/quiz-question";
import { Loader2 } from "lucide-react";
import { useGetGradedQuizs } from "features/courses/lessons/garded-quiz/api/use-get-gradedQuiz";
import { useCalculateGrade } from "features/courses/lessons/garded-quiz/api/use-calculate-grade";
import QuizResult from "./quiz-result";
import { useRouter } from "next/navigation";

const GradedQuizPage = ({ params }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(null);
  const { courseId, moduleId, lessonId } = params;

  const { data: questions, isLoading } = useGetGradedQuizs(
    courseId,
    moduleId,
    lessonId,
  );

  const [totalQuestion, setTotalQuestion] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (questions?.quiz_questions) {
      const questionCount = questions.quiz_questions.length;
      setTotalQuestion(questionCount);
      setRemainingTime(questionCount * 60);
    }
  }, [questions]);

  useEffect(() => {
    if (totalQuestion > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [totalQuestion]);

  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: optionId,
    }));
  };

  const calculateGradeMutation = useCalculateGrade(
    courseId,
    moduleId,
    lessonId,
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const selectedData = Object.entries(selectedOptions).map(
        ([questionId, selectedOptionId]) => ({
          questionId,
          selectedOptionId,
        }),
      );

      calculateGradeMutation.mutate(selectedData, {
        onSuccess: (result) => {
          setScore(result?.totalCorrect);
        },
      });
    } catch (error) {
      console.error("Error submitting answers:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSelectedOptions({});
    setScore(null);
    setRemainingTime(totalQuestion * 60);
  };

  const handleContinue = () => {
    router.push(`/course/${courseId}/modules/${moduleId}/lessons/${lessonId}`);
  };

  const href = `/course/${params.courseId}/modules/${params.moduleId}/lessons/${params.lessonId}`;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full pb-16">
      <QuizHeader
        title={questions?.title}
        time={totalQuestion}
        points={totalQuestion}
        remainingTime={formatTime(remainingTime)}
        href={href}
        isLoading={isLoading || isSubmitting}
      />
      {isLoading ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="mt-10 flex justify-center ">
            <Loader2 className="h-10 w-10 animate-spin text-[#8F00FF]" />
          </div>
        </div>
      ) : score !== null ? (
        <QuizResult
          score={score}
          total={totalQuestion}
          onRetry={handleRetry}
          title={questions?.title}
          onContinue={handleContinue}
        />
      ) : (
        <div className="mx-auto mt-36 max-w-5xl">
          <div className="mt-4">
            {questions?.quiz_questions?.map((question, index) => (
              <QuizQuestion
                key={question._id}
                question={question}
                title={question?.title}
                options={question?.options}
                index={index}
                point={1}
                selectedOption={selectedOptions[question._id]}
                handleOptionChange={handleOptionChange}
              />
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center">
            <button
              className="mt-4 rounded bg-[#8F00FF] px-4 py-2 text-white"
              onClick={handleSubmit}
              disabled={isSubmitting || calculateGradeMutation.isPending}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradedQuizPage;
