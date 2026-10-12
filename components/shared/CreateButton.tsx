"use client";

import { PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function CreateButton({
  item,
  onClick,
}: {
  item: string;
  onClick: () => void;
}) {
  return (
    <Button
      className="py-4.5 px-4"
      onClick={onClick}
      aria-label={`Create ${item.toLowerCase()}`}
    >
      <PlusIcon aria-hidden="true" />
      <span className="text-[13px]">Create {item}</span>
    </Button>
  );
}
