"use client";
import React from "react";
import { useRouter } from "next/navigation";
import apiClient from "lib/api-client";
import { ErrorToast } from "../error-toast";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

export const BuyProduct = ({ children, courseId, method }) => {
  const router = useRouter();
  const { authToken } = useUserAccessToken();

  const razorPayApiKeys = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;

  if (!razorPayApiKeys) {
    console.log("Razorpay api keys not defined");
  }

  const makePayment = async () => {
    if (!authToken) {
      router.push(`/purchase/${courseId}?method=${method}`);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const {
        data: { order, name, email, phone, price },
      } = await apiClient.post(
        `/courses/${courseId}/payment/create-order`,
        { method },
        config,
      );

      const options = {
        key: razorPayApiKeys,
        name: order?.notes?.paymentFor || "Enrolling a course",
        currency: order.currency,
        amount: order.amount,
        order_id: order.id,
        description: order?.notes?.description || "Buying a course",
        image: order?.notes?.imageUrl || " ",
        prefill: {
          name,
          email,
          contact: phone,
        },
        handler: async function (response) {
          const responseData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            amount: price,
            method,
          };

          // Verify the payment on the server
          const { data } = await apiClient.post(
            `/courses/${courseId}/payment/verify`,
            responseData,
            config,
          );

          if (data.success === true) {
            router.push(
              `/paymentsuccess?paymentid=${response.razorpay_payment_id}&orderid=${response.razorpay_order_id}`,
            );
          }
        },
      };

      // Create a payment object and open the payment modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      // Handle payment failure
      paymentObject.on("payment.failed", function (response) {
        alert("Payment failed. Please try again. Contact support for help");
      });
    } catch (error) {
      ErrorToast(error);
    }
  };

  return (
    <div
      onClick={makePayment} // TODO: later implement
    >
      {children}
    </div>
  );
};
