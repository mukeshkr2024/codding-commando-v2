import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const CourseCard = ({ _id, title, description, duration, imageUrl }) => {
  return (
    <div className="relative m-1 flex max-w-xs flex-col justify-between overflow-hidden rounded-[25px] border-2 border-[#000000] bg-gradient-to-br from-[#10001c] to-[#0D0024] text-white md:max-w-sm">
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-lg font-bold md:text-xl">{title}</h2>
        <p className="text-sm  md:text-lg">{description}</p>
      </div>
      <div className="relative flex items-end justify-between">
        <Image
          src={imageUrl || "assets/images/courses/course1-profile.svg"}
          alt={title}
          height={220}
          width={220}
          className="w-[65%] rounded-b-[25px] md:w-[62%]"
        />
        <div className="absolute bottom-0 right-0 bg-gradient-to-t from-[#10001c] to-transparent p-4 md:mr-2">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-bold text-[#F5478E] md:text-lg">
              {duration}
            </p>

            <Link href={`/courses/${_id}`}>
              <Button className="rounded-full bg-gradient-to-r from-[#F5478E] to-[#FF7E5F] text-lg text-white shadow-md transition-all duration-300 hover:from-[#FF7E5F] hover:to-[#F5478E] md:px-6 md:text-xl">
                Learn{" "}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
