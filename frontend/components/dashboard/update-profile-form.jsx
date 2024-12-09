"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "lib/api-client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { ErrorToast } from "../error-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import VerifyPasswordModal from "./verify-password";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import { useUserInfo } from "features/users/hooks/use-user-Info";
import { useUpdateUser } from "features/users/api/use-update-user";
import { useQueryClient } from "@tanstack/react-query";

const formschema = z.object({
  firstName: z.string().min(1, "firstName is required"),
  lastName: z.string().min(1, "lastName is required"),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, "Invalid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
});

export default function UpdateProfileForm() {
  const { user } = useUserInfo();
  const fileInputRef = useRef(null);
  const { authToken } = useUserAccessToken();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [pendingProfileData, setPendingProfileData] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(user?.avatar);
  const queryClient = useQueryClient();

  const updateUserMutation = useUpdateUser();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const form = useForm({
    resolver: zodResolver(formschema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      });
      setImagePreviewUrl(user.avatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleUpdate = async (values) => {
    updateUserMutation.mutate(values);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("image", file);

        const { data } = await apiClient.post("/upload", formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        handleUpdate({ avatar: data?.imageUrl });
      } catch (error) {
        ErrorToast(error);
      }
    } else {
      toast.error("Please select an image");
    }
  };

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await apiClient.delete("users/profile-pic", config);
      setImagePreviewUrl(null);
      queryClient.invalidateQueries({
        queryKey: ["userInfo"],
      });
      toast.success("Profile pic deleted");
    } catch (error) {
      ErrorToast(error);
    }
  };

  const onSubmit = (values) => {
    setPendingProfileData(values);
    setIsPasswordDialogOpen(true);
  };

  const onSubmitPassword = () => {
    handleUpdate(pendingProfileData);
    queryClient.invalidateQueries({
      queryKey: ["userInfo"],
    });
    setIsPasswordDialogOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!/^\d*$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
  };
  return (
    <>
      {isPasswordDialogOpen && (
        <VerifyPasswordModal
          onCancel={() => setIsPasswordDialogOpen(false)}
          onSubmitPassword={onSubmitPassword}
        />
      )}
      <div className="mt-2 w-full max-w-2xl rounded-[10px] border p-4 sm:p-6 lg:p-8">
        <div className="space-y-3">
          <div className="flex items-center gap-10">
            <Avatar className="h-[80px] w-[80px] border-2 border-black md:h-[110px] md:w-[110px]">
              <AvatarImage src={imagePreviewUrl} className="object-cover" />
              <AvatarFallback>
                {user?.firstName?.trim().charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold text-gray-600 sm:text-base">
                Profile Picture
              </h2>
              <div className="flex gap-2.5 sm:gap-4">
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  className="bg-blue-500 text-xs sm:text-sm"
                  onClick={handleButtonClick}
                >
                  Upload
                </Button>
                <Button
                  variant="secondary"
                  className="border-2 border-red-300 text-xs text-red-300 sm:text-sm"
                  onClick={handleDelete}
                  disabled={!user?.avatar}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-1">
                <div className="flex flex-col gap-4 md:flex-row">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm font-semibold text-gray-600">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm font-semibold text-gray-600">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-600">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-600">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input {...field} onKeyDown={handleKeyDown} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-600">
                        Password{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="********"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full justify-start">
                <Button
                  type="submit"
                  className="mt-5 px-8"
                  disabled={form.formState.isSubmitting}
                >
                  <p className="text-base">Save Changes</p>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
