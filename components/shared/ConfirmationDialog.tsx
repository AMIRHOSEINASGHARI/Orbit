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

export function ConfirmationDialog({ open, onOpenChange, title, description, confirmLabel = "Confirm", onConfirm }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void | Promise<void>;
}) {
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
    <AlertDialog open={open} onOpenChange={(nextOpen) => {
      if (!pending) {
        setError(false);
        onOpenChange(nextOpen);
      }
    }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {error && <p role="alert" className="text-sm text-destructive">The action failed. Please try again.</p>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending} aria-label="Cancel">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" disabled={pending} aria-label={confirmLabel} onClick={confirm}>
            {pending ? "Working..." : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
