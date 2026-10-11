import { fireEvent, render, screen } from "./test-utils";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { TaskChecklistEditor } from "@/features/tasks/components/task-checklist-editor";

it("adds a checklist item and reports the new form value", async () => {
  const onChange = vi.fn();
  render(<TaskChecklistEditor items={[]} onChange={onChange} />);

  await userEvent.type(screen.getByRole("textbox", { name: "New checklist item" }), "  Review scope  {Enter}");

  expect(onChange).toHaveBeenCalledWith([{ text: "Review scope", isCompleted: false }]);
});

it("edits an existing checklist item", async () => {
  const onChange = vi.fn();
  render(<TaskChecklistEditor items={[{ text: "Review", isCompleted: false }]} onChange={onChange} />);

  fireEvent.change(screen.getByRole("textbox", { name: "Checklist item 1" }), { target: { value: "Review draft" } });

  expect(onChange).toHaveBeenCalledWith([{ text: "Review draft", isCompleted: false }]);
});
