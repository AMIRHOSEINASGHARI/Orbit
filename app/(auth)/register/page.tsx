"use client";

import { startTransition, useActionState } from "react";
import { registerAction } from "@/features/auth/actions/register.action";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(registerAction, null);

  return <RegisterForm onSubmit={(formData) => startTransition(() => action(formData))} pending={pending} state={state} />;
}
