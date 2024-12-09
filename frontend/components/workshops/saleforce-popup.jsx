"use client";

import React, { useEffect, useState } from "react";
// import { OfferEnds } from "./offer-end";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SalesforcePopup = ({ minutes, seconds }) => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setInterval(() => {
      setShowPopup(true);
    }, 30000);
  }, []);

  if (!showPopup) {
    return null;
  }

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleClick = () => {
    return router.push("/workshop/salesforce/register");
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur-md">
      <div className=" relative flex h-[420px]   w-[92vw] justify-between overflow-hidden rounded-[10px] bg-[#FFF2F2] text-black sm:w-[70vw] md:h-[58vh] md:w-[80vw] lg:h-[580px]">
        <div className="z-10 flex max-w-xl  flex-col justify-between px-4 py-6 lg:px-10 lg:py-12">
          <h3 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:leading-[50px] xl:text-[42px]">
            Register now and Unlock Bonuses worth
            <span
              style={{
                background:
                  "linear-gradient(92.48deg, #CFA947 2.08%, #C053BB 31.29%);",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              $10,000{" "}
            </span>
          </h3>
          <div className="flex flex-col gap-y-3 text-sm font-light sm:text-base md:text-lg ">
            <div className="flex items-center gap-4">
              <Image
                src="/assets/workshops/sign.png"
                width={25}
                height={25}
                alt="sign"
                className=""
              />
              <p>
                Top 50 questions asked in Screening Interviews-{" "}
                <span className="line-through">₹3999</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/assets/workshops/sign.png"
                width={25}
                height={25}
                alt="sign"
              />
              <p>
                Lifetime access to salesforce top community-{" "}
                <span className="line-through">₹1999</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/assets/workshops/sign.png"
                width={25}
                height={25}
                alt="sign"
              />
              <p>
                Additional Hand-Picked Learning Resources-{" "}
                <span className="line-through">₹3999</span>
              </p>
            </div>
          </div>

          <div className="flex  flex-col items-center justify-center gap-y-2 lg:gap-y-4">
            <button
              style={{
                background:
                  "linear-gradient(91.28deg, #EDBB3A -64.96%, #E552DF 99.99%)",
              }}
              className="flex rounded-[9px] px-12 py-3 font-medium lg:text-[32px]"
              onClick={handleClick}
            >
              <p>Register now for ₹99 {"  "}</p>
              <span className="pl-[8px] line-through"> ₹ 999</span>
            </button>
            <p>Offer ends in</p>
            <div className="mt-2 flex gap-6">
              <div
                className=" flex h-[74px] w-[74px] flex-col items-center justify-center rounded-[15px] border border-[#202020] md:h-24 md:w-24
  lg:h-20 lg:w-20"
              >
                <span className="text-3xl font-semibold md:text-5xl">00</span>
                <p className="text-base font-normal md:text-lg">Hours</p>
              </div>
              <div
                className=" flex h-[74px] w-[74px] flex-col items-center justify-center rounded-[15px] border border-[#202020] md:h-24 md:w-24
  lg:h-20 lg:w-20"
              >
                <span className="text-3xl font-semibold md:text-5xl">
                  {minutes}
                </span>
                <p className="text-base font-normal md:text-lg">Mins</p>
              </div>
              <div
                className=" flex h-[74px] w-[74px] flex-col items-center justify-center rounded-[15px] border border-[#202020] md:h-24 md:w-24
  lg:h-20 lg:w-20"
              >
                <span className="text-3xl font-semibold md:text-5xl">
                  {seconds}
                </span>
                <p className="text-base font-normal md:text-lg">Seconds</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute right-[-200px] h-full w-[80%]"
          style={{
            background: "url('/assets/workshops/landing-png.png') ",
          }}
        ></div>

        <div
          className="absolute right-2 top-2 z-30 cursor-pointer lg:right-6 lg:top-6"
          onClick={handleClose}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3.65918"
              width="37.2525"
              height="5.17396"
              rx="2.58698"
              transform="rotate(45 3.65918 0)"
              fill="white"
            />
            <rect
              y="26.3414"
              width="37.2525"
              height="5.17396"
              rx="2.58698"
              transform="rotate(-45 0 26.3414)"
              fill="white"
            />
          </svg>
        </div>

        {/* <div
        //   style={{
        //     backgroundImage: "url('/assets/workshops/landing-png.png') ",
        //   }}
        //   className="w-[80%] bg-cover bg-center"
        >
          <Image
            src="/assets/workshops/landing-png.png"
            width={400}
            height={200}
            alt="landing png"
            className="h-full w-[1000px]"
          />
        </div> */}
      </div>
    </div>
  );
};
