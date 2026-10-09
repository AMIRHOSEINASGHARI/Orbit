import "server-only";
import { cookies } from "next/headers";
import { UserModel } from "@/features/auth/models/user.model";
import { verifyAuthToken } from "@/lib/auth/jwt";
import { SESSION_COOKIE } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongoose";

export async function getCurrentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const userId = token ? verifyAuthToken(token) : null;
  if (!userId) return null;

  await connectToDatabase();
  const user = await UserModel.findById(userId)
    .select("username email emailVerifiedAt firstName lastName displayName bio avatar preferences createdAt updatedAt")
    .lean()
    .exec();

  if (!user) return null;

  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    emailVerifiedAt: user.emailVerifiedAt,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    bio: user.bio,
    avatar: user.avatar,
    preferences: user.preferences,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
