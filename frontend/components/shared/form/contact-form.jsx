"use client";

import { Wahooo } from "@/components/Wahooo";
import { ErrorToast } from "@/components/error-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "lib/api-client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { FormTextarea } from "./TextArea";
import { FormInput } from "./form-input";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First Name is required" }),
  lastName: z.string().min(2, { message: "Last Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  phone: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Invalid Phone Number",
  }),
  message: z.string(),
});

export const ContactForm = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (contactData) => {
    try {
      await apiClient.post("/send/message", {
        ...contactData,
        type: "Contact",
      });
      setSuccess(true);
      toast.success("Message sent");
      reset();
    } catch (error) {
      ErrorToast(error);
    }
  };

  return (
    <>
      {success ? (
        <div className="h-full w-full">
          <Wahooo
            setSuccess={setSuccess}
            title="Thank You for Reaching Out!"
            description=" We've received your message and will get back to you shortly. Your inquiry is important to us."
          />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-2 pb-14 xl:pb-28">
          <Image
            src="/assets/font-shadow/get-touch.svg"
            alt="Get Us Touch"
            height={100}
            width={200}
            className="w-[65%] py-6 sm:w-[60%] md:w-[50%] xl:w-[45%] xl:py-14"
          />
          <div
            className="w-full max-w-md rounded-[27px] border border-[#000] bg-transparent backdrop-blur-3xl sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl "
            style={{
              border: "1px solid #000",
              background:
                "linear-gradient(267deg, rgba(255, 255, 255, 0.13) -2.1%, rgba(255, 255, 255, 0.00) 121.83%)",
              backdropFilter: "blur(8.550000190734863px)",
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full rounded px-8 pb-8 pt-6 shadow-md xl:p-10"
            >
              <h1 className="mb-4 py-2 text-2xl font-bold text-white xl:text-4xl">
                Send Us A Message
              </h1>
              <div className="flex w-full flex-col lg:flex-row lg:gap-12">
                <div className="w-full lg:w-1/2">
                  <FormInput
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    register={register("firstName")}
                    error={errors.firstName}
                  />
                  <FormInput
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    register={register("lastName")}
                    error={errors.lastName}
                  />
                  <FormInput
                    type="email"
                    label="Email"
                    placeholder="Email"
                    register={register("email")}
                    error={errors.email}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <FormInput
                    label="Phone No"
                    type="text"
                    pattern="[0-9]{10}"
                    placeholder="Phone No"
                    register={register("phone")}
                    error={errors.phone}
                  />
                  <FormTextarea
                    label="Message"
                    placeholder="Message"
                    register={register("message")}
                    error={errors.message}
                  />
                  <div className="flex justify-end">
                    <button
                      disabled={isSubmitting}
                      className="rounded-3xl bg-bg_pink px-10 py-2 font-bold text-white transition-transform hover:scale-105 focus:border-blue-300 focus:shadow-none focus:outline-none focus:ring xl:px-12"
                      type="submit"
                      style={{ boxShadow: "1.5px 1.5px white" }}
                    >
                      Submit
                    </button>
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
