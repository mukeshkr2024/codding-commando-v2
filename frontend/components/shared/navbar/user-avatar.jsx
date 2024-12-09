"use client";

import React, { useEffect, useState } from "react";
import { NavMenu } from "./nav-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import apiClient from "lib/api-client";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const UserAvatar = ({ navLinks }) => {
  const { authToken } = useUserAccessToken();
  const [isMounted, setIsMounted] = useState(false);

  const { removeAuthToken } = useUserAccessToken();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        await apiClient.get("/validate-session", config);
      } catch (error) {
        removeAuthToken();
      }
    };

    if (authToken) {
      validateSession();
    }
  }, [authToken, removeAuthToken]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {authToken ? (
        <div className="hidden md:flex">
          <NavMenu user={authToken} />
        </div>
      ) : (
        <Link href="/login">
          <Button
            className="hidden border border-black bg-[#F5478E] px-4 transition duration-300 hover:bg-[#d43977] md:flex"
            style={{ boxShadow: "3px 2px 0 0 white" }}
          >
            <span className="text-lg font-semibold">Login</span>
          </Button>
        </Link>
      )}
      <div className="md:hidden">
        <MobileNav navLinks={navLinks} authToken={authToken} />
      </div>
    </>
  );
};

export default UserAvatar;
