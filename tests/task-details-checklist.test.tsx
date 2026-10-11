import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, userEvent, waitFor } from "./test-utils";
import { afterEach, expect, it, vi } from "vitest";

afterEach(() => vi.unstubAllGlobals());

const { getTaskById, changeTaskChecklistItemAction } = vi.hoisted(() => ({
  getTaskById: vi.fn(),
  changeTaskChecklistItemAction: vi.fn(),
}));

vi.mock("@/features/tasks/actions/get-task-by-id.action", () => ({ getTaskById }));
vi.mock("@/features/tasks/actions/change-task-checklist-item.action", () => ({ changeTaskChecklistItemAction }));

import { TaskDetailsDrawer } from "@/features/tasks/components/task-details-drawer";

it("updates a checklist item when its drawer checkbox is clicked", async () => {
  vi.stubGlobal("PointerEvent", MouseEvent);
  const task = {
    id: "64b000000000000000000002",
    groupId: null,
    title: "Review scope",
    description: "",
    status: "todo" as const,
    priority: "medium" as const,
    dueDate: null,
    completedAt: null,
    checklist: [{ text: "Review", isCompleted: false, position: 0, completedAt: null }],
    assigneeCount: 0,
    tagCount: 0,
    attachmentCount: 0,
    deletedAt: null,
    archivedAt: null,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  };
  getTaskById.mockResolvedValue({ success: true, data: task });
  changeTaskChecklistItemAction.mockResolvedValue({ success: true, data: {
    ...task,
    checklist: [{ ...task.checklist[0], isCompleted: true, completedAt: new Date("2026-01-02") }],
  } });
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  render(<QueryClientProvider client={client}>
    <TaskDetailsDrawer userId="64b000000000000000000001" taskId={task.id} groups={[]} open onOpenChange={vi.fn()} onEdit={vi.fn()} onTrash={vi.fn()} onComplete={vi.fn()} />
  </QueryClientProvider>);

  await userEvent.click(await screen.findByRole("checkbox", { name: "Mark Review complete" }));
  expect(changeTaskChecklistItemAction).toHaveBeenCalledWith({ taskId: task.id, index: 0, text: "Review", isCompleted: true });
  await waitFor(() => expect(screen.getByText("1/1 complete")).toBeInTheDocument());
});
