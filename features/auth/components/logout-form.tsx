"use client";

import { useFormStatus } from "react-dom";
import { LogOutIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { logoutAction } from "@/features/auth/actions/logout.action";

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant="ghost" aria-label="Log out" className="h-8 gap-[5px] rounded-lg border-0 px-[7px] text-ui-small">
      <LogOutIcon className="size-3.5" />
      <span>{pending ? "Signing out…" : "Log out"}</span>
    </Button>
  );
}

export function LogoutForm() {
  return <Form action={logoutAction} className="hidden lg:block"><LogoutButton /></Form>;
}
