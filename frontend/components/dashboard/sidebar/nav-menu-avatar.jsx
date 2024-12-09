"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

export const UserAvatar = ({ imageUrl, name }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const { removeAuthToken } = useUserAccessToken();

  const handleLogOut = () => {
    removeAuthToken();
    router.push("/");
    toast.success("Logged Out");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <DropdownMenu className>
      <DropdownMenuTrigger className=" ml-2 border-none outline-none">
        <Avatar className="h-10 w-10 cursor-pointer hover:border-2">
          <AvatarImage src={imageUrl} />
          <AvatarFallback className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]  from-sky-300 to-blue-400 text-lg font-bold text-[#252525]">
            {name?.trim(" ").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" mr-2 flex flex-col gap-1 px-2">
        <DropdownMenuItem className="cursor-pointer text-sm  font-medium sm:text-base">
          <Link href={`/`}>Home</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer text-sm font-medium sm:text-base"
          onClick={() => handleLogOut()}
        >
          LogOut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
