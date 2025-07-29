import { toast as sonnerToast } from "sonner";

type ToastVariant = "default" | "destructive";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

// Define the type signature for Sonner's toast methods
type SonnerToastMethod = (
  message: string,
  options?: {
    description?: string;
    duration?: number;
  }
) => void;

export function toast({
  title,
  description,
  variant = "default",
  duration = 3000,
}: ToastProps) {
  const notify: SonnerToastMethod =
    sonnerToast[variant === "destructive" ? "error" : "message"];

  notify(title ?? "", {
    description,
    duration,
  });
}
