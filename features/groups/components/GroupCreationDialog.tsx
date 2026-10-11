"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createGroup } from "@/features/groups/actions/create-group.action";
import type { CreateGroupInput } from "@/features/groups/schemas/group.schema";
import { GroupFormDialog } from "./GroupFormDialog";

export function GroupCreationDialog({ open, onOpenChange }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>();
  const mutation = useMutation({
    mutationFn: (values: CreateGroupInput) => createGroup(values),
    onSuccess: (result) => {
      if (!result.success) {
        setError(result.error);
        return;
      }
      toast.success(result.data.message);
      onOpenChange(false);
      void queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => setError("Unable to create this group. Please try again."),
  });
  const resetMutation = mutation.reset;

  useEffect(() => {
    if (!open) return;
    setError(undefined);
    resetMutation();
  }, [open, resetMutation]);

  return (
    <GroupFormDialog
      open={open}
      onOpenChange={onOpenChange}
      isPending={mutation.isPending}
      error={error}
      onSubmit={(values) => mutation.mutate(values)}
    />
  );
}
