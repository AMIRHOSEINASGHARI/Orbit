"use server";

import { registerSchema } from "@/features/auth/schemas/auth.schema";
import { hashPassword } from "@/lib/auth/password";
import { connectToDatabase } from "@/lib/db/mongoose";
import { UserModel } from "@/features/auth/models/user.model";
import { handleActionError } from "@/utils/actionError";
import type { AuthActionState } from "@/features/auth/types/auth-action.types";

export async function registerAction(_previousState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const input = registerSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!input.success) return handleActionError(input.error);

  try {
    await connectToDatabase();
    const { username, email, password } = input.data;
    await UserModel.create({ username, email, password: await hashPassword(password) });

    return { success: true, data: { message: "Your account has been created. You can now sign in." } };
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === 11000) {
      return { success: false, error: "An account with those details already exists." };
    }

    return handleActionError(error);
  }
}
