"use client";

import { cn } from "lib/utils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useUserRegistration } from "features/users/api/use-user-registration";
import { useUserRegistered } from "features/users/hooks/use-user-registered";
import toast from "react-hot-toast";
import apiClient from "lib/api-client";
import { ErrorToast } from "../error-toast";

const formSchema = z.object({
  pin: z.string().length(4, {
    message: "Invalid OTP",
  }),
});

export function OtpVerificationBox() {
  const [isResendClicked, setResendClicked] = useState(false);
  const [timer, setTimer] = useState(60);

  const registerMutation = useUserRegistration();
  const { registered } = useUserRegistered();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data) => {
    const registerData = {
      activationCode: data?.pin,
      activationToken: registered?.token,
    };
    try {
      await apiClient.post("/users/activate", registerData);
      toast.success("Registered successfully");
      window.location.href = "/login";
    } catch (error) {
      ErrorToast(error);
    }
  };

  const { isValid, isSubmitting } = form.formState;

  const handleResend = () => {
    form.reset();
    setResendClicked(true);
    registerMutation.mutate(registered?.user);
    toast.success("OTP Resent");
  };

  useEffect(() => {
    let interval;
    if (isResendClicked) {
      setTimer(60);
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setResendClicked(false);
          }
          return prevTimer > 0 ? prevTimer - 1 : prevTimer;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isResendClicked]);

  return (
    <div className="absolute flex h-full w-full flex-col items-center">
      <div
        className="mt-24 flex max-w-sm flex-col justify-center gap-4 rounded-3xl px-4 py-10 text-center"
        style={{
          border: "1px solid #000",
          background:
            "linear-gradient(267deg, rgba(255, 255, 255, 0.13) -2.1%, rgba(255, 255, 255, 0.00) 121.83%)",
          backdropFilter: "blur(8.550000190734863px)",
        }}
      >
        <h2 className="text-3xl font-semibold">Verify Your Account</h2>
        <p>
          We have sent an activation code to your given email or phone. Please
          enter the verification code to create an account.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center justify-center gap-y-4"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup className="flex gap-x-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className={cn(
                              "h-16 w-16 rounded-lg border-2 bg-white text-center text-5xl font-semibold text-slate-700 outline-none focus:border-pink-700",
                              !isValid ? "border-red-500" : "border-pink-500",
                            )}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-2 h-12 w-[60%] rounded-3xl bg-pink-500 text-xl font-semibold text-white transition duration-300 ease-in-out hover:bg-pink-600"
              disabled={!isValid || isSubmitting}
            >
              Verify
            </Button>

            <div>
              <p>If you didn&apos;t receive a code!!</p>
              {isResendClicked ? (
                <p>{`Resend in ${timer}s`}</p>
              ) : (
                <p
                  className="cursor-pointer"
                  onClick={handleResend}
                  style={{
                    textDecoration: isResendClicked ? "none" : "underline",
                  }}
                >
                  RESEND
                </p>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
