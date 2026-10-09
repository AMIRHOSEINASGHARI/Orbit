import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/shared/AuthLayout";
import { getCurrentUser } from "@/lib/auth/current-user";

export default async function PublicAuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  if (await getCurrentUser()) redirect("/dashboard");

  return <AuthLayout>{children}</AuthLayout>;
}
