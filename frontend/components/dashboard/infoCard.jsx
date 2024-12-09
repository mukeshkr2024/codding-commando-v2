import Image from "next/image";
import Link from "next/link";
import React from "react";

export const InfoCard = ({ label, description, icon, href }) => {
  return (
    <Link
      href={href}
      className="rounded-[10px] border border-[#E2E8F0] px-6 py-10 shadow-sm sm:px-14 sm:py-16"
    >
      <div className="flex flex-col gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9E9E9]">
          <Image src={icon} width={22} height={24} alt="icon" />
        </div>
        <h4 className="text-[17px] font-medium">{label}</h4>
        <p className="text-[15px] font-normal">{description}</p>
      </div>
    </Link>
  );
};
