import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorToast } from "../error-toast";
import apiClient from "lib/api-client";
import { useRouter } from "next/navigation";

// Define validation schema using Zod
const formSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .nonempty({ message: "Email is required" }),
  phone: z.string().nonempty({ message: "Phone is required" }),
});

// DetailsDialogBox component
const DetailsDialogBox = ({ children, pathname }) => {
  const router = useRouter();

  // Form submission handler
  const onSubmit = async (values) => {
    try {
      const {
        data: { order, name, email, phone, price },
      } = await apiClient.post(pathname, values);

      const options = {
        key: "rzp_test_SsZQw7VSzw5bCq", // Test key, replace with live key in production
        name: order?.notes?.paymentFor || pathname,
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
              `${pathname}/verify-order`,
              responseData
            );
            if (data.success) {
              router.push(
                `/paymentsuccess?paymentid=${response.razorpay_payment_id}&orderid=${response.razorpay_order_id}&ordertype=workshop`
              );
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            ErrorToast("Payment verification failed. Please try again.");
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function () {
        alert("Payment failed. Please try again. Contact support for help");
      });
    } catch (error) {
      console.error("Error processing order:", error);
      ErrorToast("Order processing failed. Please try again.");
    }
  };

  // Form validation and submission handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex max-w-sm flex-col gap-4 md:max-w-md">
        <DialogTitle>Enter your details</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div>
              <Input id="name" placeholder="Name*" {...register("name")} />
              {errors?.name && (
                <p className="text-sm text-red-500">{errors?.name?.message}</p>
              )}
            </div>
            <div>
              <Input
                id="email"
                type="email"
                placeholder="Email*"
                {...register("email")}
              />
              {errors?.email && (
                <p className="text-sm text-red-500">{errors?.email?.message}</p>
              )}
            </div>
            <div>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone*"
                {...register("phone")}
              />
              {errors?.phone && (
                <p className="text-sm text-red-500">{errors?.phone?.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600"
            >
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialogBox;
