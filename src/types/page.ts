import type { Task, TaskAction } from ".";
import type { Ref } from "vue";

export interface TaskPageState {
  tasks: Ref<Task[]>;
  taskFilter: "all" | "active" | "completed";
  updateFeedActions: TaskAction[];
}
