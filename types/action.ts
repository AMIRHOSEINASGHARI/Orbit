import type { FieldErrors } from "@/utils/validation";

export type ActionSuccess<T> = {
  success: true;
  data: T;
};

export type ActionFailure = {
  success: false;
  error: string;
  fieldErrors?: FieldErrors;
};

export type ActionResult<T> = ActionSuccess<T> | ActionFailure;
