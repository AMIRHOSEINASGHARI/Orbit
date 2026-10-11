import "server-only";
import { model, models, Schema, type Model } from "mongoose";
import type { TaskRecord } from "@/features/tasks/types/task.types";

const taskModelSchema = new Schema<TaskRecord>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    groupId: { type: Schema.Types.ObjectId, ref: "TaskGroup", default: null, index: true },
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", default: null, index: true },
    assigneeIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tagIds: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    title: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 5_000, default: "" },
    status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo", index: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium", index: true },
    dueDate: { type: Date, default: null, index: true },
    completedAt: { type: Date, default: null },
    checklist: [{
      _id: false,
      text: { type: String, required: true, maxlength: 500 },
      isCompleted: { type: Boolean, default: false },
      position: { type: Number, required: true },
      completedAt: { type: Date, default: null },
    }],
    recurrence: {
      frequency: { type: String, enum: ["daily", "weekly", "monthly", "weekdays", "custom", null], default: null },
      interval: { type: Number, min: 1, default: 1 },
      daysOfWeek: [{ type: Number, min: 0, max: 6 }],
      endAt: { type: Date, default: null },
      isPaused: { type: Boolean, default: false },
    },
    reminders: [{
      _id: false,
      remindAt: { type: Date, required: true },
      snoozedUntil: { type: Date, default: null },
      deliveredAt: { type: Date, default: null },
      dismissedAt: { type: Date, default: null },
    }],
    dependencyIds: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    attachmentIds: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],
    trashedByGroupId: { type: Schema.Types.ObjectId, ref: "TaskGroup", default: null, index: true },
    deletedAt: { type: Date, default: null, index: true },
    archivedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true, collection: "tasks" },
);

taskModelSchema.index({ userId: 1, deletedAt: 1, archivedAt: 1, updatedAt: -1 });
taskModelSchema.index({ userId: 1, status: 1, dueDate: 1 });
taskModelSchema.index({ workspaceId: 1, deletedAt: 1, createdAt: -1 });
taskModelSchema.index({ workspaceId: 1, status: 1, deletedAt: 1 });
taskModelSchema.index({ workspaceId: 1, assigneeIds: 1, deletedAt: 1 });
taskModelSchema.index({ userId: 1, tagIds: 1, deletedAt: 1 });
taskModelSchema.index({ userId: 1, archivedAt: 1, createdAt: -1 });
taskModelSchema.index({ "reminders.remindAt": 1, "reminders.deliveredAt": 1 });

export const TaskModel =
  (models.Task as Model<TaskRecord> | undefined) ?? model<TaskRecord>("Task", taskModelSchema);
