import React from "react";
import { SidebarRoutes } from "./sidebar-routes";
import Image from "next/image";
import Link from "next/link";

export const Sidebar = () => {
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
        <SidebarRoutes />
      </div>
    </div>
  );
};
