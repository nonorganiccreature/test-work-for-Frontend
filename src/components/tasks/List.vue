<script setup lang="ts">
import type { DeletionTimer, Task, TaskPageState } from "@/types";
import type { Ref } from "vue";

import ListEntry from "./ListEntry.vue";
import { computed, ref } from "vue";
import { useTimers } from "@/composables";

export interface ComponentProps {
  filter: TaskPageState["taskFilter"];
}

export interface ComponentEmits {
  startDeletion: [id: Task["id"]];
  cancelDeletion: [id: Task["id"]];
  deleted: [id: Task["id"]];
  completed: [id: Task["id"]];
  uncompleted: [id: Task["id"]];
  created: [id: Task["id"]];
}

export interface ComponentState {
  pendingDeletions: Ref<Set<number>>;
  deletionTimers: ReturnType<typeof useTimers>;
}

const tasks = defineModel<Task[]>("tasks", { default: () => [] });
const props = defineProps<ComponentProps>();

const state = ref<ComponentState>({
  pendingDeletions: ref<Set<number>>(new Set()),
  deletionTimers: useTimers(),
});
const emit = defineEmits<ComponentEmits>();

const isDeletionPending = (id: Task["id"]) =>
  state.value.pendingDeletions.has(id);

const taskTimer = (id: Task["id"]) =>
  state.value.deletionTimers.timers.find((t) => t.id === id) || null;

const toggleTask = (id: Task["id"]) => {
  const task = tasks.value.find((t) => t.id === id);

  if (task) {
    task.completed = !task.completed;

    if (task.completed) {
      emit("completed", task.id);
    }

    if (!task.completed) {
      emit("uncompleted", task.id);
    }

    task.updatedAt = new Date();
    task.completedAt = task.completed ? new Date() : null;
  }
};

const startDeletion = (id: Task["id"]) => {
  state.value.pendingDeletions.add(id);

  const timer: DeletionTimer = {
    id,
    timeLeft: 10000,
    expireCallback: () => {
      tasks.value = tasks.value.filter((t) => t.id !== id);
      emit("deleted", id);
    },
  };

  state.value.deletionTimers.addTimer(timer);

  emit("startDeletion", id);
};

const cancelDeletion = (id: Task["id"]) => {
  state.value.deletionTimers.removeTimer(id);

  emit("cancelDeletion", id);
};

const filteredTasks = computed(() => {
  if (props.filter === "active") {
    return tasks.value.filter((t) => !t.completed);
  }

  if (props.filter === "completed") {
    return tasks.value.filter((t) => t.completed);
  }

  return tasks.value;
});
</script>
<template>
  <v-list
    v-if="filteredTasks.length > 0"
    lines="two"
    class="elevation-1 rounded"
  >
    <ListEntry
      v-for="task in filteredTasks"
      :key="task.id"
      :task="task"
      :deletion-pending="isDeletionPending(task.id)"
      :timer="taskTimer(task.id)"
      :deletion-timers="state.deletionTimers.timers"
      @toggle-task="toggleTask"
      @start-deletion="startDeletion"
      @cancel-deletion="cancelDeletion"
    />
  </v-list>
  <div v-else><h3>Список задач пуст</h3></div>
</template>
