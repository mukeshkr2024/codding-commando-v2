import { CourseSlider } from "@/components/course-slider";
import { MeetMentor } from "@/components/shared/meet-mentor";
import { chooseusData, trainingData } from "lib/data";
import Image from "next/image";

export default async function HomePage() {
  return (
    <>
      {/* Shaping  */}
      <section className="flex min-h-[600px] flex-col bg-dark-purple text-white  md:flex-row xl:max-h-[90vh] xl:py-12 xl:pb-16">
        <div className="flex flex-col space-y-6 p-4 px-8 md:w-1/2 xl:space-y-8  xl:p-20">
          <Image
            src="/assets/shapping-svg.svg"
            alt="Shapping"
            height={200}
            width={200}
            className="w-full "
          />
          <p className=" mb-4 md:text-lg  xl:text-xl">
            Coding Commando is a community which garnishes your skills and will
            make you job ready. Through its best cracked courses Coding Commando
            is giving you best training under the guidance of industry experts
            having more then 10 years experience.
          </p>
          <div className="md4:space-x-6 flex flex-col space-y-4 py-3 md:flex-row md:space-y-0 md:py-0 xl:space-x-7">
            <button
              className="w-44  rounded-[45px] bg-[#F5478E] py-2 font-semibold transition-transform hover:scale-105 focus:border-blue-300 focus:outline-none focus:ring md:text-xl md:font-bold xl:px-2 xl:py-3"
              style={{ boxShadow: "1.5px 1.5px white" }}
            >
              <p>Talk To Us</p>
            </button>
            <button
              className="w-60 rounded-[45px] border border-white bg-transparent px-4 py-2 font-semibold transition-transform hover:scale-105 focus:border-blue-300 focus:outline-none focus:ring xl:py-3"
              style={{
                boxShadow: "2.5px 3.5px 6px 0.5px rgba(234, 56, 152, 1)",
              }}
            >
              <p>Get Job-Ready Skills</p>
            </button>
          </div>
        </div>
        <div
          className="bg-cover md:w-1/2"
          style={{ backgroundImage: 'url("/assets/images/grid.png")' }}
        >
          <Image
            src="/assets/images/brain-svg.svg"
            alt="Sample"
            width={200}
            height={200}
            className="h-[90%] w-[92%] rounded sm:h-[75%] xl:h-full xl:w-full"
          />
        </div>
      </section>
      {/* Learn From Us  */}
      <section
        className="shrink-0  bg-light-white  bg-opacity-[100%] bg-contain bg-no-repeat p-8 xl:px-20"
        style={{
          backgroundImage: 'url("assets/vector/learn-bg-svg.svg")',
        }}
      >
        <div className="flex flex-col items-center justify-center md:flex-row">
          <div className="md:w-1/2 md:pr-8">
            <div className="flex flex-col space-y-6 text-center md:text-left lg:space-y-12">
              <Image
                src="/assets/font-shadow/learn-from-svg.svg"
                alt="Learn From Us"
                height={200}
                width={200}
                className="w-[60%]"
              />
              <p className="text-left text-base font-normal leading-6 text-gray-700 md:text-lg md:leading-7 lg:text-xl lg:leading-8  ">
                We want to democratize coding education by reaching every corner
                of the state, Bihar. Learn from the industry experts and
                establish yourself in the field. Coding Commando focuses on
                practical and fun learning. We impart knowledge as well as
                skills. The learning process is liberal, and we promote both
                modes of education.
              </p>
            </div>
          </div>
          <div className="mt-2 flex justify-center md:w-1/2 md:justify-end">
            <Image
              src="/assets/images/learn-img.svg"
              alt="program "
              height={300}
              width={350}
              className="h-[50%] w-[70%]"
            />
          </div>
        </div>
      </section>
      {/* Explore page */}
      <section className=" w-full bg-light-white xl:p-20">
        <div className="flex w-full flex-col items-center justify-center  space-y-8 md:space-y-10 xl:space-y-12">
          <Image
            src="/assets/font-shadow/explore-program-svg.svg"
            alt="Explore Our Programs"
            height={200}
            width={200}
            className="mb-10 hidden w-[75%] sm:flex"
          />
          <Image
            src="/assets/font-shadow/explore-prgram-sm.svg"
            alt="Explore Our Programs"
            height={200}
            width={200}
            className="w-[55%] sm:hidden"
          />
          <CourseSlider />
        </div>
      </section>
      <MeetMentor />
      {/* Choose us  */}
      <section className="bg-dark-purple px-8 text-white xl:px-20">
        <div className="flex flex-col items-center justify-center px-2 py-10 lg:py-12 ">
          <Image
            src="/assets/font-shadow/choose.svg"
            alt="Choose Us"
            height={200}
            width={300}
            className="mb-4 w-[80%] md:mb-0 md:w-[55%] md:py-4"
          />
          <div className="mt-8  flex flex-col space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0 lg:space-x-12 ">
            {chooseusData &&
              chooseusData.map((data) => (
                <div
                  key={data._id}
                  className=" flex w-full flex-col   items-center justify-center space-y-6 rounded-2xl px-6 py-14 text-center"
                  style={{
                    background:
                      " linear-gradient(267deg, rgba(255, 255, 255, 0.13) -2.1%, rgba(255, 255, 255, 0.00) 121.83%)",
                    backdropFilter: "blur(16.549999237060547px)",
                  }}
                >
                  <Image
                    src={data.imageUrl}
                    alt={`Illustration for ${data.description}`}
                    width={70}
                    height={70}
                    className="h-auto w-auto"
                  />
                  <p className="text-base font-normal md:text-lg">
                    {data.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
        {/* Training  */}
        <div className="w-full px-2 py-4 pb-20">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Image
              src="/assets/font-shadow/training-svg.svg"
              alt="Our Training Process"
              width={200}
              height={200}
              className="mb-6 w-[85%] sm:w-[70%] md:mb-0 xl:py-8"
            />
            <div className="flex flex-col-reverse space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0 lg:px-4 lg:pt-10">
              <div className="flex flex-col space-y-6 sm:w-full lg:w-[70%] lg:space-y-10 lg:pr-10">
                {trainingData &&
                  trainingData.map((training) => (
                    <div
                      key={training.title}
                      className="flex flex-col space-y-4"
                    >
                      <h1 className=" py-2 text-2xl font-semibold leading-7 text-pink-500 lg:text-4xl">
                        {training.title}
                      </h1>
                      <p className="text-base font-normal lg:text-lg">
                        {training.description}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="hidden w-full px-12 sm:w-[30%] lg:flex lg:w-[30%] lg:justify-end">
                <Image
                  src="/assets/images/success-svg.svg"
                  alt="Success"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
