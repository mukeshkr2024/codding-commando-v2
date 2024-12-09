import Image from "next/image";
import React from "react";

export const CurriculumStrategyCard = ({ imageUrl, title, description }) => {
  return (
    <div className="mt-8 px-6 sm:px-0">
      <div className="flex w-full gap-6 lg:gap-10">
        <Image src={imageUrl} alt="icon" height={60} width={60} />
        <div className="flex max-w-[20rem] flex-col text-start ">
          <h2 className="text-sm font-bold  leading-normal sm:text-base lg:text-lg">
            {title}
          </h2>
          <p className="text-sm text-[#646464] sm:text-base  ">{description}</p>
        </div>
      </div>
    </div>
  );
};
