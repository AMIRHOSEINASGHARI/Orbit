"use client";

import { startTransition, useActionState } from "react";
import { loginAction } from "@/features/auth/actions/login.action";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return <LoginForm onSubmit={(formData) => startTransition(() => action(formData))} pending={pending} state={state} />;
}
