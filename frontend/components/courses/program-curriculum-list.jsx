import React from "react";
import { ProgramCurricullumCard } from "./program-curriculum-card";

export const ProgramCurricullumList = ({ result }) => {
  return (
    <>
      {result?.program_curriculum && result.program_curriculum?.length > 0 && (
        <div className="flex w-full flex-col items-center justify-center gap-4 bg-light-white px-4">
          <h1 className="mt-8  text-3xl font-bold capitalize  sm:text-4xl md:text-5xl lg:text-6xl ">
            Program Curriculum
          </h1>
          <div className="my-8 flex w-full flex-col items-center justify-center gap-4 px-2 lg:mt-16 lg:gap-6">
            {result.program_curriculum.map((program) => (
              <ProgramCurricullumCard {...program} key={program._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
