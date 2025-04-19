import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  description = "This action cannot be undone.",
}) => {
  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(open) => !open && onCancel()}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <AlertDialog.Content
          className="confirm-dialog fixed z-50 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg space-y-4 w-[90%] max-w-md"
          data-testid="confirm-dialog"
        >
          <AlertDialog.Title className="text-lg font-semibold">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-gray-600">
            {description}
          </AlertDialog.Description>

          <div className="flex justify-end gap-4 mt-4">
            <AlertDialog.Cancel
              className="cancel-delete px-4 py-2 rounded border hover:bg-gray-100"
              onClick={onCancel}
              data-testid="cancel-delete"
            >
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action
              className="confirm-delete bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={onConfirm}
              data-testid="confirm-delete"
            >
              Delete
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ConfirmDialog;
