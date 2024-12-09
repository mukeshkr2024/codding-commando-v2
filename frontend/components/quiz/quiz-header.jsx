import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function QuizHeader({
  title,
  time,
  points,
  remainingTime,
  href,
  isLoading,
}) {
  return (
    <div className="fixed right-0 top-0 flex w-full items-center justify-between bg-[#8F00FF] px-1.5 py-2.5 text-white sm:px-6 md:px-8 lg:px-10">
      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center rounded-full border-[2px] border-white md:h-10 md:w-10">
            <Link href={href}>
              <ArrowLeft className="text-white" />
            </Link>
          </div>
          <div className="flex flex-col gap-y-[2px]">
            <h2 className="text-sm font-semibold md:text-lg">{title}</h2>
            <div className="flex text-xs font-normal capitalize">
              <p>Graded Quiz</p> . 0{time} mins . 0{points} points
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <span className="text-base font-semibold md:text-lg">
            {remainingTime}
          </span>
          <span className="text-xs font-normal md:text-sm">Remaining</span>
        </div>
      )}
    </div>
  );
}
