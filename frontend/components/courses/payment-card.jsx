import React from "react";

export const PaymentCard = ({ title, price, desc }) => {
  return (
    <div
      className="flex w-[330px] cursor-pointer flex-col gap-2 rounded-[15px] border   border-[#F5478E] p-6"
      style={{
        background:
          "linear-gradient(244deg, rgba(217, 217, 217, 0.21) 13.04%, rgba(217, 217, 217, 0.00) 86.65%)",
        // boxShadow: "4px 4px 25.1px 0px ",
        backdropFilter: "blur(7.599999904632568px)",
      }}
    >
      <div className="flex items-center justify-between ">
        <div className="">
          {price && (
            <h2 className="text-2xl font-bold text-[#F5478E]">Rs {price}</h2>
          )}
          {title && (
            <h2 className="max-w-xs text-lg font-bold text-[#F5478E]">
              {title}
            </h2>
          )}
          {desc && <p className="text-base">{desc}</p>}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="26"
          viewBox="0 0 42 26"
          fill="none"
        >
          <circle cx="13" cy="13" r="13" fill="#D9D9D9" fill-opacity="0.4" />
          <circle cx="29" cy="13" r="13" fill="#D9D9D9" fill-opacity="0.4" />
        </svg>
      </div>
      <div className="mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="235"
          height="11"
          viewBox="0 0 235 11"
          fill="none"
        >
          <rect opacity="0.24" width="55" height="11" rx="2" fill="#D9D9D9" />
          <rect
            opacity="0.24"
            x="60"
            width="55"
            height="11"
            rx="2"
            fill="#D9D9D9"
          />
          <rect
            opacity="0.24"
            x="120"
            width="55"
            height="11"
            rx="2"
            fill="#D9D9D9"
          />
          <rect
            opacity="0.24"
            x="180"
            width="55"
            height="11"
            rx="2"
            fill="#D9D9D9"
          />
        </svg>
      </div>
      <div className="mt-1 flex justify-between">
        <div className="h-2  w-16 rounded-[2px] bg-[#493E51]"></div>
        <div className="h-2 w-16  rounded-[2px] bg-[#493E51]"></div>
      </div>
      <div className="h-2  w-8 rounded-[2px] bg-[#493E51]"></div>
    </div>
  );
};
