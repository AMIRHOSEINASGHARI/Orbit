import { getTasks } from "@/features/tasks/actions/get-tasks.action";
import { TasksPage } from "@/features/tasks/components/TasksPage";

export default async function TasksRoute() {
  return <TasksPage result={await getTasks()} />;
}
