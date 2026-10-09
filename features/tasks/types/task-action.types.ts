import type { ActionResult } from "@/types";

export type TaskActionState = ActionResult<{ id: string; message: string }> | null;
