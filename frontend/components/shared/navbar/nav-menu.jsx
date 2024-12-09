"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { RxAvatar } from "react-icons/rx";

import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

export const NavMenu = () => {
  const { removeAuthToken } = useUserAccessToken();

  const router = useRouter();

  const handleLogOut = () => {
    removeAuthToken();
    router.push("/");
    toast.success("Logged Out ");
  };
  return (
    <DropdownMenu className>
      <DropdownMenuTrigger className="border-none outline-none">
        <RxAvatar className="h-8 w-8 border-none outline-none" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-2">
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-base  font-medium">
          <a href="/dashboard" target="_blank" rel="noopener noreferrer">
            My Courses
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-base  font-medium">
          <Link href="/">Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-base  font-medium">
          <a href="/profile" target="_blank" rel="noopener noreferrer">
            Profile
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-base font-medium"
          onClick={() => handleLogOut()}
        >
          LogOut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
