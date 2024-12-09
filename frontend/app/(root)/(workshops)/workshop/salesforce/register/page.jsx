"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// eslint-disable-next-line camelcase
import { Hanken_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ErrorToast } from "@/components/error-toast";
import { useRouter } from "next/navigation";
import apiClient from "lib/api-client";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Full Name must be at least 2 characters.",
    })
    .max(30, { message: "Full Name must be at least 30 characters." }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Inavalid phone number" })
    .max(12, { message: "Invalid phone number" }),
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "600", "700", "800", "900"],
});

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const workshop = "salesforce";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const router = useRouter();

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
    <div
      className={`flex h-screen w-full items-center justify-center ${hanken.className}`}
    >
      <div className="max-w-sm overflow-hidden rounded-md border border-slate-400 shadow-xl sm:shadow-lg">
        <div className="w-full flex-col bg-[#050208] px-6">
          <div className="flex w-full items-center justify-center py-6 ">
            <Image
              src="/assets/icons/logo.svg"
              alt="Coding Commando"
              height={100}
              width={160}
              className=""
            />
          </div>
          <h3 className="text-xl text-white">3-Day Career Mapping Workshop</h3>
          <div className="mt-3 pb-4 text-2xl font-semibold text-white">
            <span>₹99</span> <span className="line-through">₹999</span>
          </div>
        </div>

        <div className="min-w-[350px] px-6 py-8 sm:min-w-[380px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-6 "
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Email Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Mobile Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Phone No" {...field} />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <Button
                type="submit "
                className="py-6 text-lg font-semibold"
                disabled={isLoading}
              >
                Submit
              </Button>
              <p className="text-xs">
                By proceeding you agree to our{" "}
                <Link href="/terms" className="underline">
                  Terms{" "}
                </Link>
                ,
                <Link href="/privacy" className="underline">
                  Privacy{" "}
                </Link>{" "}
                &{" "}
                <Link href="/refund-policy" className="underline">
                  Refund Policy
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
