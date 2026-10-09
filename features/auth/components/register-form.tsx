"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { EyeIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterInput } from "@/features/auth/schemas/auth.schema";
import type { AuthActionState } from "@/features/auth/types/auth-action.types";

type RegisterFormProps = {
  onSubmit?: (formData: FormData) => void;
  pending?: boolean;
  state?: AuthActionState;
};

function PasswordField({ id, label, placeholder, hint, registration, error }: {
  id: string;
  label: string;
  placeholder: string;
  hint?: string;
  registration: UseFormRegisterReturn;
  error?: string;
}) {
  const [visible, setVisible] = useState(false);
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-[13px] font-semibold text-foreground">{label}</Label>
      <div className="relative">
        <Input {...registration} id={id} type={visible ? "text" : "password"} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined} className="h-12 rounded-lg px-3.5 pr-12 text-ui-body" />
        <button type="button" aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`} onClick={() => setVisible((value) => !value)} className="absolute inset-y-0 right-2 flex w-8 items-center justify-center text-muted-foreground hover:text-foreground">
          <EyeIcon className="size-[18px]" />
        </button>
      </div>
      {hint && <p id={hintId} className="text-ui-small text-muted-foreground">{hint}</p>}
      {error && <p id={errorId} className="text-ui-small text-danger" role="alert">{error}</p>}
    </div>
  );
}

function serverFieldError(state: AuthActionState, field: string) {
  return state && !state.success ? state.fieldErrors?.[field]?.[0] : undefined;
}

export function RegisterForm({ onSubmit, pending = false, state = null }: RegisterFormProps) {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
  });
  const usernameError = form.formState.errors.username?.message ?? serverFieldError(state, "username");
  const emailError = form.formState.errors.email?.message ?? serverFieldError(state, "email");
  const passwordError = form.formState.errors.password?.message ?? serverFieldError(state, "password");
  const confirmationError = form.formState.errors.confirmPassword?.message ?? serverFieldError(state, "confirmPassword");

  function submit(values: RegisterInput) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) formData.set(key, value);
    onSubmit?.(formData);
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2.5">
        <h1 className="text-[32px] font-bold leading-tight text-foreground">Create your account</h1>
        <p className="text-ui-body leading-relaxed text-muted-foreground">A place to plan your day and make progress together.</p>
      </header>

      <Form onSubmit={form.handleSubmit(submit)} className="space-y-6">
        <div className="space-y-[18px]">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-[13px] font-semibold text-foreground">Username</Label>
            <Input {...form.register("username")} id="username" autoComplete="username" placeholder="Choose a username" aria-invalid={Boolean(usernameError)} aria-describedby={usernameError ? "username-error" : undefined} className="h-12 rounded-lg px-3.5 text-ui-body" />
            {usernameError && <p id="username-error" className="text-ui-small text-danger" role="alert">{usernameError}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[13px] font-semibold text-foreground">Email</Label>
            <Input {...form.register("email")} id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(emailError)} aria-describedby={emailError ? "email-error" : undefined} className="h-12 rounded-lg px-3.5 text-ui-body" />
            {emailError && <p id="email-error" className="text-ui-small text-danger" role="alert">{emailError}</p>}
          </div>

          <PasswordField id="password" label="Password" placeholder="Create a password" hint="Use at least 8 characters." registration={form.register("password")} error={passwordError} />
          <PasswordField id="confirmPassword" label="Confirm password" placeholder="Re-enter your password" registration={form.register("confirmPassword")} error={confirmationError} />
        </div>

        {state && !state.success && <p role="alert" className="text-ui-small text-danger">{state.error}</p>}
        {state?.success && <p role="status" className="text-ui-small text-success-foreground">{state.data.message}</p>}

        <div className="space-y-3.5 text-center">
          <Button type="submit" disabled={pending || form.formState.isSubmitting} className="h-12 w-full rounded-lg text-ui-body">
            {pending || form.formState.isSubmitting ? "Creating account…" : "Create account"}
          </Button>
          <p className="text-ui-caption leading-relaxed text-muted-foreground">
            By creating an account, you agree to our <Link href="/terms" className="text-primary hover:underline">Terms</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </Form>

      <p className="text-center text-ui-small text-muted-foreground">Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Sign in</Link></p>
    </div>
  );
}
