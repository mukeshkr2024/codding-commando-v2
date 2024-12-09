// import { BuyProduct } from "@/components/razorpay/BuyProduct";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const CourseCard = ({
  title,
  description,
  duration,
  imageUrl,
  courseId,
  enrolled,
}) => {
  return (
    <div className="relative m-1 flex max-w-xs flex-col justify-between overflow-hidden rounded-[25px] border-2 border-[#000000] bg-gradient-to-br from-[#10001c]  to-[#0D0024] text-white ">
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm ">{description}</p>
      </div>
      <div className="relative flex items-end justify-between">
        <Image
          src={imageUrl || "assets/images/courses/course1-profile.svg"}
          alt={title}
          height={180}
          width={180}
          className="rounded-b-[25px]"
        />
        <div className="absolute bottom-0 right-0 bg-gradient-to-t from-[#10001c] to-transparent p-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-[#F5478E]">{duration}</p>
            {enrolled ? (
              <Link href={`/course/${courseId}`}>
                <Button className="rounded-full bg-gradient-to-r from-[#F5478E] to-[#FF7E5F] text-sm text-white shadow-md transition-all duration-300 hover:from-[#FF7E5F] hover:to-[#F5478E]">
                  Continue
                </Button>
              </Link>
            ) : (
              // <BuyProduct courseId={courseId}>
              <Link href={`/courses/${courseId}`}>
                <Button className="rounded-full bg-gradient-to-r from-[#F5478E] to-[#FF7E5F] text-sm text-white shadow-md transition-all duration-300 hover:from-[#FF7E5F] hover:to-[#F5478E]">
                  Buy now
                </Button>
              </Link>
              // </BuyProduct>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
