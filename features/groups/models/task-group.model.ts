import "server-only";
import { model, models, Schema } from "mongoose";

const taskGroupModelSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", default: null, index: true },
    name: { type: String, required: true, trim: true, minlength: 1, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 1_000, default: "" },
    color: { type: String, trim: true, default: null },
    deletedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true, collection: "taskgroups" },
);

taskGroupModelSchema.index({ userId: 1, deletedAt: 1 });
taskGroupModelSchema.index({ userId: 1, createdAt: -1, deletedAt: 1 });

export const TaskGroupModel =
  (models.TaskGroup ?? model("TaskGroup", taskGroupModelSchema));
