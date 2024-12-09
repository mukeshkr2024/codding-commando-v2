import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export const QuestionActions = ({
  isPublished,
  disabled,
  onClick,
  isLoading,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={isLoading || disabled}
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
