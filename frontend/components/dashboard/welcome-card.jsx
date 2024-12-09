"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGetUserInfo } from "features/users/api/use-get-userInfo";

export const WelcomeCard = () => {
  const query = useGetUserInfo();

  return (
    <div className="h-[280px] max-w-sm overflow-hidden rounded-[10px] border border-[#E2E8F0]  bg-[#FAFEFF] sm:h-[300px] sm:w-[280px]">
      <div className="relative flex h-[55%] w-full items-center p-8 sm:h-[65%] sm:justify-center  sm:p-6">
        <div className="absolute h-[1px] w-full bg-[#E2E8F0]" />
        <Avatar className="h-32 w-32  border-2 border-black">
          <AvatarImage src={query?.data?.avatar} className="object-cover" />
          <AvatarFallback className="">
            {query?.data?.firstName.trim(" ").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="px-8 text-start sm:px-6">
        <h3 className="mb-2.5 line-clamp-1 text-xl font-semibold">
          Hello {query?.data?.firstName} {query?.data?.lastName}!
        </h3>
        <p>{query?.data?.email}</p>
        <p>{query?.data?.phone}</p>
      </div>
    </div>
  );
};
