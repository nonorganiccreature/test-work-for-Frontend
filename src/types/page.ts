import { Task } from "@/models";

import type { TaskAction } from ".";
import type { Ref } from "vue";

export interface TaskPageState {
  tasks: Ref<Task[]>;
  taskFilter: "all" | "active" | "completed";
  updateFeedActions: TaskAction[];
}
