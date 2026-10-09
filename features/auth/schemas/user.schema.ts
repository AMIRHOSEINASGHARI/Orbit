import { z } from "zod";

const nullableDate = z.date().nullable().default(null);

export const userSchema = z.object({
  username: z.string().trim().toLowerCase().min(3).max(30),
  email: z.string().trim().email().toLowerCase(),
  emailVerifiedAt: nullableDate,
  password: z.string().min(1),
  firstName: z.string().trim().max(50).default(""),
  lastName: z.string().trim().max(50).default(""),
  displayName: z.string().trim().max(80).default(""),
  bio: z.string().trim().max(500).default(""),
  avatar: z
    .object({
      url: z.string().nullable().default(null),
      publicId: z.string().nullable().default(null),
    })
    .default({ url: null, publicId: null }),
  preferences: z
    .object({
      theme: z.enum(["light", "dark", "system"]).default("system"),
      taskView: z.enum(["list", "table", "board"]).default("list"),
      timezone: z.string().default("Asia/Tehran"),
      trashRetentionDays: z.number().int().nonnegative().default(30),
    })
    .default({
      theme: "system",
      taskView: "list",
      timezone: "Asia/Tehran",
      trashRetentionDays: 30,
    }),
  twoFactorEnabled: z.boolean().default(false),
  twoFactorSecretEncrypted: z.string().nullable().default(null),
  twoFactorRecoveryCodeHashes: z.array(z.string()).default([]),
  sessionVersion: z.number().int().nonnegative().default(0),
  lastLoginAt: nullableDate,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof userSchema>;
