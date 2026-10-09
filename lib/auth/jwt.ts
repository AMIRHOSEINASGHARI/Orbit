import "server-only";
import jwt from "jsonwebtoken";
import { env } from "@/lib/env";

export const AUTH_TOKEN_LIFETIME_SECONDS = 180 * 24 * 60 * 60;

export function generateAuthToken(userId: string): string {
  if (!env.JWT_SECRET) throw new Error("JWT_SECRET is required to create an authentication token.");
  if (!userId) throw new Error("A user ID is required to create an authentication token.");

  return jwt.sign({}, env.JWT_SECRET, {
    algorithm: "HS256",
    subject: userId,
    expiresIn: AUTH_TOKEN_LIFETIME_SECONDS,
  });
}

export function inspectAuthToken(token: string): { status: "valid"; userId: string } | { status: "expired" | "invalid" } {
  if (!env.JWT_SECRET || !token || token.length > 8192) return { status: "invalid" };

  try {
    const claims = jwt.verify(token, env.JWT_SECRET, { algorithms: ["HS256"] });
    if (typeof claims !== "object" || typeof claims.sub !== "string" || !claims.sub) return { status: "invalid" };
    return { status: "valid", userId: claims.sub };
  } catch (error) {
    return { status: error instanceof jwt.TokenExpiredError ? "expired" : "invalid" };
  }
}

export function verifyAuthToken(token: string): string | null {
  const result = inspectAuthToken(token);
  return result.status === "valid" ? result.userId : null;
}
