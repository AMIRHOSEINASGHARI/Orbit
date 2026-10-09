import "server-only";
import { cookies } from "next/headers";
import { AUTH_TOKEN_LIFETIME_SECONDS } from "@/lib/auth/jwt";
import { SESSION_COOKIE } from "@/lib/auth/session";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: AUTH_TOKEN_LIFETIME_SECONDS,
};

export async function setAuthCookie(token: string): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, token, cookieOptions);
}

export async function clearAuthCookie(): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
}
