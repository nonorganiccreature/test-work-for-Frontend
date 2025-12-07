<script setup lang="ts">
import type { TaskPageState } from "@/types";
import type { Ref } from "vue";

import ListEntry from "./ListEntry.vue";
import { computed, toValue } from "vue";
import { useTaskTracker, useTimers } from "@/composables";
import type { Task } from "@/models";

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

const taskTracker = useTaskTracker(() => tasks.value);

const emit = defineEmits<ComponentEmits>();

const toggleTask = (id: Task["id"]) => {
  const task = taskTracker.tasks.value.find((t) => t.id === id);

  if (task) {
    task.toggleTask(
      () => emit("completed", task.id),
      () => emit("uncompleted", task.id),
    );
  }
};

const startDeletion = (id: Task["id"]) => {
  taskTracker.startDeletion(
    id,
    () => emit("startDeletion", id),
    () => emit("deleted", id),
  );
};

const cancelDeletion = (id: Task["id"]) => {
  taskTracker.cancelDeletion(id, () => emit("cancelDeletion", id));
};

const filteredTasks = computed(() => {
  if (props.filter === "active") {
    return taskTracker.tasks.value.filter((t) => !t.completed);
  }

  if (props.filter === "completed") {
    return taskTracker.tasks.value.filter((t) => t.completed);
  }

  return taskTracker.tasks.value;
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
      :deletion-pending="taskTracker.isDeletionPending(task.id)"
      :timer="taskTracker.taskTimer(task.id)"
      :deletion-timers="toValue(taskTracker.deletionTimers.timers)"
      @toggle-task="toggleTask"
      @start-deletion="startDeletion"
      @cancel-deletion="cancelDeletion"
    />
  </v-list>
  <div v-else>
    <h3>Список задач пуст</h3>
  </div>
</template>
