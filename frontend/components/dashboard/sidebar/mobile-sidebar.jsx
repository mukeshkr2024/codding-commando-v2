import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import { Sidebar } from "./sidebar";

export const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 hover:opacity-75 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="bg-white p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
