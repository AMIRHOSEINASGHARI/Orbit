import { expect, it } from "vitest";
import { parseTaskFormData } from "@/features/tasks/schemas/task.schema";

function taskFormData(checklist: string) {
  const data = new FormData();
  data.set("title", "Review budget");
  data.set("description", "");
  data.set("status", "todo");
  data.set("priority", "medium");
  data.set("groupId", "personal");
  data.set("dueDate", "");
  data.set("checklist", checklist);
  return data;
}

it("accepts valid checklist items from the task form", () => {
  const result = parseTaskFormData(taskFormData('[{"text":" Review ","isCompleted":true}]'));
  expect(result.success && result.data.checklist).toEqual([{ text: "Review", isCompleted: true }]);
});

it("rejects malformed checklist JSON", () => {
  expect(parseTaskFormData(taskFormData("[invalid")).success).toBe(false);
});
