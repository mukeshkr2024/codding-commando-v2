"use client";

import apiClient from "lib/api-client";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/confirm-modal";
import { useConfettiStore } from "hooks/use-confetti-store";
import { ErrorToast } from "@/components/error-toast";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

export const Actions = ({ disabled, mentorId, isPublished }) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useUserAccessToken();
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await apiClient.patch(`/mentors/${mentorId}/unpublish`, {}, config);
        toast.success("Member unpublished");
        router.push("/teacher/mentors");
      } else {
        await apiClient.patch(`/mentors/${mentorId}/publish`, {}, config);
        toast.success("Member published");
        confetti.onOpen();
        router.push("/teacher/mentors");
      }
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await apiClient.delete(`/mentors/${mentorId}`, config);

      toast.success("Member deleted");
      router.refresh();
      router.push(`/teacher/mentors`);
    } catch (error) {
      ErrorToast(error);
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
