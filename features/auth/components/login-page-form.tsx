"use client";

import { startTransition, useActionState } from "react";
import { loginAction } from "@/features/auth/actions/login.action";
import { LoginForm } from "@/features/auth/components/login-form";

export function LoginPageForm({ showSessionNotice }: { showSessionNotice: boolean }) {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <>
      {showSessionNotice && <p role="status" className="mb-5 text-ui-small text-muted-foreground">Your session has expired or is no longer valid. Please sign in again.</p>}
      <LoginForm onSubmit={(formData) => startTransition(() => action(formData))} pending={pending} state={state} />
    </>
  );
}
