"use client";

import { Button } from "antd";
import { useGetUserInfo } from "features/users/api/use-get-userInfo";
import { cn } from "lib/utils";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DashboardMobileNavbar } from "./dashboard-mobile-navbar";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const routes = [
  {
    id: 1,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 2,
    label: "My Courses",
    href: "/my-courses",
  },
  {
    id: 3,
    label: "Courses",
    href: "/search",
  },
];

export function DashboardNavbar() {
  const pathname = usePathname();
  const { data: user } = useGetUserInfo();
  const { removeAuthToken } = useUserAccessToken();
  const isTeacher = user?.role === "admin";

  return (
    <div className="flex h-full w-full items-center border-b-2 border-[#E2E8F0] bg-white px-4">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="hidden md:flex">
          <Image
            src="/dashboard-icon.svg"
            height={180}
            width={180}
            alt="Coding Commando"
          />
        </Link>

        <DashboardMobileNavbar />

        <div className="flex items-center">
          <div className="hidden gap-12 md:flex">
            {routes.map((route) => (
              <Link
                key={route.id}
                href={route.href}
                className={cn(
                  "text-[17px] font-medium",
                  pathname === route.href ? "border-b-2 border-[#B0B0B0]" : "",
                )}
              >
                {route.label}
              </Link>
            ))}
            {isTeacher && (
              <Link href="/teacher/courses">
                <Button className="font-semibold">Admin Mode</Button>
              </Link>
            )}
          </div>
          <div className="ml-20 flex cursor-pointer items-center gap-2 rounded-full">
            <Avatar className="h-10 w-10 border-2 border-black">
              <AvatarImage src={user?.avatar} className="object-cover" />
              <AvatarFallback>
                {user?.firstName?.trim().charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="hidden md:block">{user?.firstName}</p>
          </div>
          <div>
            <LogOut
              className="ml-4 cursor-pointer"
              onClick={() => {
                removeAuthToken();
              }}
            />
          </div>
          <div className="ml-2 md:ml-6">{/* <BellIcon /> */}</div>
        </div>
      </div>
    </div>
  );
}
