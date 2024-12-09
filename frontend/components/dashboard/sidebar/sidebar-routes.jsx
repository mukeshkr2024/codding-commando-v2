"use client";

import {
  BarChart,
  Compass,
  Layout,
  List,
  PhoneCall,
  UserCheck,
  Users,
  Sheet,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Courses",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: UserCheck,
    label: "Team Members",
    href: "/teacher/mentors",
  },
  {
    icon: Users,
    label: "Students",
    href: "/teacher/students",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: PhoneCall,
    label: "To Contact",
    href: "/teacher/contacts",
  },
  {
    icon: Sheet,
    label: "Workshops",
    href: "/teacher/workshops",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex w-full flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
