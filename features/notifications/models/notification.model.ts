import "server-only";
import { model, models, Schema, type Model, type Types } from "mongoose";
import { notificationResourceTypes, notificationTypes } from "@/features/notifications/schemas/notification.schema";

export type NotificationRecord = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  workspaceId: Types.ObjectId | null;
  type: (typeof notificationTypes)[number];
  title: string;
  message: string;
  resourceType: (typeof notificationResourceTypes)[number] | null;
  resourceId: Types.ObjectId | null;
  isRead: boolean;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const notificationModelSchema = new Schema<NotificationRecord>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", default: null, index: true },
  type: { type: String, enum: notificationTypes, required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  message: { type: String, required: true, trim: true, maxlength: 1000 },
  resourceType: { type: String, enum: [...notificationResourceTypes, null], default: null },
  resourceId: { type: Schema.Types.ObjectId, default: null },
  isRead: { type: Boolean, default: false, index: true },
  readAt: { type: Date, default: null },
}, { timestamps: true, collection: "notifications" });

notificationModelSchema.index({ userId: 1, createdAt: -1 });
notificationModelSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

export const NotificationModel =
  (models.Notification as Model<NotificationRecord> | undefined) ??
  model<NotificationRecord>("Notification", notificationModelSchema);
