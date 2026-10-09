"use server";

import { redirect } from "next/navigation";
import { UserModel } from "@/features/auth/models/user.model";
import { loginSchema } from "@/features/auth/schemas/auth.schema";
import { setAuthCookie } from "@/lib/auth/cookie";
import { generateAuthToken } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { connectToDatabase } from "@/lib/db/mongoose";
import type { AuthActionState } from "@/features/auth/types/auth-action.types";
import { handleActionError } from "@/utils/actionError";

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const input = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!input.success) return handleActionError(input.error);

  try {
    await connectToDatabase();
    const user = await UserModel.findOne({ username: input.data.username })
      .select("+password")
      .exec();

    if (!user || !(await verifyPassword(input.data.password, user.password))) {
      return {
        success: false,
        error: "The username or password is incorrect.",
      };
    }

    await setAuthCookie(generateAuthToken(user._id.toString()));
    redirect("/dashboard");
  } catch (error) {
    return handleActionError(error);
  }
}
