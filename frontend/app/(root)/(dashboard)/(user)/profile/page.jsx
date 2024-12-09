"use client";

import UpdateProfileForm from "@/components/dashboard/update-profile-form";
import { WelcomeCard } from "@/components/dashboard/welcome-card";

const ProfilePage = () => {
  return (
    <div className="w-full px-6 md:px-12 lg:px-16">
      <div className="mt-4 flex w-full flex-col gap-8 sm:flex-row">
        <div className="hidden sm:mt-12 lg:inline">
          <WelcomeCard />
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-[#0F172A]">My Profile</h3>
            <UpdateProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
