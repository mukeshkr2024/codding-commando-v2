import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginInput } from "./login-input";
import { CgProfile } from "react-icons/cg";
import apiClient from "lib/api-client";
import { ErrorToast } from "../error-toast";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid Email!" }),
});

export default function PasswordResetForm({ handClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values) => {
    try {
      apiClient.post("/users/reset-password", values);
      reset();
      toast.success("Reset Link sent to your mail");
      handClose();
    } catch (error) {
      ErrorToast(error);
    }
  };

  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center gap-8">
      <div
        className="w-[80%] overflow-hidden rounded-3xl p-12 sm:w-[400px] lg:w-[450px]"
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
                <p className="text-sm text-red-500">{errors.email.message}</p>
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

              <div>
                <div className="cursor-pointer font-medium text-red-500">
                  <p className="text-[15px]" onClick={handClose}>
                    Login with Password
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
