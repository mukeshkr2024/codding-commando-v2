"use client";

import Image from "next/image";
import React from "react";

export const Wahooo = ({ title, description, setSuccess, additionaldesc }) => {
  const containerStyles = {
    border: "1px solid #000",
    background:
      "linear-gradient(267deg, rgba(255, 255, 255, 0.13) -2.1%, rgba(255, 255, 255, 0.00) 121.83%)",
    backdropFilter: "blur(8.550000190734863px)",
  };

  return (
    <div className="flex h-full w-full items-center justify-center pb-36 pt-16 text-white transition-all">
      <div
        className="relative flex max-w-xl flex-col items-center justify-center gap-4 rounded-[52px] py-12 text-center transition-all"
        style={containerStyles}
      >
        <Image
          src="/assets/icons/succes.svg"
          alt="Success"
          width={100}
          height={100}
        />
        <Image
          src="/assets/icons/cancel-svg.svg"
          alt="Success"
          width={20}
          height={25}
          className="absolute right-6 top-6 cursor-pointer"
          onClick={() => setSuccess(false)}
        />
        <div className="flex flex-col gap-4 px-16 py-6">
          <h2 className="text-3xl font-semibold lg:text-4xl">{title}</h2>
          {additionaldesc && (
            <h4 className="text-2xl font-medium">{additionaldesc}</h4>
          )}
          <p className="text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};
