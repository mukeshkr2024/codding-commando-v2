import apiClient from "lib/api-client";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/confirm-modal";
import { ErrorToast } from "@/components/error-toast";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

export const StudentActions = ({ studentId, isBlocked }) => {
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

      if (isBlocked) {
        await apiClient.patch(
          `/users/students/${studentId}/unblock`,
          {},
          config,
        );
        toast.success("User Unblocked ");
        window.location.reload();
      } else {
        await apiClient.patch(`/users/students/${studentId}/block`, {}, config);
        toast.success("User Blocked ");
        toast(
          "This student has been blocked; as a result, they are unable to access the dashboard or course materials.",
          {
            duration: 6000,
          },
        );
      }
      window.location.reload();
    } catch (error) {
      ErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <ConfirmModal
        onConfirm={onClick}
        description={`You are about to ${
          isBlocked ? "unblock" : "block"
        } this user. This action ${
          isBlocked ? "enables" : "restricts"
        } access to the dashboard and course materials.`}
      >
        <Button
          disabled={isLoading}
          variant={isBlocked ? "default" : "destructive"}
          size="sm"
        >
          {isBlocked ? "Unblock User" : "Block User"}
        </Button>
      </ConfirmModal>
    </div>
  );
};
