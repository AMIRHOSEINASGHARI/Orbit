import { LoginPageForm } from "@/features/auth/components/login-page-form";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ session?: string }> }) {
  const { session } = await searchParams;
  const showSessionNotice = session === "invalid" || session === "expired";

  return <LoginPageForm showSessionNotice={showSessionNotice} />;
}
