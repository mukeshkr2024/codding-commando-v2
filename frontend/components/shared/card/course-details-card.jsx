import { cn } from "lib/utils";
import Image from "next/image";
import React from "react";

export const CourseDetailsCard = ({
  title,
  description,
  onClick,
  courseImage,
  progress,
  isEnrolled,
  courseId,
}) => {
  return (
    <div
      className={cn(
        "flex h-[480px] w-[300px] flex-col justify-between overflow-hidden rounded-[10px] border border-[#D5D5D5]",
        !isEnrolled && "shadow-xl",
      )}
    >
      <Image
        src={courseImage}
        alt={title}
        height={300}
        width={500}
        className="w-full flex-1 object-cover"
      />
      <>
        <div className="bg-[#F8F8F8]">
          <div className="flex flex-col items-start gap-y-1.5 p-5">
            <h3 className="line-clamp-2 text-lg font-semibold text-[#1F1F1F]">
              {title}
            </h3>
            <div className="w-full border-b-2 border-[#D5D5D5]" />
            <div className="mt-1.5 flex flex-col items-start justify-start gap-4 md:flex-row">
              <p className="line-clamp-2 max-w-sm flex-1 grow text-xs text-[#1F1F1F] md:text-sm">
                {description}
              </p>
              <button
                className="w-32 flex-1 rounded-[42px] bg-[#000000] py-[5px] text-[15px] font-medium text-white"
                onClick={() => onClick(courseId)}
              >
                {isEnrolled ? "Continue" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
        {isEnrolled && (
          <div className="relative h-1.5 bg-[#D9D9D9]">
            <div
              className="absolute left-0 top-0 h-full bg-[#8F00FF]"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </>
    </div>
  );
};
