"use client";

import apiClient from "lib/api-client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const TeamList = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get("/members");
      setTeamData(data?.members);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-pink-100" />
      </div>
    );
  }

  return (
    <div className="mb-8 mt-6 grid  grid-cols-2 gap-x-2 gap-y-6 px-4 md:mb-12 md:grid-cols-3 xl:grid-cols-4">
      {teamData &&
        teamData?.map((member) => (
          <div
            key={member?._id}
            className="flex max-w-xs  flex-col items-center gap-y-2 text-center "
          >
            <Image
              src={member?.imageUrl}
              alt="Profile"
              width={150}
              height={150}
            />
            <span className=" mt-4 text-xl font-bold md:text-2xl">
              {" "}
              {member?.name}
            </span>
            <p className=" text-base md:text-lg">{member?.description}</p>
          </div>
        ))}
    </div>
  );
};
