"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InfiniteMovingCards } from "@/components/ui/infinity-moving-cards";
import { OfferEnds } from "@/components/workshops/offer-end";
import { SalesforcePopup } from "@/components/workshops/saleforce-popup";
// eslint-disable-next-line camelcase
import { Hanken_Grotesk } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "600", "700", "800", "900"],
});

const programs = [
  {
    id: 1,
    title:
      "Students who just graduated and want to work in the Salesforce Industry and are having trouble finding jobs.",
  },

  {
    id: 2,
    title:
      "Students who are in their last year and are looking to get trained in highly demanded Salesforce skills.",
  },
  {
    id: 3,
    title: "Aspirants who are willing to switch to a Job in the IT Industry.",
  },
  {
    id: 4,
    title: "People who want to work in the IT Sector, even with career gaps.",
  },
  {
    id: 5,
    title:
      "Housewives looking to restart their careers in IT and actively searching for job opportunities.",
  },
];

const benefits = [
  {
    id: 1,
    title: "Bonouses worth ₹10,000/-",
    description: [
      "Top 50 questions asked in Screening Interviews- ₹3999. Lifetime access to salesforce top community- ₹1999. Additional Hand-Picked Learning Resources- ₹3999",
    ],
    icon: "/assets/workshops/workshop-icon-1.svg",
  },
  {
    id: 2,
    title: "Hacks from industry experts",
    description:
      "50 Expert Hacks to Land Your Dream Job and Boost Your Income.",
    icon: "/assets/workshops/workshop-icon-2.svg",
  },
  {
    id: 3,
    title: "Gain industry insights",
    description:
      "You will get Knowledge from Industry expert and founder of Salesforce consulting company",
    icon: "/assets/workshops/workshop-icon-3.svg",
  },
  {
    id: 4,
    title: "Certification upon completion",
    description:
      "You will get certification which will help you in standing out of the crowd.",
    icon: "/assets/workshops/workshop-icon-4.svg",
  },
];

const students = [
  {
    id: 1,
    name: "Mohit Kumar",
    description: [
      "Thanks to this training, I smoothly transitioned from a developer to a Salesforce consultant.",
      "The trainers were excellent, guiding me through basics and hands-on projects. Much gratitude to Coding Commando for enhancing my skills.",
    ],
    profile: "/assets/workshops/mohit.jpg",
  },
  {
    id: 2,
    name: "Rishav kalay",
    description: [
      "I had an excellent learning experience. The trainer offered relevant examples, and I thoroughly enjoyed the sessions.",
      "My heartfelt thanks to the Coding Commando team for their unwavering support.",
    ],
    profile: "/assets/workshops/rishav-png.jpg",
  },
  {
    id: 3,
    name: "Nitish Kumar",
    description: [
      "Recently completed Salesforce training on Edureka and couldn't be happier. The overall experience was fantastic.",
      " The course design aligns perfectly with industry standards, and the content delivery was exceptional.",
    ],
    profile: "/assets/workshops/Nitish.jpg",
  },
  // {
  //   id: 4,
  //   name: "Nishanth Singh",
  //   description: [
  //     "Selected the Coding Commando Salesforce online course for my Salesforce admin certification journey, and it was the best decision. Trainees' expertise in Salesforce, providing practical examples from various domains, made the training exceptional.",
  //     "The course content was meticulously structured with plenty of real-world examples, enabling learners to absorb concepts comfortably.",
  //   ],
  //   profile: "/assets/workshops/profile-1.svg",
  // },
  // {
  //   id: 5,
  //   name: "Vyash",
  //   description: [
  //     "I joined the workshop which was taught by Prateek sir. He assisted us with how to make a career in IT, how he faced challenges and now he is the owner of the company. Through his guidance I joined their course.",
  //     "The result is fruitful because of the guidance of Prateek and trainers. I have landed a high paying job in a top mnc company. I am very thankful to these guys.",
  //   ],
  //   profile: "/assets/workshops/profile-1.svg",
  // },
  // {
  //   id: 6,
  //   name: "Vani Sudha",
  //   description: [
  //     "Trainers are very supportive and knowledgeable Good services with active Response.I would recommend coding commando to those students who want to make their career in IT.",
  //   ],
  //   profile: "/assets/workshops/profile-1.svg",
  // },
];

const companies = [
  {
    id: 1,
    imgUrl: "/assets/workshops/company-1.png",
  },
  {
    id: 2,
    imgUrl: "/assets/workshops/company-2.png",
  },
  {
    id: 3,
    imgUrl: "/assets/workshops/company-3.png",
  },
  {
    id: 4,
    imgUrl: "/assets/workshops/company-4.png",
  },
  {
    id: 5,
    imgUrl: "/assets/workshops/company-5.png",
  },
  {
    id: 6,
    imgUrl: "/assets/workshops/company-6.png",
  },
  {
    id: 7,
    imgUrl: "/assets/workshops/company-7.png",
  },
  {
    id: 8,
    imgUrl: "/assets/workshops/company-8.png",
  },
  {
    id: 9,
    imgUrl: "/assets/workshops/company-9.png",
  },
  {
    id: 10,
    imgUrl: "/assets/workshops/company-10.png",
  },
  {
    id: 11,
    imgUrl: "/assets/workshops/company-11.png",
  },
  {
    id: 12,
    imgUrl: "/assets/workshops/company-12.png",
  },
];

const Workshop = () => {
  const [minutes, setMinutes] = useState(29);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  return (
    <div
      className={`relative w-full bg-[#050208] text-white ${hanken.className}`}
    >
      <div className="fixed bottom-0  z-30 flex w-full items-center bg-[#171123] p-3 sm:hidden">
        <div className="flex-1">
          <p className="text-xl font-bold">
            ₹99 <span className="font-light line-through">₹999</span>
          </p>
          <p className="text-base font-light">
            Offer ends in{" "}
            <span className="font-bold">
              {minutes}:{seconds}
            </span>{" "}
          </p>
        </div>
        <div className="flex-1">
          <button className="w-full  rounded-[9px] bg-[#A100FF] py-2.5 text-lg font-medium text-black">
            <Link href="/workshop/salesforce/register">Register Now</Link>
          </button>
        </div>
      </div>

      <SalesforcePopup minutes={minutes} seconds={seconds} />
      <div className="pointer-events-none absolute right-0 top-0 z-0 ">
        <Image
          src="/assets/workshops/landing-1-bg.svg"
          alt="gradient"
          width={350}
          height={400}
          className="w-[120px] sm:w-[180px] md:w-[250px] lg:w-[350px]"
        />
      </div>

      <div className="pointer-events-none absolute left-0 top-0 z-0 -translate-y-10 rotate-0">
        <Image
          src="/assets/workshops/landing-2-bg.svg"
          alt="gradient"
          width={350}
          height={400}
          className="w-[120px] sm:w-[180px] md:w-[250px] lg:w-[350px]"
        />
      </div>

      <div className="relative z-10 mx-auto flex flex-col gap-y-6 overflow-hidden  pt-16 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
        <h1 className="mx-auto max-w-4xl text-center text-4xl font-semibold md:text-5xl lg:text-6xl">
          Dreaming to transform your career in IT?
        </h1>
        <p className="text-center text-base font-light text-[#A100FF] md:text-2xl">
          Are you a fresher, taking a carrer break or are you switching your
          career?
        </p>
        <div class="mx-auto mt-4 max-w-5xl">
          <div class="flex flex-col lg:flex-row">
            <div class="mx-4 mb-4 rounded-lg md:mx-6 lg:mx-0 lg:mb-0 lg:mr-4 lg:flex-1">
              <video controls class="w-full">
                <source
                  src="https://coddingbucket.s3.ap-south-1.amazonaws.com/workshop-video.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div class=" lg:flex-1">
              <div class="px-4 py-2 lg:px-6">
                <div class="flex h-full flex-col justify-between">
                  <div class="mb-4 lg:mb-0">
                    <span class="mb-2 inline-block rounded-lg border border-purple-600 px-4 py-2 text-lg font-medium">
                      26 to 28 April 2023
                    </span>
                    <span class="ml-4 inline-block rounded-lg border border-purple-600 px-4 py-2 text-lg font-medium">
                      8:00 PM
                    </span>
                  </div>
                  <p class="text-lg font-normal lg:text-xl">
                    Workshop Language: English+Hindi
                  </p>
                  <h1 class="mb-2 text-xl font-bold text-slate-500 lg:m-1.5 lg:text-2xl">
                    Discover Your Future In <br /> IT With Our
                  </h1>
                  <h3 class="text-3xl font-bold leading-tight lg:mt-1 lg:text-5xl">
                    3-Day Career Mapping Workshop
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <OfferEnds minutes={minutes} seconds={seconds} />

        <div className="mx-auto max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          <Image
            src="/assets/workshops/3-day-workshop.svg"
            alt="Workshop"
            width={1300}
            height={1000}
          />
        </div>

        <div className="mx-auto  flex max-w-5xl flex-col items-center justify-center gap-y-5 ">
          <RegisterButton paragraph={true} />
          <h4 className="py-4 text-center text-2xl font-semibold sm:text-3xl md:py-10 md:text-4xl lg:text-[42px]">
            Join now the growing in-demand skill
          </h4>
        </div>

        <div class="relative mx-auto flex max-w-6xl flex-col items-center justify-center gap-y-12 md:mt-4 ">
          <div className="absolute hidden md:flex">
            <Image
              src="/assets/workshops/salesforce-bg.png"
              width={750}
              height={200}
              alt="Salesforce"
            />
          </div>
          <div class=" flex flex-col md:mt-8 md:flex-row md:gap-x-8 lg:gap-x-[350px]">
            <div class="flex flex-col md:w-1/2 md:gap-y-10">
              <div class="flex flex-col items-center justify-center gap-2 px-6 py-4 text-center">
                <span class="text-4xl font-bold md:text-6xl">
                  <span class="text-[#EA4468]">9.3+</span> Million
                </span>
                <p class="text-lg font-normal text-[#AEAEAE] md:text-xl">
                  Jobs worldwide
                </p>
              </div>

              <div class="flex flex-col items-center justify-center gap-2 px-6 py-4 text-center">
                <span class="text-4xl font-bold md:text-6xl">
                  <span class="text-[#EA4468]">6</span> LPA
                  <span class="text-[#EA4468]">*</span>
                </span>
                <p class="text-lg font-normal text-[#AEAEAE] md:text-xl">
                  Average fresher Salesforce salary
                </p>
              </div>
            </div>

            <div class="flex flex-col md:w-1/2 md:gap-y-10">
              <div class="flex flex-col items-center justify-center gap-2 px-6 py-4 text-center">
                <span class="text-4xl font-bold md:text-6xl">
                  <span class="text-[#EA4468]">1.3+</span> Million
                </span>
                <p class="text-lg font-normal text-[#AEAEAE] md:text-xl">
                  Upcoming jobs in India
                </p>
              </div>

              <div class="flex flex-col items-center justify-center gap-2 px-6 py-4 text-center">
                <span class="text-4xl font-bold md:text-6xl">
                  <span class="text-[#EA4468]">40</span>%
                  <span class="text-[#EA4468]">*</span>
                </span>
                <p class="text-lg font-normal text-[#AEAEAE] md:text-xl">
                  Average fresher Salesforce salary
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-12  md:py-8 md:pt-20">
          <h3 className="text-center text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-[42px]">
            Top Companies Hiring Salesforce Developers
          </h3>
          <InfiniteMovingCards
            items={companies}
            direction="right"
            speed="normal"
            pauseOnHover={false}
          />
        </div>

        <OfferEnds minutes={minutes} seconds={seconds} />

        <section className="my-8 rounded-[32px] bg-[#171123] py-8 md:my-12 md:py-14">
          <div>
            <h3 className="text-center text-2xl font-bold sm:text-3xl lg:text-5xl">
              Who is this program for?
            </h3>

            <div className="mx-auto mt-8 flex max-w-[56rem] flex-wrap justify-center gap-y-4 px-4 sm:gap-y-6  md:mt-16 md:justify-between">
              {programs &&
                programs.map((program) => (
                  <div
                    className="flex w-[1000px] items-center gap-3 rounded-lg bg-[#221935] px-4 py-3 sm:gap-5 sm:rounded-xl sm:px-6 md:rounded-2xl lg:rounded-[65px]"
                    key={program.id}
                  >
                    <Image
                      src="/assets/icons/star.svg"
                      alt="star"
                      width={18}
                      height={18}
                    />
                    <p className="text-base font-medium">{program.title}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <div className="mx-auto flex max-w-[53rem] flex-col items-center justify-center gap-y-10 md:gap-y-16 ">
          <h3 className="text-center text-3xl font-semibold">Benifits</h3>

          <div className="flex flex-wrap justify-center gap-y-7 lg:justify-between ">
            {benefits &&
              benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="flex  h-[250px] w-[350px] flex-col justify-center  gap-y-3 rounded-[10px]  bg-[#171123] bg-no-repeat p-6 text-start  md:h-[272px] md:w-[410px]"
                  style={{
                    backgroundImage: "url('/assets/workshops/benefit.png')",
                  }}
                >
                  <div className="flex w-full items-center justify-center">
                    <Image
                      src={benefit.icon}
                      alt="pencil icon"
                      width={75}
                      height={48}
                      className="pt-2"
                    />
                  </div>

                  <h4 className="mt-4 text-[19px]">{benefit.title}</h4>
                  <p className="text-sm text-[#C0C0C0]">
                    {benefit.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className="mx-auto mt-4 flex max-w-5xl flex-col items-center justify-center gap-y-6 md:mt-12">
          <RegisterButton paragraph={true} />
        </div>

        <div className="mx-auto my-6 max-w-sm sm:max-w-lg md:my-14  md:max-w-2xl lg:max-w-5xl xl:max-w-7xl ">
          <h3 className="text-center text-4xl font-semibold md:text-[42px]">
            Meet your mentor
          </h3>
          <div className="flex flex-col items-center justify-center lg:flex-row">
            <div className="flex-1  px-10">
              <Image
                src="/assets/workshops/prateek-prasoon.png"
                alt="Prateek"
                width={559}
                height={446}
              />
            </div>
            <div className=" flex flex-1 flex-col gap-y-4 px-5  md:gap-y-8 md:pl-12 md:pr-20">
              <span className="mt-8 text-3xl font-bold md:text-[39px]">
                Prateek Prasoon
              </span>
              <div className="flex flex-col gap-y-6 text-lg font-light md:text-xl">
                <p>
                  Meet Prateek, the visionary founder of CloudPrism Solutions,
                  leveraging over 9 years of hands-on Salesforce expertise. With
                  a passion for guiding individuals towards successful careers
                  in the tech industry, Prateek has mentored numerous
                  professionals, imparting invaluable knowledge and skills.
                </p>
                <p>
                  As the driving force behind Coding Commando EdTech, Prateek
                  extends his impact further by providing various IT courses.
                  Having personally taught over 5000 students throughout his
                  illustrious career, he continues to inspire and empower
                  aspiring tech enthusiasts to realize their full potential.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="px-4 text-center text-4xl font-semibold md:text-[42px]">
            Look what our student says
          </h1>
          <div className="mt-10 flex flex-wrap justify-center gap-6  md:mt-16 md:gap-8">
            {students &&
              students.map((student) => (
                <div
                  key={student.id}
                  style={{
                    background:
                      " linear-gradient(149.64deg, rgba(25, 25, 25, 0.77) 21.24%, rgba(14, 14, 14, 0.77) 105.43%);",
                  }}
                  className="h-[240px] w-[350px] rounded-[8px] border border-[#2E2E2E] px-8 py-4 shadow-md md:w-[396px]"
                >
                  <div className="flex items-center gap-4 rounded-full">
                    <Image
                      src={student.profile}
                      width={55}
                      height={55}
                      alt="profile"
                      className="rounded-full"
                    />
                    <div>
                      <span>{student.name}</span>
                      <p>{student.company}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    {student.description.map((desc, idx) => (
                      <p
                        key={idx}
                        className="line-clamp-3
                      text-[13.9px] font-normal text-[#ADADAD]"
                      >
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col-reverse md:mt-16  lg:flex-row">
          <div className=" flex flex-1 flex-col  justify-between gap-y-4  px-6 py-5 md:px-14">
            <h3 className="text-4xl font-semibold leading-[50px] md:text-[42px]">
              Unlock Bonuses worth{" "}
              <span
                style={{
                  background:
                    "linear-gradient(92.48deg, #CFA947 2.08%, #C053BB 31.29%);",
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                }}
              >
                ₹10,000
              </span>
            </h3>
            <div className="flex flex-col gap-2 text-lg font-light md:text-[22px]">
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/workshops/sign.png"
                  width={40}
                  height={40}
                  alt="sign"
                />
                <p>Top 50 questions asked in Screening Interviews- ₹3999</p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/workshops/sign.png"
                  width={40}
                  height={40}
                  alt="sign"
                />
                <p>Lifetime access to salesforce top community- ₹1999</p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/workshops/sign.png"
                  width={40}
                  height={40}
                  alt="sign"
                />
                <p>Additional Hand-Picked Learning Resources- ₹3999</p>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-[40px] md:leading-[50px]">
              Get a Coding Commando{" "}
              <span
                style={{
                  background:
                    "linear-gradient(92.48deg, #CFA947 2.08%, #C053BB 31.29%);",
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                }}
              >
                Certificate
              </span>{" "}
              upon completion
            </h3>
          </div>
          <div className="flex-1 px-5">
            <Image
              src="/assets/workshops/certificate.png"
              width={614}
              height={427}
              alt="Certificate"
            />
          </div>
        </div>

        <OfferEnds minutes={minutes} seconds={seconds} />

        <section className="mx-auto mt-10 max-w-sm sm:max-w-lg md:mt-20 md:max-w-3xl xl:max-w-[62rem]">
          <h3 className="text-center text-3xl font-semibold md:text-[40px]">
            Questions generally asked about the workshop
          </h3>

          <div className="mt-10 w-full px-2 md:mt-20 xl:w-[62rem]">
            <Accordion
              type="single"
              collapsible
              className="flex w-full flex-col gap-y-4"
            >
              {faqs &&
                faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>
                      <h4 className="text-base font-medium text-[#E0E0E0] md:text-[22px]">
                        {faq.title}
                      </h4>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm font-light text-[#A6A6A6] md:text-base">
                        {faq.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </section>
      </div>

      <div className="mt-14 w-full bg-[#D9D9D91C]">
        <div className="mx-auto flex max-w-5xl flex-col justify-between px-5 py-12 md:flex-row">
          <div className="flex max-w-md flex-col gap-y-10">
            <Image
              src="/assets/icons/logo.svg"
              width={180}
              height={150}
              alt="logo"
            />
            <div className="flex flex-col gap-2">
              <span className=" text-[28px] font-bold">Contact Us</span>
              <p className="text-base font-light leading-[29px] text-[#BDBDBD] md:text-[23px]">
                Sandesh sadan near mamta apartment, south shivpuri Patna 800023
              </p>
            </div>
          </div>
          <div>
            <div className="mt-4 text-base text-[#BDBDBD] md:mt-0 md:text-[21px]">
              <p>+91 8002732847</p>
              <p>join@codingcommando.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshop;

export function RegisterButton({ paragraph }) {
  return (
    <>
      <button className="max-w-lg rounded-[9px]  bg-[#A100FF] px-12 py-4 text-base font-medium text-black sm:text-lg md:px-14 md:text-2xl lg:max-w-xl lg:text-[32px]">
        <Link href="/workshop/salesforce/register">
          Register now for ₹99 <span className="line-through"> ₹ 999</span>
        </Link>
      </button>
      {paragraph && (
        <p className="   flex max-w-sm flex-col items-center text-center text-sm font-normal   sm:max-w-lg  sm:text-base md:max-w-xl md:text-[21px] lg:max-w-3xl xl:max-w-5xl">
          This Webinar is for all freshers who are looking for new opportunities
          in the Salesforce and for those who want to switch their career in the
          Salesforce Industry.{" "}
        </p>
      )}
    </>
  );
}

const faqs = [
  {
    id: 1,
    title: "How can I join the workshop ?",
    description:
      "Yes,This will be a Free webinar ,where you will get a bonus worth Rs. Rs.10,000 which will help you to enhance your career",
  },
  {
    id: 2,
    title: "Is this a FREE Webinar ?",
    description: "No, this is a paid webinar priced with just  99  Rs.",
  },
  {
    id: 3,
    title: "What will you learn in this 3 Day Salesforce Workshop ?",
    description:
      " You will learn about salesforce tools and High paying Jobs in salesforce, 50 hacks to crack interviews.",
  },
  {
    id: 4,
    title: "Will I get the recording of the workshop ?",
    description:
      "Come learn with us live! You'll understand better when you join in real-time. Sorry, no replays, but being there live is the best way to learn.",
  },
  {
    id: 5,
    title: "Will I get a certificate after completing a 3 day workshop?",
    description:
      "Yes, You will receive a Workshop Completion Certificate from Coding Commando upon completing the 3 day workshop.",
  },
];
