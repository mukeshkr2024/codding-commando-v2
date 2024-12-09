"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CgProfile } from "react-icons/cg";
import { MdLockOutline } from "react-icons/md";
import * as z from "zod";
import { LoginInput } from "./login-input";
import { useEffect, useState } from "react";
import PasswordResetForm from "./password-reset-form";
import Image from "next/image";
import { useUserLoginAccount } from "features/users/api/use-user-loginAccount";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const loginSchema = z.object({
  email: z.string().email({ message: "Enter a Valid Email!" }),
  password: z.string().min(6, { message: "Enter a Valid Password" }),
});

export const LoginForm = () => {
  const [isResetOpen, setIsResetOpen] = useState(false);

  const loginMutation = useUserLoginAccount();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
    reset();
  };

  const { authToken } = useUserAccessToken();

  useEffect(() => {
    if (authToken !== null) {
      window.location.href = "/dashboard";
    }
  }, [authToken]);

  return (
    <>
      {isResetOpen ? (
        <PasswordResetForm handClose={() => setIsResetOpen(false)} />
      ) : (
        <div className="absolute flex h-full w-full flex-col items-center justify-center gap-8">
          <Image
            src="/assets/font-shadow/loginsvg.svg"
            alt="Login"
            height={100}
            width={180}
          />
          <div
            className="w-[85%] overflow-hidden rounded-3xl px-6 py-12 sm:w-[400px] sm:p-12 lg:w-[450px]"
            style={{
              border: "1px solid #000",
              background:
                "linear-gradient(267deg, rgba(255, 255, 255, 0.13) -2.1%, rgba(255, 255, 255, 0.00) 121.83%)",
              backdropFilter: "blur(8.550000190734863px)",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center border-b">
                    <CgProfile className="mb-4" />
                    <LoginInput
                      label="Email"
                      placeholder="Email"
                      register={register("email")}
                      type="text"
                      error={errors.email}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center border-b">
                    <MdLockOutline className="mb-4" />
                    <LoginInput
                      label="Password"
                      placeholder="Password"
                      register={register("password")}
                      type="password"
                      error={errors.password}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                  <button
                    className="rounded-3xl bg-bg_pink px-10 py-2 font-bold text-white transition-transform hover:scale-105 focus:border-blue-300 focus:shadow-none focus:outline-none focus:ring xl:px-12"
                    type="submit"
                    style={{ boxShadow: "1.5px 1.5px white" }}
                    disabled={isLoading}
                  >
                    Submit
                  </button>

                  <div className="flex w-full max-w-[18rem] items-center justify-between gap-1">
                    <div className="cursor-pointer font-medium text-red-500">
                      <p
                        className="text-[14px] sm:text-[15px]"
                        onClick={() => setIsResetOpen(true)}
                      >
                        Forgot Password
                      </p>
                    </div>

                    <Link href="/signup">
                      <p className="text-[14px] font-medium text-red-500 sm:text-[15px]">
                        New Here? SignUp
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
