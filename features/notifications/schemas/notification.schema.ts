import { z } from "zod";

export const notificationTypes = [
  "task.created", "task.updated", "task.trashed", "task.restored", "task.deleted", "task.status-changed",
  "group.created", "group.updated", "group.trashed", "group.restored", "group.deleted",
  "note.created", "note.updated", "note.trashed", "note.restored", "note.deleted",
  "profile.updated", "avatar.updated", "avatar.removed", "password.changed", "reminder.due",
  "task.assigned", "comment.created", "mention.created", "workspace.invited",
  "workspace.member-added", "workspace.role-changed", "security.session-revoked",
] as const;

export const notificationResourceTypes = [
  "task", "group", "note", "profile", "account", "workspace", "comment", "attachment",
] as const;

export const notificationSchema = z.object({
  userId: z.string().regex(/^[\da-f]{24}$/i),
  workspaceId: z.string().regex(/^[\da-f]{24}$/i).nullable().default(null),
  type: z.enum(notificationTypes),
  title: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(1000),
  resourceType: z.enum(notificationResourceTypes).nullable().default(null),
  resourceId: z.string().regex(/^[\da-f]{24}$/i).nullable().default(null),
  isRead: z.boolean().default(false),
  readAt: z.date().nullable().default(null),
});

export type NotificationInput = z.infer<typeof notificationSchema>;
