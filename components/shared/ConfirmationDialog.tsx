"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void | Promise<void>;
};

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
}: ConfirmationDialogProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  async function confirm() {
    setPending(true);
    setError(false);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!pending) {
          setError(false);
          onOpenChange(nextOpen);
        }
      }}
    >
      <AlertDialogContent aria-busy={pending} className="shadow-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-ui-small">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            The action failed. Please try again.
          </p>
        )}
        <p role="status" aria-live="polite" className="sr-only">
          {pending ? "Working..." : ""}
        </p>
        <AlertDialogFooter className="mx-0 mb-0 justify-between border-0 bg-transparent p-0">
          <AlertDialogCancel disabled={pending} aria-label="Cancel">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={pending}
            aria-label={pending ? "Working" : confirmLabel}
            onClick={confirm}
          >
            {pending ? "Working..." : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
