"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { PasswordVisibilityIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  loginSchema,
  type LoginInput,
} from "@/features/auth/schemas/auth.schema";
import type { AuthActionState } from "@/features/auth/types/auth-action.types";

type LoginFormProps = {
  onSubmit?: (formData: FormData) => void;
  pending?: boolean;
  state?: AuthActionState;
};

function PasswordField({
  registration,
  error,
}: {
  registration: UseFormRegisterReturn;
  error?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <Field data-invalid={Boolean(error)} className="gap-2">
      <FieldLabel
        htmlFor="password"
        className="text-[13px] font-semibold text-foreground"
      >
        Password
      </FieldLabel>
      <div className="relative">
        <Input
          {...registration}
          id="password"
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Enter your password"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "password-error" : undefined}
          className="h-12 rounded-lg px-3.5 pr-12 text-ui-body"
        />
        <button
          type="button"
          aria-label={`${visible ? "Hide" : "Show"} password`}
          onClick={() => setVisible((value) => !value)}
          className="absolute inset-y-0 right-2 flex w-8 items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <PasswordVisibilityIcon className="size-[18px]" />
        </button>
      </div>
      <FieldError
        id="password-error"
        errors={error ? [{ message: error }] : []}
        className="text-ui-small font-medium text-danger-foreground"
      />
    </Field>
  );
}

function serverFieldError(state: AuthActionState, field: string) {
  return state && !state.success ? state.fieldErrors?.[field]?.[0] : undefined;
}

export function LoginForm({
  onSubmit,
  pending = false,
  state = null,
}: LoginFormProps) {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });
  const usernameError =
    form.formState.errors.username?.message ??
    serverFieldError(state, "username");
  const passwordError =
    form.formState.errors.password?.message ??
    serverFieldError(state, "password");

  function submit(values: LoginInput) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) formData.set(key, value);
    onSubmit?.(formData);
  }

  return (
    <div className="space-y-7">
      <header className="space-y-2.5">
        <h1 className="text-[32px] font-bold leading-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-ui-body leading-relaxed text-muted-foreground">
          Sign in to organize your day and keep work moving.
        </p>
      </header>

      <Form onSubmit={form.handleSubmit(submit)} className="space-y-5">
        <FieldGroup className="gap-5">
          <Field data-invalid={Boolean(usernameError)} className="gap-2">
            <FieldLabel
              htmlFor="username"
              className="text-[13px] font-semibold text-foreground"
            >
              Username
            </FieldLabel>
            <Input
              {...form.register("username")}
              id="username"
              autoComplete="username"
              placeholder="Enter your username"
              aria-invalid={Boolean(usernameError)}
              aria-describedby={usernameError ? "username-error" : undefined}
              className="h-12 rounded-lg px-3.5 text-ui-body"
            />
            <FieldError
              id="username-error"
              errors={usernameError ? [{ message: usernameError }] : []}
              className="text-ui-small font-medium text-danger-foreground"
            />
          </Field>
          <PasswordField
            registration={form.register("password")}
            error={passwordError}
          />
        </FieldGroup>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-ui-small font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {state && !state.success && (
          <p
            role="alert"
            className="rounded-lg border border-danger-foreground/20 bg-danger px-3 py-2 text-ui-small font-medium text-danger-foreground"
          >
            {state.error}
          </p>
        )}

        <Button
          type="submit"
          disabled={pending || form.formState.isSubmitting}
          className="h-12 w-full rounded-lg text-white"
        >
          {pending || form.formState.isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </Form>

      <p className="text-center text-ui-small text-muted-foreground">
        New to Orbit?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
