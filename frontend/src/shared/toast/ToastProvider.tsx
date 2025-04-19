import React from "react";
import { Toaster } from "sonner";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        classNames: {
          toast: "rounded px-4 py-2 shadow-lg",
          success: "toast-success",
          error: "toast-error",
          warning: "toast-warning",
        },
      }}
      expand={true}
      data-testid="toast-container"
    />
  );
};

export default ToastProvider;
