import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

type NotificationProps = {
  children: React.ReactNode;
  duration?: number; // in ms
  onClose?: () => void;
  className?: string;
};

export function Notify({
  children,
  duration = 3000,
  onClose,
  className = "",
}: NotificationProps) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      setOpen(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div
      className={`relative mb-4 p-3 bg-green-100 border border-green-400 text-red-800 rounded flex items-center ${className}`}
      role="alert"
    >
      <div className="flex-1">{children}</div>
      <button
        className="ml-4 p-1 rounded hover:bg-green-200 transition"
        onClick={() => {
          setOpen(false);
          onClose?.();
        }}
        aria-label="Close notification"
        type="button"
      >
        <IoClose size={20} />
      </button>
    </div>
  );
}
