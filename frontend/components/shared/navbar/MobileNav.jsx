"use client";

import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "../../ui/sheet";
import toast from "react-hot-toast";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const MobileNav = ({ navLinks, authToken }) => {
  const { removeAuthToken } = useUserAccessToken();

  const handleLogout = () => {
    removeAuthToken();
    toast.success("Logged Out");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <FiMenu size={28} />
      </SheetTrigger>
      <SheetContent className="bg-dark-purple text-white  transition-all duration-300 ease-in-out">
        <SheetHeader>
          <SheetTitle>
            <div className="mb-14">
              <Image
                src="/assets/icons/logo.svg"
                alt="Coding Commando"
                height={150}
                width={180}
              />
            </div>
          </SheetTitle>
          <SheetDescription className="flex flex-col space-y-6 text-white">
            {navLinks.map((navItem, index) => (
              <SheetClose asChild key={index}>
                <Link href={navItem.href}>
                  <p className="text-lg font-semibold transition duration-300 hover:text-[#F5478E]">
                    {navItem.title}
                  </p>
                </Link>
              </SheetClose>
            ))}

            {authToken ? (
              <div className="flex w-full flex-col ">
                <SheetClose asChild>
                  <a
                    href="/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold transition duration-300 hover:text-[#F5478E]"
                  >
                    My Courses
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <div>
                    <Button
                      className="mt-4 w-[40%] rounded-[45px] bg-[#F5478E] py-4 transition duration-300 hover:bg-[#be3169]"
                      onClick={() => handleLogout()}
                    >
                      <span className="text-xl font-semibold text-white">
                        Log Out
                      </span>
                    </Button>
                  </div>
                </SheetClose>
              </div>
            ) : (
              <div className="flex w-full flex-col space-y-4">
                <SheetClose asChild>
                  <Link href="/login">
                    <Button className="w-[60%] rounded-[45px] bg-[#F5478E] py-4 transition duration-300 hover:bg-[#be3169]">
                      <span className="text-xl font-semibold text-white">
                        Log In
                      </span>
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/signup">
                    <Button className="w-[60%] rounded-[45px] bg-[#F5478E] py-4 transition duration-300 hover:bg-[#be3169]">
                      <span className="text-xl font-semibold text-white ">
                        Sign Up
                      </span>
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
