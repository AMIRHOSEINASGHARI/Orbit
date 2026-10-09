import type { ReactNode } from "react";
import { useId } from "react";
import { TriangleAlertIcon } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ErrorState({ title = "Something went wrong", description = "Please try again.", action }: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  const id = useId();

  return (
    <Alert
      variant="destructive"
      role="alert"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      className="items-start border-destructive/30 bg-card px-6 py-6"
    >
      <TriangleAlertIcon aria-hidden="true" className="size-5" />
      <div className="min-w-0 space-y-2">
        <AlertTitle id={`${id}-title`} className="text-base font-semibold text-foreground">
          {title}
        </AlertTitle>
        <AlertDescription id={`${id}-description`}>
          {description}
        </AlertDescription>
        {action && <div className="pt-2">{action}</div>}
      </div>
    </Alert>
  );
}
