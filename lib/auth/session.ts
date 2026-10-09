import "server-only";
import { cookies } from "next/headers";
import { verifyAuthToken } from "@/lib/auth/jwt";

export const SESSION_COOKIE = "orbit_session";

export async function hasValidSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return token ? verifyAuthToken(token) !== null : false;
}
