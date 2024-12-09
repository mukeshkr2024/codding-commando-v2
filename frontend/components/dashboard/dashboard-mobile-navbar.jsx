import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Compass, Layout, Menu, Play, UserCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SidebarItem } from "./sidebar/sidebar-item";
import { useGetUserInfo } from "features/users/api/use-get-userInfo";

export function DashboardMobileNavbar() {
  const { data: user } = useGetUserInfo();

  const isTeacher = user?.role === "admin";

  const routes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Play,
      label: "My Courses",
      href: "/my-courses",
    },
    {
      icon: Compass,
      label: "Courses",
      href: "/search",
    },
    ...(isTeacher
      ? [
          {
            icon: UserCheck,
            label: "Admin Mode",
            href: "/teacher/courses",
          },
        ]
      : []),
  ];

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="bg-white p-0">
          <Sidebar routes={routes} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Sidebar({ routes }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
      <div className="p-6">
        <Link href="/">
          <Image
            src="/dashboard-icon.svg"
            height={180}
            width={180}
            alt="Coding commando"
          />
        </Link>
      </div>
      <div className="flex w-full flex-col">
        <SidebarRoutes routes={routes} />
      </div>
    </div>
  );
}

function SidebarRoutes({ routes }) {
  return (
    <div className="flex w-full flex-col">
      {routes.map((route) => (
        <SheetClose key={route.href} asChild>
          <SidebarItem
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        </SheetClose>
      ))}
    </div>
  );
}
