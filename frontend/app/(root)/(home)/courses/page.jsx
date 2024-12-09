import React from "react";
import { CourseList } from "@/components/courses/course-list";

export const metadata = {
  title: "Salesforce Training Courses | Coding Commando",
  description: "Get edge with Coding Commando's Salesforce training courses.",
  alternates: {
    canonical: "https://codingcommando.in/courses",
  },
  openGraph: {
    title: "Online Classes at Coding Commando",
    description:
      "Know your coding potential with Coding Commando's online classes.",
    url: "https://codingcommando.in/courses",
    siteName: "Coding Commando",
    Locale: "en_IN",
    type: "website",
    images: "https://codingcommando.in/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Classes at Coding Commando",
    description:
      "Know your coding potential with Coding Commando's online classes.",
  },
};

export default function CoursePage() {
  return (
    <div className="size-full bg-light-white">
      <section
        className="relative h-[690px] w-full max-w-full overflow-hidden bg-[#10001C] bg-no-repeat text-white"
        style={{
          backgroundImage: 'url("/unlocking.png")',
          backgroundPosition: "bottom",
          objectFit: "cover",
        }}
      >
        <div
          className="absolute right-0 top-[200px] h-4/5 w-1/2 bg-contain bg-no-repeat md:top-0 md:h-[67%] md:w-2/5 lg:bg-repeat"
          style={{ backgroundImage: 'url("/assets/images/grid.png")' }}
        ></div>
        <div className="size-full">
          <div className="flex h-[50%] w-full flex-col items-center justify-center space-y-4 px-12 text-center md:space-y-6 xl:space-y-6">
            <h2 className="mt-6 max-w-3xl text-center text-[30px] font-bold leading-[45px] sm:text-5xl sm:leading-[70px] md:mb-6 md:mt-32 md:text-7xl  md:leading-[80px]">
              Unlocking Minds Inspiring Futures
            </h2>
            <p className="pb-2 text-base md:text-lg lg:w-3/5 xl:w-[50%] xl:text-xl">
              Your route to job-ready skills! Our Salesforce training classes
              reduce code complexity to manageable competence, preparing you for
              high-demand employment. Join us now to connect your goals to
              possibilities!
            </p>
          </div>
        </div>
      </section>{" "}
      <div
        className="relative flex w-full flex-col items-center justify-center bg-cover bg-no-repeat "
        style={{
          backgroundImage: 'url("assets/vector/mentor-bg-svg.svg")',
        }}
      >
        <div className="my-8 flex w-full items-center justify-center md:my-0  md:mb-10">
          <h2 className="text-center text-[24px]  font-bold leading-[45px] sm:text-5xl sm:leading-[70px] md:mb-6 md:mt-32 md:text-7xl  md:leading-[80px]">
            Explore Jobs Ready Skills
          </h2>
        </div>
        <div className="mx-auto mb-16 max-w-5xl">
          <CourseList />
        </div>
      </div>
    </div>
  );
}
