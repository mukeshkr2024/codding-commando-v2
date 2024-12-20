import { ErrorToast } from "@/components/error-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import React from "react";
import toast from "react-hot-toast";

export const CourseType = ({ isPaid, courseId, onSuccess }) => {
  const { authToken } = useUserAccessToken();

  const handleChange = async (newType) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await apiClient.patch(
        `/courses/update/${courseId}`,
        {
          isPaid: newType,
        },
        config,
      );
      toast.success("Course updated");
      onSuccess();
    } catch (error) {
      ErrorToast(error);
    }
  };

  console.log(isPaid);
  return (
    <div className="mt-6 flex w-full items-center justify-between rounded-md bg-slate-100 p-4">
      <div>
        <label className="font-medium">Course Type</label>
        <p className="text-sm text-slate-500">
          This course is {isPaid ? "Paid" : "Free"}
        </p>
      </div>
      <div>
        <Select defaultValue={String(isPaid)} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select course type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="false">Free</SelectItem>
              <SelectItem value="true">Paid</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
