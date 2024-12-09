"use client";

import { MentorCard } from "./card/mentor-card";
import apiClient from "lib/api-client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export const MeetMentor = () => {
  const [mentors, setMentors] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchMentors = async () => {
    try {
      const { data } = await apiClient.get("/teachers");
      setMentors(data?.mentors);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  if (loading) {
    return (
      <div className="flex h-40 w-full items-center justify-center bg-light-white">
        <Loader2 className="h-16 w-16 animate-spin text-pink-100" />
      </div>
    );
  }

  return (
    <section
      className="flex w-full flex-col items-center justify-center bg-light-white bg-cover px-8 py-4 pb-8 pt-16 text-center xl:pb-20 "
      style={{
        backgroundImage: 'url("assets/vector/mentor-bg-svg.svg")',
      }}
    >
      <h3 className=" text-center text-4xl font-bold leading-[45px] sm:text-5xl sm:leading-[60px] md:mb-6 md:text-7xl lg:text-7xl">
        Meet Your Mentor
      </h3>

      {/* <div className="mt-2 grid grid-cols-1 sm:mt-20 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 "> */}
      <div className="mt-2 flex max-w-7xl flex-wrap items-center justify-center">
        {mentors &&
          mentors.map((mentor) => <MentorCard key={mentor.id} {...mentor} />)}
      </div>
    </section>
  );
};
