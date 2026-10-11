import "server-only";
import mongoose from "mongoose";
import { TaskGroupModel } from "@/features/groups/models/task-group.model";
import type { CreateGroupInput } from "@/features/groups/schemas/group.schema";

export async function createGroupForUser(userId: string, input: CreateGroupInput): Promise<string> {
  const group = await TaskGroupModel.create({
    userId: new mongoose.Types.ObjectId(userId),
    workspaceId: null,
    ...input,
  });
  return group._id.toString();
}
