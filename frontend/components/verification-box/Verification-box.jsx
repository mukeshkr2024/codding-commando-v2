import React, { useState } from "react";
import OtpInput from "./otp-input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { ErrorToast } from "../error-toast";
import apiClient from "lib/api-client";
import { useRouter } from "next/navigation";

export const VerificationBox = ({ toggleOtpBox, token, courseId, method }) => {
  const [otp, setOtp] = useState("");
  const otpLength = 4;
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);

  const onOtpSubmit = async () => {
    const orderData = {
      activationCode: otp,
      activationToken: token,
      courseId,
      method,
    };

    // const razorpayKey = "rzp_test_SsZQw7VSzw5bCq"; // for test
    const razorpayKey = "rzp_live_7GoHndZWogG4iX"; // for live

    try {
      setIsloading(true);
      const { data } = await apiClient.post(
        `/payment/create-order/${courseId}`,
        orderData
      );
      toggleOtpBox();

      const options = {
        key: razorpayKey,
        name: data?.order?.notes?.paymentFor || "Enrolling a course",
        currency: data?.order.currency,
        amount: data?.order.amount,
        order_id: data?.order.id,
        description: data?.order?.notes?.description || "Buying a course",
        image: data?.order?.notes?.imageUrl || " ",
        prefill: {
          name: data?.name,
          email: data?.email,
          contact: data?.phone,
        },
        handler: async function (response) {
          const responseData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            amount: data?.price,
            method,
            userId: data?.userId,
          };

          try {
            const verifyResponse = await apiClient.post(
              `/payment/${courseId}/verify`,
              responseData
            );

            if (verifyResponse?.data?.success === true) {
              router.push(
                `/paymentsuccess?paymentid=${response.razorpay_payment_id}&orderid=${response.razorpay_order_id}&accessToken=${verifyResponse?.data?.accessToken}`
              );
            }
          } catch (error) {
            ErrorToast(error);
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        alert("Payment failed. Please try again. Contact support for help");
      });
    } catch (error) {
      ErrorToast(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50">
      <div className="relative mx-2 flex max-w-md flex-col rounded-md bg-white p-6 shadow-lg md:p-10">
        <X
          className="absolute right-3 top-3 cursor-pointer hover:ring-2"
          onClick={toggleOtpBox}
        />
        <p className="mb-4 text-center text-gray-700">
          Enter the OTP sent to your email address or phone number.
        </p>
        <OtpInput
          length={otpLength}
          onOtpChange={setOtp}
          className="mx-auto h-14 w-14 text-center text-2xl font-medium focus-visible:ring-1"
        />
        <Button
          onClick={onOtpSubmit}
          disabled={otp?.length !== otpLength || isloading}
          className="mt-6 w-full bg-blue-500 py-3 text-lg font-semibold text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring md:mt-8 md:py-6"
        >
          Verify
        </Button>
      </div>
    </div>
  );
};
