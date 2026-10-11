"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateGroup } from "@/features/groups/actions/update-group.action";
import type { CreateGroupInput } from "@/features/groups/schemas/group.schema";
import type { GroupListItem } from "@/features/groups/types/group.types";
import { GroupFormDialog } from "./GroupFormDialog";

export function GroupEditDialog({ group, open, onOpenChange }: {
  group: GroupListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const client = useQueryClient();
  const [error, setError] = useState<string>();
  const mutation = useMutation({
    mutationFn: (values: CreateGroupInput) => group ? updateGroup({ groupId: group.id, ...values }) : Promise.resolve({ success: false as const, error: "Group not found." }),
    onSuccess: (result) => {
      if (!result.success) return setError(result.error);
      toast.success(result.data.message);
      onOpenChange(false);
      void client.invalidateQueries({ queryKey: ["groups"] });
      if (group) void client.invalidateQueries({ queryKey: ["group", group.id] });
    },
    onError: () => setError("Unable to update this group. Please try again."),
  });
  useEffect(() => { if (open) { setError(undefined); mutation.reset(); } }, [open]);
  return <GroupFormDialog open={open} onOpenChange={onOpenChange} group={group} isPending={mutation.isPending} error={error} onSubmit={(values) => mutation.mutate(values)} />;
}
