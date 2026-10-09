import "server-only";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  if (!password || bcrypt.truncates(password)) {
    throw new Error("Password must be non-empty and no longer than 72 UTF-8 bytes.");
  }

  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!password || bcrypt.truncates(password) || !/^\$2[aby]\$\d{2}\$/.test(hash)) return false;

  return bcrypt.compare(password, hash);
}
