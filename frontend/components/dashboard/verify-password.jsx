import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "lib/api-client";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ErrorToast } from "../error-toast";
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
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const formSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export default function VerifyPasswordModal({ onCancel, onSubmitPassword }) {
  const { authToken } = useUserAccessToken();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await apiClient.post(
        `/users/verfiy-password`,
        values,
        config,
      );

      if (data.success) {
        onSubmitPassword();
      }
    } catch (error) {
      ErrorToast(error);
    }
  };

  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mt-10 min-w-[350px] max-w-sm rounded-[13px] bg-white sm:max-w-md md:max-w-lg">
        <div className="flex h-12 w-full items-center justify-end px-4">
          <X className="h-5 w-5 cursor-pointer" onClick={onCancel} />
        </div>
        <div className="px-4 sm:px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-600">
                        Confirm your Password
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full justify-end">
                <Button
                  type="submit"
                  className="mb-2 mt-5 px-8 text-base sm:mb-6"
                  disabled={form.formState.isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
