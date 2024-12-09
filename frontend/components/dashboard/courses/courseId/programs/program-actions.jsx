"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export const ProgramActions = ({
  disabled,
  courseId,
  programId,
  isPublished,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useUserAccessToken();

  const onClick = async () => {
    try {
      setIsLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const endpoint = isPublished
        ? `/courses/${courseId}/program/${programId}/unpublish`
        : `/courses/${courseId}/program/${programId}/publish`;

      await apiClient.patch(endpoint, {}, config);

      toast.success(`Program ${isPublished ? "un" : ""}published`);
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      await apiClient.delete(
        `/courses/${courseId}/program/${programId}`,
        config,
      );

      toast.success("Program deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
