import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import Icon from "../icon/Icon";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  classNameWrapper?: string;
  btnClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  className,
  classNameWrapper,
  btnClassName,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("keydown", handleEscape);
    } else {
      const openModals = document.querySelectorAll(".modal-instance").length;
      if (openModals === 0) {
        document.body.classList.remove("overflow-hidden");
      }
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      const openModals = document.querySelectorAll(".modal-instance").length;
      if (openModals === 0) {
        document.body.classList.remove("overflow-hidden");
      }
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 flex items-center justify-center z-50 modal-instance",
        !isMobile && "bg-black/50"
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          "relative bg-white rounded-xl shadow-lg w-full max-w-md",
          isMobile ? "h-screen max-h-screen" : "max-h-[100vh]",
          classNameWrapper
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={clsx(
            "p-6 overflow-y-auto h-full max-h-full relative",
            className
          )}
        >
          <button
            aria-label="Close modal"
            className={clsx(
              "absolute hover:cursor-pointer transition-all duration-200 ease-in-out",
              "text-gray-600 hover:text-red-500 active:scale-90",
              btnClassName || "top-4 right-4"
            )}
            onClick={onClose}
          >
            <Icon id="close" className="w-6 h-6 stroke-current text-current" />
          </button>

          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
