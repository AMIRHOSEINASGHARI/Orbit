import "server-only";
import { model, models, Schema, type Model } from "mongoose";
import type { User } from "@/features/auth/schemas/user.schema";

const userModelSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    emailVerifiedAt: { type: Date, default: null },
    password: { type: String, required: true, select: false },
    firstName: { type: String, trim: true, maxlength: 50, default: "" },
    lastName: { type: String, trim: true, maxlength: 50, default: "" },
    displayName: { type: String, trim: true, maxlength: 80, default: "" },
    bio: { type: String, trim: true, maxlength: 500, default: "" },
    avatar: {
      url: { type: String, default: null },
      publicId: { type: String, default: null },
    },
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "system",
      },
      taskView: {
        type: String,
        enum: ["list", "table", "board"],
        default: "list",
      },
      timezone: { type: String, default: "Asia/Tehran" },
      trashRetentionDays: { type: Number, min: 0, default: 30 },
    },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecretEncrypted: { type: String, default: null, select: false },
    twoFactorRecoveryCodeHashes: { type: [String], default: [], select: false },
    sessionVersion: { type: Number, default: 0, select: false },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true, collection: "users" },
);

export const UserModel =
  (models.User as Model<User> | undefined) ??
  model<User>("User", userModelSchema);
