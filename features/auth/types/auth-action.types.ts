import type { ActionResult } from "@/types";

export type AuthActionState = ActionResult<{ message: string }> | null;
