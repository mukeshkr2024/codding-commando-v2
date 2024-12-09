"use client";

import Image from "next/image";
import React, { useState } from "react";

export const ProgramCurricullumCard = ({ title, description }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className=" w-full max-w-6xl rounded-[36px] border border-[#9662D9]"
      style={{
        background:
          "linear-gradient(267deg, rgba(255, 255, 255, 0.75) -2.1%, rgba(255, 255, 255, 0.00) 121.83%)",
        backdropFilter: "blur(16.549999237060547px)",
      }}
    >
      <div className="flex w-full justify-between px-4 py-2.5">
        <div className="flex gap-3">
          <Image
            src="/assets/icons/vector-24.svg"
            alt="Arrow"
            height={25}
            width={25}
          />
          <h2 className="text-lg font-semibold md:text-xl">{title}</h2>
        </div>

        <Image
          src="/assets/icons/vector-28.svg"
          alt="up-down-arrow"
          height={20}
          width={20}
          className={` ${
            open ? "rotate-180 transition-all ease-in-out" : ""
          } cursor-pointer`}
          onClick={() => setOpen(!open)}
        />
      </div>
      {open && (
        <div className="px-16 pb-6">
          {description && description.length > 0 && (
            <ol>
              {description?.map((item, index) => (
                <li key={item.map}>
                  <span>{String.fromCharCode(97 + index)}. </span> {item.title}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};
