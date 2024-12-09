import CourseCard from "../shared/card/courseCard";
import Image from "next/image";
import React from "react";

const coursesData = [
  {
    _id: 1,
    title: "Complete Salesforce Training",
    description: "Admin,LWC and Development",
    duration: "3 Months",
    profilePicture: "assets/images/courses/course1-profile.svg",
    alt: "Profile Image",
  },
  {
    _id: 2,
    title: "Complete Salesforce Training",
    description: "Admin,LWC and Development",
    duration: "3 Months",
    profilePicture: "assets/images/courses/course1-profile.svg",
    alt: "Profile Image",
  },
  {
    _id: 3,
    title: "Complete Salesforce Training",
    description: "Admin,LWC and Development",
    duration: "3 Months",
    profilePicture: "assets/images/courses/course1-profile.svg",
    alt: "Profile Image",
  },
  {
    _id: 4,
    title: "Complete Salesforce Training",
    description: "Admin,LWC and Development",
    duration: "3 Months",
    profilePicture: "assets/images/courses/course1-profile.svg",
    alt: "Profile Image",
  },
  {
    _id: 5,
    title: "Complete Salesforce Training",
    description: "Admin,LWC and Development",
    duration: "3 Months",
    profilePicture: "assets/images/courses/course1-profile.svg",
    alt: "Profile Image",
  },
  {
    _id: 5,
    title: "Complete Salesforce Training",
    description: "Admin,LWC and Development",
    duration: "3 Months",
    profilePicture: "assets/images/courses/course1-profile.svg",
    alt: "Profile Image",
  },
];

const Courses = () => {
  return (
    <div
      className="relative flex w-full flex-col items-center justify-center bg-cover bg-no-repeat py-10 xl:mt-4"
      style={{
        backgroundImage: 'url("assets/vector/mentor-bg-svg.svg")',
      }}
    >
      <div className="my-12 flex w-full items-center justify-center xl:my-20">
        <Image
          src="/assets/font-shadow/explore-course.svg"
          alt="Explore"
          height={200}
          width={400}
          className="w-[90%] lg:w-[80%] xl:w-[60%]"
        />
      </div>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-3 xl:gap-6 2xl:gap-12">
        {coursesData &&
          coursesData.map((courseData) => (
            <CourseCard
              courseId={courseData._id}
              description={courseData.description}
              profilePicture={courseData.profilePicture}
              duration={courseData.duration}
              title={courseData.title}
              key={courseData._id}
            />
          ))}
      </div>
      <div className=" mb-10 mt-16 flex w-full items-center justify-center px-2 text-center xl:mt-20">
        <h1 className=" text-2xl font-semibold capitalize  text-black md:text-3xl lg:text-4xl xl:text-5xl">
          coding at just keystock distance from your fingers
        </h1>
      </div>
    </div>
  );
};

export default Courses;
