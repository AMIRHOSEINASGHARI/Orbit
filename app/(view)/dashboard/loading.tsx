import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return <main role="status" aria-live="polite" aria-busy="true" className="space-y-6 p-5 sm:p-7">
    <span className="sr-only">Loading your dashboard</span>
    <div className="space-y-3"><Skeleton className="h-3 w-32" /><Skeleton className="h-9 w-52" /><Skeleton className="h-4 w-80 max-w-full" /></div>
    <div className="flex justify-end gap-2"><Skeleton className="h-[38px] w-36" /><Skeleton className="h-[38px] w-32" /></div>
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-[154px] rounded-card" />)}</div>
    <div className="grid gap-6 xl:grid-cols-[2fr_1fr]"><Skeleton className="h-[380px] rounded-card" /><Skeleton className="h-[380px] rounded-card" /></div>
    <div className="grid gap-6 xl:grid-cols-[1.42fr_1fr]"><Skeleton className="h-[488px] rounded-card" /><Skeleton className="h-[488px] rounded-card" /></div>
    <div className="grid gap-6 lg:grid-cols-3">{Array.from({ length: 3 }, (_, index) => <Skeleton key={index} className="h-[310px] rounded-card" />)}</div>
    <div className="grid gap-6 xl:grid-cols-[2fr_1fr]"><Skeleton className="h-[446px] rounded-card" /><Skeleton className="h-[446px] rounded-card" /></div>
    <div className="grid gap-6 xl:grid-cols-2"><Skeleton className="h-[264px] rounded-card" /><Skeleton className="h-[264px] rounded-card" /></div>
  </main>;
}
