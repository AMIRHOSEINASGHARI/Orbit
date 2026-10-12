"use client";

import { useFormStatus } from "react-dom";
import { LogOutIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { logoutAction } from "@/features/auth/actions/logout.action";

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant="outline" size="icon" aria-label={pending ? "Signing out" : "Log out"} title={pending ? "Signing out" : "Log out"}>
      <LogOutIcon aria-hidden="true" className="size-4" />
    </Button>
  );
}

export function LogoutForm() {
  return <Form action={logoutAction}><LogoutButton /></Form>;
}
