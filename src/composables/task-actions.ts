import { Task, TaskAction } from "@/models";
import { ref, toValue, type MaybeRefOrGetter } from "vue";

export const useTaskActions = (tasks: MaybeRefOrGetter<Task[]>) => {
  const state = ref<TaskAction[]>([]);

  const handleActionsInvoke = (id: Task["id"], action: TaskAction["type"]) => {
    state.value.push({
      id: Math.random() * performance.now(),
      time: new Date(),
      title: toValue(tasks).find((t) => t.id === id)?.title || "",
      type: action,
    });
  };

  return {
    state,
    handleActionsInvoke,
  };
};
