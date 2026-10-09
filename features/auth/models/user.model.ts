import "server-only";
import { model, models, Schema, type Model } from "mongoose";
import type { User } from "@/features/auth/schemas/user.schema";

const userModelSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true, collection: "users" },
);

userModelSchema.index({ email: 1 });

export const UserModel = (models.User as Model<User> | undefined) ?? model<User>("User", userModelSchema);
