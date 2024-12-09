"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../../ui/button";
import { UserAvatar } from "./nav-menu-avatar";
import { useGetUserInfo } from "features/users/api/use-get-userInfo";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const { data: user } = useGetUserInfo();

  const isTeacher = user?.role === "admin";

  const isTeacherPage = isTeacher && pathname.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");

  const linkButton = (href, children) => (
    <Link href={href}>
      <Button size="sm" variant="default">
        {children}
      </Button>
    </Link>
  );

  return (
    <>
      {/* {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )} */}

      <div className="ml-auto flex items-center justify-center gap-10 gap-x-2">
        {isTeacherPage || isCoursePage
          ? linkButton(
              "/dashboard",
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Exit
              </>,
            )
          : isTeacher
            ? linkButton("/teacher/courses", "Teacher Mode")
            : null}

        <UserAvatar imageUrl={user?.avatar} name={user?.name || "Profile"} />
      </div>
    </>
  );
};

export default NavbarRoutes;
