import { MeetMentor } from "@/components/shared/meet-mentor";
import { TeamList } from "@/components/team";
import Image from "next/image";

export const metadata = {
  title: " Online Course Excellence| Coding Commando's Learning Centre",
  description:
    "Explore top-notch online courses at Coding Commando, your premier learning centre for coding excellence.",
  alternates: {
    canonical: "https://codingcommando.in/about-us",
  },
  openGraph: {
    title: " Online Course Excellence| Coding Commando's Learning Centre",
    description:
      "Explore top-notch online courses at Coding Commando, your premier learning centre for coding excellence.",
    url: "https://codingcommando.in/about-us",
    siteName: "Coding Commando",
    Locale: "en_IN",
    type: "website",
    images: "https://codingcommando.in/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: " Online Course Excellence| Coding Commando's Learning Centre",
    description:
      "Explore top-notch online courses at Coding Commando, your premier learning centre for coding excellence.",
  },
};

export default function AboutPage() {
  return (
    <div className="h-full w-full">
      <section className="relative h-[690px] w-full bg-[#10001C] text-white">
        <div
          className=" absolute right-0 top-[200px] h-[80%] w-1/2 bg-contain bg-no-repeat md:top-0 md:h-[67%] md:w-[40%] lg:bg-repeat "
          style={{ backgroundImage: 'url("/assets/images/grid.png")' }}
        ></div>
        <div className="h-full w-full ">
          <div
            className=" flex h-[50%] w-full flex-col items-center justify-center  space-y-4 px-12 text-center md:space-y-6 xl:space-y-6
        "
          >
            <h2 className="mt-10 text-center text-4xl font-bold leading-[45px] sm:text-5xl sm:leading-[70px] md:mb-6 md:mt-32 md:text-7xl lg:text-[90px]">
              Making Sense <br /> with 0 & 1
            </h2>
            <h1 className="pb-2 text-base md:text-lg lg:w-[60%] xl:w-[50%] xl:text-xl">
              Your pathway to job-ready skills! Our cracked courses transform
              coding complexity into accessible expertise, preparing you for
              in-demand jobs. Join us to bridge your ambitions with
              opportunities.
            </h1>
          </div>
          <div className="relative bottom-24 h-[65%]">
            <Image
              src="/making-sense.svg"
              alt="Making"
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>
      <div className=" flex w-full flex-col items-center justify-center gap-4 bg-light-white px-8 py-12 md:flex-row xl:px-32 ">
        <div
          className={` flex flex-col gap-4 py-4 md:w-1/2 lg:pr-8 xl:gap-8  `}
        >
          <h2 className="max-w-xs text-6xl font-bold leading-[70px] md:text-7xl md:leading-[80px]">
            Our Mission
          </h2>

          <h3 className="text-lg font-normal text-gray-800">
            Our objective is to promote an advanced technology ecosystem by
            providing high-quality online classes. We provide students with
            important skills, preparing them for employment, under the
            supervision of seasoned industry specialists. We want to increase
            awareness of in-demand talents and their importance in today&apos;s
            economy. Work with us to attain your professional objectives through
            customized online lessons, resume-building activities, and mock
            interviews.
          </h3>
        </div>
        <div className="mt-4  md:w-1/2 lg:mt-0  lg:flex lg:justify-end">
          <Image
            src={"/assets/images/mission-svg.svg"}
            alt={" Our Mission"}
            width={400}
            height={300}
          />
        </div>
      </div>
      <div
        className="h-full w-full bg-no-repeat"
        style={{
          backgroundImage: 'url("assets/vector/mentor-bg-svg.svg")',
        }}
      >
        <div className=" flex w-full flex-col items-center justify-center gap-4 bg-light-white px-8 py-12 md:flex-row xl:px-32 ">
          <div
            className={` flex flex-col gap-4 py-4 md:order-1 md:w-1/2 lg:pr-8 xl:gap-8 `}
          >
            <h2 className="max-w-xs text-6xl font-bold leading-[70px] md:text-7xl md:leading-[80px]">
              Our Vission
            </h2>
            <p class Name="text-gray-800 text-lg font-normal">
              Through online classes, we help applicants acquire interview
              skills while also promoting a lively tech ecosystem. Our objective
              is to develop an innovative culture while also facilitating
              information exchange with industry professionals. We provide
              flexible online training to help coding enthusiasts conquer
              interviews with confidence.
            </p>
          </div>
          <div className="mt-4 md:w-1/2 lg:mt-0 lg:flex ">
            <Image
              src={"/vision.jpg"}
              alt={"Our  Vision"}
              width={400}
              height={400}
              className="rounded-[15%] border-2 border-black
              "
            />
          </div>
        </div>
      </div>
      <MeetMentor />
      <section className="w-full bg-light-white sm:px-0 ">
        <div
          className="flex w-full flex-col items-center justify-center bg-contain bg-no-repeat px-4"
          style={{
            backgroundImage: 'url("assets/vector/team-vector.svg")',
          }}
        >
          <div className="flex w-full items-center justify-center py-8 md:py-8 lg:py-10 xl:py-12 ">
            <h2 className=" text-6xl font-bold leading-[70px] md:text-7xl  md:leading-[80px] lg:text-8xl">
              Our Team
            </h2>
          </div>
          <TeamList />
        </div>
      </section>
    </div>
  );
}
