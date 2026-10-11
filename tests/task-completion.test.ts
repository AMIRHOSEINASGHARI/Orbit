import { beforeEach, expect, it, vi } from "vitest";

const { create, findOne, findOneAndUpdate, updateMany } = vi.hoisted(() => ({
  create: vi.fn(),
  findOne: vi.fn(),
  findOneAndUpdate: vi.fn(),
  updateMany: vi.fn(),
}));

vi.mock("@/features/tasks/models/task.model", () => ({
  TaskModel: { create, findOne, findOneAndUpdate, updateMany },
}));

import { changeTaskChecklistItemForUser, changeTaskStatusForUser, changeTasksStatusForUser, createTaskForUser, updateTaskForUser } from "@/features/tasks/services/task.service";

const userId = "64b000000000000000000001";
const taskId = "64b000000000000000000002";

beforeEach(() => {
  vi.clearAllMocks();
  create.mockResolvedValue({ _id: taskId });
  findOne.mockReturnValue({ select: () => ({ lean: () => ({ exec: async () => ({ checklist: [] }) }) }) });
  findOneAndUpdate.mockReturnValue({ select: () => ({ lean: () => ({ exec: async () => ({ _id: taskId }) }) }) });
  updateMany.mockReturnValue({ exec: async () => ({ modifiedCount: 1 }) });
});

it("sets completion time when creating a completed personal task", async () => {
  await createTaskForUser(userId, {
    groupId: null, title: "Done", description: "", status: "done", priority: "medium", dueDate: null, checklist: [{ text: "First", isCompleted: true }],
  });

  expect(create).toHaveBeenCalledWith(expect.objectContaining({
    workspaceId: null,
    completedAt: expect.any(Date),
    checklist: [{ text: "First", isCompleted: true, position: 0, completedAt: expect.any(Date) }],
  }));
});

it("preserves the first completion time when marking a task done again", async () => {
  await changeTaskStatusForUser(userId, taskId, "done");

  const [filter, update, options] = findOneAndUpdate.mock.calls[0];
  expect(filter.workspaceId).toBeNull();
  expect(update[0].$set.completedAt).toEqual({ $ifNull: ["$completedAt", expect.any(Date)] });
  expect(options.updatePipeline).toBe(true);
});

it("keeps completion time aligned when editing a task", async () => {
  await updateTaskForUser(userId, taskId, {
    groupId: null, title: "$100 budget", description: "$notes", status: "done", priority: "medium", dueDate: null, checklist: [{ text: "$first", isCompleted: false }],
  });

  const [filter, update, options] = findOneAndUpdate.mock.calls[0];
  expect(filter.workspaceId).toBeNull();
  expect(update[0].$set.title).toEqual({ $literal: "$100 budget" });
  expect(update[0].$set.description).toEqual({ $literal: "$notes" });
  expect(update[0].$set.checklist).toEqual({ $literal: [{ text: "$first", isCompleted: false, position: 0, completedAt: null }] });
  expect(update[0].$set.completedAt).toEqual({ $ifNull: ["$completedAt", expect.any(Date)] });
  expect(options.updatePipeline).toBe(true);
});

it("keeps a completed checklist item's original completion time on edit", async () => {
  const completedAt = new Date("2026-01-01T00:00:00.000Z");
  findOne.mockReturnValue({ select: () => ({ lean: () => ({ exec: async () => ({ checklist: [
    { text: "Removed", isCompleted: false, position: 0, completedAt: null },
    { text: "Review", isCompleted: true, position: 1, completedAt },
  ] }) }) }) });

  await updateTaskForUser(userId, taskId, {
    groupId: null, title: "Review", description: "", status: "todo", priority: "medium", dueDate: null,
    checklist: [{ text: "Review", isCompleted: true }],
  });

  expect(findOneAndUpdate.mock.calls[0][1][0].$set.checklist).toEqual({ $literal: [
    { text: "Review", isCompleted: true, position: 0, completedAt },
  ] });
});

it("checks a single current checklist item without replacing the rest of the array", async () => {
  findOneAndUpdate.mockReturnValue({ lean: () => ({ exec: async () => ({ _id: taskId }) }) });

  await changeTaskChecklistItemForUser(userId, taskId, 1, "Review", true);

  const [filter, update, options] = findOneAndUpdate.mock.calls[0];
  expect(filter).toMatchObject({ workspaceId: null, deletedAt: null, "checklist.1.text": "Review", "checklist.1.isCompleted": { $ne: true } });
  expect(update).toEqual({ $set: { "checklist.1.isCompleted": true, "checklist.1.completedAt": expect.any(Date) } });
  expect(options).toMatchObject({ returnDocument: "after", runValidators: true });
});

it("clears the checklist completion time when unchecked", async () => {
  findOneAndUpdate.mockReturnValue({ lean: () => ({ exec: async () => ({ _id: taskId }) }) });

  await changeTaskChecklistItemForUser(userId, taskId, 0, "Review", false);

  const [filter, update] = findOneAndUpdate.mock.calls[0];
  expect(filter["checklist.0.isCompleted"]).toBe(true);
  expect(update.$set).toMatchObject({ "checklist.0.isCompleted": false, "checklist.0.completedAt": null });
});

it("clears completion time when bulk reopening personal tasks", async () => {
  await changeTasksStatusForUser(userId, [taskId], "todo");

  const [filter, update, options] = updateMany.mock.calls[0];
  expect(filter.workspaceId).toBeNull();
  expect(update).toEqual([{ $set: { status: "todo", completedAt: null } }]);
  expect(options.updatePipeline).toBe(true);
});
