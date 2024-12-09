import { cn } from "lib/utils";
import Image from "next/image";
import React from "react";

const QuizResult = ({ score, total, onRetry, onContinue, title }) => {
  const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  const scorePercentage = (score / total) * 100;

  return (
    <div className="mt-20 flex h-full w-full items-center justify-center">
      <div className="mx-auto mt-10 flex h-full max-w-6xl flex-col items-center justify-center px-4 md:mt-20 md:flex-row">
        <Image
          src={
            scorePercentage >= 80
              ? "/quiz-success-img.png"
              : "/quiz-error-img.png"
          }
          alt={scorePercentage >= 80 ? "Quiz success" : "Quiz error"}
          width={554}
          height={451}
          className={cn("w-[55%] md:w-[80%]", scorePercentage >= 80 && "pt-10")}
        />
        <div className="mt-4 flex flex-col items-center gap-y-4 text-center">
          <p className="text-2xl font-medium">
            You got:{" "}
            <span
              className={cn(
                scorePercentage >= 80 ? "text-[#65E9A2]" : "text-[#E96565]",
              )}
            >
              {formatNumber(score)}/{formatNumber(total)} points
            </span>
          </p>
          <p className="font-normal">{title}</p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row">
            <button
              className={cn(
                "rounded-md  px-6 py-2 text-base font-normal text-white ",
                scorePercentage >= 80 ? "bg-[#E2E2E2]" : "bg-[#8F00FF]",
              )}
              onClick={onRetry}
            >
              Re-take
            </button>
            <button
              className={cn(
                "rounded-md  px-6 py-2 text-base font-normal text-white ",
                scorePercentage >= 80 ? "bg-[#8F00FF]" : "bg-[#E2E2E2]",
              )}
              onClick={onContinue}
            >
              Go to class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
