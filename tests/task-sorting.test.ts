import { beforeEach, expect, it, vi } from "vitest";

const { aggregate } = vi.hoisted(() => ({ aggregate: vi.fn() }));

vi.mock("@/features/tasks/models/task.model", () => ({ TaskModel: { aggregate } }));

import { listTasks } from "@/features/tasks/services/task.service";

beforeEach(() => {
  aggregate.mockReturnValue({ exec: vi.fn().mockResolvedValue([]) });
});

it("sorts dated tasks soonest first and leaves undated tasks last", async () => {
  await listTasks("64b000000000000000000001", { sort: "due-date-asc" });

  const pipeline = aggregate.mock.calls[0][0];
  expect(pipeline[1]).toEqual({
    $addFields: {
      _hasNoDueDate: {
        $cond: [{ $eq: [{ $ifNull: ["$dueDate", null] }, null] }, 1, 0],
      },
    },
  });
  expect(pipeline[2]).toEqual({
    $sort: { _hasNoDueDate: 1, dueDate: 1, updatedAt: -1 },
  });
  expect(pipeline[3]).toEqual({ $unset: "_hasNoDueDate" });
});
