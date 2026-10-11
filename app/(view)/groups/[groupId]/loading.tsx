import { LoadingState } from "@/components/shared/LoadingState";

export default function GroupDetailsLoading() {
  return <main className="p-6"><LoadingState label="Loading group…" /></main>;
}
