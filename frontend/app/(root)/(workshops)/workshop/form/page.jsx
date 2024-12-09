"use client";

import { Input } from "@/components/ui/input";
import apiClient from "lib/api-client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorToast } from "@/components/error-toast";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "react-hot-toast";

const registerSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name is required",
  }),
  lastName: z.string().min(2, {
    message: "Last name is required",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Invalid phone number",
    })
    .regex(/^\d+$/, {
      message: "Invalid phone number",
    }),
  profession: z.string().min(2, {
    message: "Profession is required",
  }),
});

export default function WorkshopForm() {
  const workshop = "salesforce";

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateOrder = async (values) => {
    try {
      const {
        data: { order, name, email, phone, price },
      } = await apiClient.post(`/workshop/${workshop}/create-order`, values);

      const options = {
        key: "rzp_live_7GoHndZWogG4iX",
        name: order?.notes?.paymentFor || workshop,
        currency: order.currency,
        amount: order.amount,
        order_id: order.id,
        prefill: { name, email, contact: phone },
        handler: async function (response) {
          const responseData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            amount: price,
            name,
            email,
            phone,
          };

          try {
            const { data } = await apiClient.post(
              `/workshop/${workshop}/verify-order`,
              responseData
            );

            if (data.success) {
              router.push(`/workshop/thank-you`);
            }
          } catch (error) {
            ErrorToast(error);
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function () {
        alert("Payment failed. Please try again. Contact support for help");
      });
    } catch (error) {
      ErrorToast("Order processing failed. Please try again.");
    }
  };

  const onSubmit = async (registerData) => {
    setIsLoading(true);
    try {
      const { data } = await apiClient.post("/workshop/register", {
        workshop,
        ...registerData,
      });
      handleCreateOrder(data?.data);
    } catch (error) {
      ErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-200">
      <div className="w-full max-w-2xl rounded-md bg-white p-8 py-6 shadow-lg md:p-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-3xl font-bold">
            Register for 3-Day Career Mapping Workshop
          </h1>
          {/* <p className="text-center">3-Day Career Mapping Workshop </p> */}
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8 h-full w-full md:flex md:justify-between md:gap-4">
            <div className="flex h-full w-full flex-col gap-2">
              <Label className="text-base text-slate-800">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input {...register("firstName")} />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex h-full w-full flex-col gap-2">
              <Label className="text-base text-slate-800">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input {...register("lastName")} />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex h-full w-full flex-col gap-2">
            <Label className="text-base text-slate-800">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex h-full w-full flex-col gap-2">
            <Label className="text-base text-slate-800">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input {...register("phone")} />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="flex h-full w-full flex-col gap-2">
            <Label className="text-base text-slate-800">
              Profession <span className="text-red-500">*</span>
            </Label>
            <Input {...register("profession")} />
            {errors.profession && (
              <p className="text-sm text-red-500">
                {errors.profession.message}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              className={`mt-6 flex items-center justify-center rounded-md bg-blue-500 px-6 py-3 text-lg text-white ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isLoading || isSubmitting}
              style={{ width: "150px", height: "40px" }}
            >
              {isLoading ? (
                <LoaderIcon className="mr-2 animate-spin text-white" />
              ) : null}
              <span className={isLoading ? "hidden" : ""}>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
