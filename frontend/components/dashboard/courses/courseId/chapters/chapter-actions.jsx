import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const ChapterActions = ({
  courseId,
  moduleId,
  isPublished,
  disabled,
  chapterId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useUserAccessToken();

  const router = useRouter();

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const onClick = async () => {
    try {
      if (isPublished) {
        await apiClient.patch(
          `/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}/update`,
          { isPublished: false },
          config,
        );
        toast.success("Chapter unpublished");
      } else {
        await apiClient.patch(
          `/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}/update`,
          { isPublished: true },
          config,
        );
        toast.success("Chapter published");
      }

      router.push(`/teacher/courses/${courseId}/modules/${moduleId}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await apiClient.delete(
        `/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}`,
        config,
      );

      toast.success("Chapter deleted");
      router.push(`/teacher/courses/${courseId}/modules/${moduleId}`);
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
