import type { Types } from "mongoose";

export type TaskGroup = {
  id: string;
  userId: string;
  workspaceId: string | null;
  name: string;
  description: string;
  color: string | null;
  deletedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TaskGroupRecord = Omit<TaskGroup, "id" | "userId" | "workspaceId"> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  workspaceId: Types.ObjectId | null;
};
