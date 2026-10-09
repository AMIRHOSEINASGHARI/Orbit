import "server-only";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

const SESSION_COOKIE = "orbit_session";

type SessionClaims = {
  sub?: unknown;
  exp?: unknown;
};

// shortcut: token signature and expiry only; add persisted-session revocation when auth persistence lands.
export async function hasValidSession() {
  const secret = env.JWT_SECRET;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!secret || !token || token.length > 8192) return false;

  const [encodedHeader, encodedClaims, encodedSignature, extra] = token.split(".");
  if (!encodedHeader || !encodedClaims || !encodedSignature || extra !== undefined) {
    return false;
  }

  try {
    const header = JSON.parse(Buffer.from(encodedHeader, "base64url").toString("utf8")) as {
      alg?: unknown;
    };
    const claims = JSON.parse(Buffer.from(encodedClaims, "base64url").toString("utf8")) as SessionClaims;

    if (
      header.alg !== "HS256" ||
      typeof claims.sub !== "string" ||
      !claims.sub ||
      typeof claims.exp !== "number" ||
      claims.exp <= Math.floor(Date.now() / 1000)
    ) {
      return false;
    }

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );

    return crypto.subtle.verify(
      "HMAC",
      key,
      Buffer.from(encodedSignature, "base64url"),
      new TextEncoder().encode(`${encodedHeader}.${encodedClaims}`),
    );
  } catch {
    return false;
  }
}
