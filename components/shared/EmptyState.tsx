import type { ReactNode } from "react";
import { useId } from "react";
import { InfoIcon } from "@/components/icons";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";

export function EmptyState({ title, description, action, icon }: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  const id = useId();

  return (
    <Empty
      className="flex-none rounded-lg border border-dashed border-border bg-card px-6 py-12"
      role="region"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
    >
      <EmptyHeader>
        <EmptyMedia variant="icon" aria-hidden="true">
          {icon ?? <InfoIcon className="size-4" />}
        </EmptyMedia>
        <h2 id={`${id}-title`} className="text-lg font-semibold text-foreground">
          {title}
        </h2>
        <p id={`${id}-description`} className="max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      </EmptyHeader>
      {action && <EmptyContent className="mt-2">{action}</EmptyContent>}
    </Empty>
  );
}
