import { Task, TaskAction } from "@/models";

import type { Ref } from "vue";

export interface TaskPageState {
  tasks: Ref<Task[]>;
  updateFeedActions: Ref<TaskAction[]>;

  taskFilter: "all" | "active" | "completed";
}
