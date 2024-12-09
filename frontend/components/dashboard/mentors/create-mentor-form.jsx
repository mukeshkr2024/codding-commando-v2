"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "lib/api-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name is Required",
  }),
});

export const CreateMentorForm = () => {
  const router = useRouter();
  const { authToken } = useUserAccessToken();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await apiClient.post("/mentors/create", values, config);
      router.push(`/teacher/mentors/${data?.mentor._id}`);
      toast.success(data?.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Internal server error";
      toast.error(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mentor</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="e.g Rohit Kumar"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                What will be the name of mentor your
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-x-2">
          <Link href="/dashboard">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
