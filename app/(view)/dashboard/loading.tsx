import { LoadingState } from "@/components/shared/LoadingState";

export default function DashboardLoading() {
  return <main className="space-y-6 p-7"><LoadingState label="Loading your dashboard" /></main>;
}
