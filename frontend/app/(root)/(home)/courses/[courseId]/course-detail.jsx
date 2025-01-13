"use client";

import Link from "next/link";
import { useState } from "react";

import { PaymentDetails } from "@/components/courses/payment-detail";
import { ProgramCurricullumList } from "@/components/courses/program-curriculum-list";
import apiClient from "lib/api-client";
import { Loader2 } from "lucide-react";

const CourseDetails = ({ courseId }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  async function getCourseById() {
    try {
      const { data } = await apiClient.get(`/course/${courseId}`);
      setResult(data?.course);
    } catch (error) {
      // ErrorToast(error);
    } finally {
      setLoading(false);
    }
  }

  useState(() => {
    getCourseById();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-dark-purple">
        <Loader2 className="h-16 w-16 animate-spin text-pink-950" />
      </div>
    );
  }

  // if (!result) {
  //   return redirect("/courses");
  // }

  return (
    <div className="flex w-full flex-col overflow-hidden">
      <div className="relative flex w-full flex-col items-center justify-center bg-dark-purple px-4 py-12 text-center text-white">
        <div className="absolute bottom-[-100px] right-20 hidden md:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1067"
            height="535"
            viewBox="0 0 1067 535"
            fill="none"
          >
            <path
              opacity="0.29"
              d="M284.274 470.636L141.163 326.723L0 465.774L40.8887 506.615L149.925 397.707L287.194 534.814L576.336 246.014L713.605 383.121L1023.19 73.9016V246.014H1067V0H818.747V40.8403H996.905L710.684 322.833L572.442 186.699L284.274 470.636Z"
              fill="url(#paint0_linear_130_2391)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_130_2391"
                x1="1098.15"
                y1="35.006"
                x2="172.812"
                y2="535.73"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#A59FFF" />
                <stop offset="1" stop-color="#A59FFF" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="mt-2 max-w-5xl text-3xl font-semibold leading-[1.3] sm:text-4xl md:mt-6 md:text-5xl lg:leading-[1.3] xl:text-6xl">
          {result?.title}
        </h1>
        <div className="mt-4 flex flex-col items-center gap-2 text-center lg:mt-8">
          <p className="text-base md:text-lg xl:text-xl">
            Total Duration:
            <span className="font-semibold capitalize text-[#F5478E]">
              {result?.duration}
            </span>
          </p>
          <p className="text-base md:text-lg xl:text-xl">
            Training Mode:
            <span className="font-semibold capitalize text-[#F5478E]">
              {result?.mode}
            </span>
          </p>
        </div>
        <div className="rounded-custom bg-gradient-custom from-custom via-custom backdrop-blur-custom mx-1 mt-4 max-w-5xl p-6 md:p-8 lg:mt-8 lg:p-12">
          <p className="text-base md:text-lg">{result?.about}</p>
        </div>
        <div className="z-10 mt-6 flex flex-col gap-6 md:mb-8 md:flex-row lg:mt-10 lg:gap-8">
          <Link href="#enroll">
            <button className="button-white-shadow cursor-pointer rounded-3xl bg-pink-500 px-8 py-2 text-base font-semibold capitalize transition-transform hover:scale-105 sm:text-lg">
              Enroll Now!
            </button>
          </Link>
          <Link href="/demo">
            <button className="button-pink-shadow cursor-pointer rounded-3xl border border-white bg-transparent px-10 py-1.5 text-base transition-transform hover:scale-105 sm:text-lg">
              Book Yourself A{" "}
              <span className="font-semibold text-pink-500">Free</span> Demo
            </button>
          </Link>
        </div>
      </div>
      {/* {result?.strategy && (
        <div className="flex w-full flex-col items-center justify-center gap-4 bg-light-white px-4 py-12 text-center md:gap-6 md:py-16 lg:gap-12">
          <h1 className="text-3xl font-bold capitalize sm:text-4xl md:text-5xl lg:text-6xl">
            Curriculum Strategy
          </h1>
          <div className="grid gap-2 md:grid-cols-2 md:gap-6 lg:gap-8 xl:gap-8">
            {result?.strategy.map((curriculum) => (
              <CurriculumStrategyCard {...curriculum} key={curriculum?._id} />
            ))}
          </div>
        </div>
      )} */}
      <ProgramCurricullumList result={result} />
      {/* Mentors  */}
      {/* {result?.mentors && (
        <section
          className="flex w-full flex-col items-center justify-center bg-light-white bg-cover px-8 py-4 pb-14 pt-16 text-center xl:pb-20"
          style={{
            backgroundImage: 'url("assets/vector/mentor-bg-svg.svg")',
          }}
        >
          <h3 className="max-w-xs text-6xl font-semibold sm:max-w-4xl md:text-7xl xl:text-8xl">
            Meet Your Mentor
          </h3>
          <MentorDetails mentors={result?.mentors} />
        </section>
      )} */}
      <PaymentDetails
        title={result?.title}
        {...result?.paymentDetail}
        courseId={result?._id}
      />
    </div>
  );
};

export default CourseDetails;
