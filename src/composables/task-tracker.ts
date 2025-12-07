import type { Task } from "@/models";
import type { MaybeRefOrGetter, Ref } from "vue";
import type { DeletionTimer } from "@/types";

import { useTimers } from "@/composables";
import { ref, toValue } from "vue";

export const useTaskTracker = (initialTasks: MaybeRefOrGetter<Task[]>) => {
  const tasks: Ref<Task[]> = ref(toValue(initialTasks));
  const deletionTimers: ReturnType<typeof useTimers> = useTimers();
  const pendingDeletions: Ref<Set<number>> = ref<Set<number>>(new Set());

  const isDeletionPending = (id: Task["id"]) => {
    return pendingDeletions.value.has(id);
  };

  const taskTimer = (id: Task["id"]) => {
    return deletionTimers.timers.value.find((t) => t.id === id) || null;
  };

  const startDeletion = (
    id: Task["id"],
    onStartDeletion: () => void,
    onDeletion: () => void,
  ) => {
    pendingDeletions.value.add(id);

    const timer: DeletionTimer = {
      id,
      timeLeft: 10000,
      expireCallback: () => {
        tasks.value = tasks.value.filter((t) => t.id !== id);
        onDeletion();
      },
    };

    deletionTimers.addTimer(timer);

    onStartDeletion();
  };

  const cancelDeletion = (id: Task["id"], onDeletionCancel: () => void) => {
    deletionTimers.removeTimer(id);

    onDeletionCancel();
  };

  return {
    tasks,
    deletionTimers,

    startDeletion,
    cancelDeletion,
    taskTimer,
    isDeletionPending,
  };
};
