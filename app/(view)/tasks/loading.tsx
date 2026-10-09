import { Skeleton } from "@/components/ui/skeleton";

export default function TasksLoading() {
  return (
    <main role="status" aria-live="polite" aria-busy="true" className="space-y-6 p-5 sm:p-7">
      <span className="sr-only">Loading your tasks</span>
      <div className="space-y-3">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-9 w-52" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <Skeleton className="h-16 rounded-card" />
      <Skeleton className="h-64 rounded-card" />
    </main>
  );
}
