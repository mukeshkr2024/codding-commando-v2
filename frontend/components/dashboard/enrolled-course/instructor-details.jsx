import { GraduationCap, Play } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function InstructorDetail({
  name,
  description,
  imageUrl,
  additionInfo,
}) {
  return (
    <div className="flex flex-col gap-y-4">
      <h4 className="text-xl font-semibold text-[#0F172A]">Instructor</h4>
      <div>
        <span className="text-xl font-semibold text-[#780FCA]">{name}</span>
        <p>Mentor @coding_commando</p>
      </div>
      <div className="flex items-center gap-3">
        <Image
          src={imageUrl}
          width={100}
          height={100}
          alt="Intructor"
          className="rounded-full object-fill"
        />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-6 w-6" />
            <p>500 Students</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Play className="h-6 w-6" /> <p>15 Courses</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-lg font-medium text-[#334155]">{description}</p>
        <p className="font-normal text-[#334155]">{additionInfo}</p>
      </div>
    </div>
  );
}
