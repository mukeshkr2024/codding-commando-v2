"use client";

import { ErrorToast } from "@/components/error-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VerificationBox } from "@/components/verification-box/Verification-box";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "lib/api-client";
import { ArrowRight, CreditCard, Loader2 } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const formschema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone is required" })
    .max(10, { message: "Invalid phone number" }),
  email: z
    .string()
    .email({ message: "Email is required" })
    .min(2, { message: "Email is required" }),
});

const CoursePaymentPage = ({ params, searchParams }) => {
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [token, setToken] = useState(null);

  let paymentMethod = searchParams?.method;

  if (!["fullPrice", "installment"].includes(paymentMethod)) {
    paymentMethod = "fullPrice";
  }

  const price =
    paymentMethod === "fullPrice"
      ? courseData?.paymentDetail?.fullPrice
      : courseData?.paymentDetail?.installmentPrice;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(formschema),
  });

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const { data } = await apiClient.get(
          `/payment/course/${params?.courseId}`
        );
        setCourseData(data?.course);
      } catch (error) {
        ErrorToast(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetail();
  }, [params?.courseId]);

  const submitHandler = async (data) => {
    const requestData = {
      ...data,
      paymentMethod,
    };

    try {
      const { data } = await apiClient.post(
        `/payment/order-request`,
        requestData
      );
      setShowOtpBox(true);
      setToken(data?.token);
    } catch (error) {
      ErrorToast(error);
    }
  };

  const toggleOtpBox = () => {
    setShowOtpBox(!showOtpBox);
  };

  if (isLoading) {
    return (
      <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md">
        <Loader2 className="h-16 w-16 animate-spin text-[#10001ce5]" />
      </div>
    );
  }

  return (
    <>
      <div
        className={`relative h-full w-full bg-gray-200  md:py-4 ${
          inter.className
        } ${showOtpBox ? "blur-sm" : ""}`}
      >
        <div className="m-auto max-w-5xl ">
          <div className="rounded-md bg-dark-purple p-4">
            <Image
              alt="Coding commando"
              src="/assets/icons/logo.svg"
              height={150}
              width={180}
            />
          </div>
          <form
            className="w-full rounded-md bg-white p-6"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="mb-4 flex w-full flex-col gap-4">
              <h2 className="text-xl font-semibold">
                Please Enter your details
              </h2>
              <div>
                <Input
                  placeholder="Email Address*"
                  {...register("email")}
                  className="focus-visible:ring-1"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Phone Number*"
                  {...register("phone")}
                  className="focus-visible:ring-1"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <h1 className="text-xl font-semibold">Batch Description</h1>
              <Image
                src={courseData?.banner}
                alt="Course banner"
                width={1200}
                height={800}
                className="md:p-2"
              />
              <div className="mt-6 flex w-full flex-col gap-1">
                <h2 className="text-xl font-medium">{courseData?.title}</h2>
                <div className="mt-2 flex w-full flex-col px-2">
                  <div className="flex w-full justify-between border-b py-2">
                    <p className="text-lg font-semibold">Price</p>
                    <span> ₹{price}</span>
                  </div>
                  <div className="flex w-full justify-between py-2 ">
                    <p className="text-lg font-semibold text-green-600">
                      Total
                    </p>
                    <span className="text-lg font-semibold text-green-600">
                      ₹{price}
                    </span>{" "}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2 ">
                <h1 className="text-xl font-bold">Your Payment Information</h1>
                {paymentMethod && (
                  <div className="my-2  flex w-36 items-center justify-center gap-2 rounded-md border border-blue-400 bg-blue-50 py-2.5 text-black">
                    <CreditCard size={24} />{" "}
                    <p className="font-semibold">{paymentMethod}</p>
                  </div>
                )}
                <p className="text-sm">
                  By clicking Complete Order, you agree to the{" "}
                  <Link href="/terms" className="text-blue-600" target="_blank">
                    Terms & Condition{" "}
                  </Link>
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
              <Button
                className="mt-5 bg-blue-500 py-6 text-lg font-bold text-white hover:bg-blue-400"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                Complete Order <ArrowRight />
              </Button>
            </div>
          </form>
        </div>
      </div>
      {showOtpBox && (
        <VerificationBox
          toggleOtpBox={toggleOtpBox}
          token={token}
          courseId={params?.courseId}
          method={paymentMethod}
        />
      )}
    </>
  );
};

export default CoursePaymentPage;
