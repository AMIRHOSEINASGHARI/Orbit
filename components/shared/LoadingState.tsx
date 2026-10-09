import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState({ label = "Loading content" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="space-y-4 rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Spinner className="size-4" />{label}</div>
      <Skeleton aria-hidden="true" className="h-6 w-1/3" />
      <Skeleton aria-hidden="true" className="h-4 w-full" />
      <Skeleton aria-hidden="true" className="h-4 w-2/3" />
    </div>
  );
}
