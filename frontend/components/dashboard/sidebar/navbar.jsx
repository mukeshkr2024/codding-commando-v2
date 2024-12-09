import React from "react";
import NavbarRoutes from "./navbar-routes";
import { MobileSideBar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-sm">
      <MobileSideBar />
      <NavbarRoutes />
    </div>
  );
};
