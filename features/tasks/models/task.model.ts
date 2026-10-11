import "server-only";
import { model, models, Schema, type Model } from "mongoose";
import type { TaskRecord } from "@/features/tasks/types/task.types";

const taskModelSchema = new Schema<TaskRecord>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    groupId: { type: Schema.Types.ObjectId, ref: "TaskGroup", default: null, index: true },
    title: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 5_000, default: "" },
    status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo", index: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium", index: true },
    dueDate: { type: Date, default: null, index: true },
    trashedByGroupId: { type: Schema.Types.ObjectId, ref: "TaskGroup", default: null, index: true },
    deletedAt: { type: Date, default: null, index: true },
    archivedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true, collection: "tasks" },
);

taskModelSchema.index({ userId: 1, deletedAt: 1, archivedAt: 1, updatedAt: -1 });
taskModelSchema.index({ userId: 1, status: 1, dueDate: 1 });

export const TaskModel =
  (models.Task as Model<TaskRecord> | undefined) ?? model<TaskRecord>("Task", taskModelSchema);
