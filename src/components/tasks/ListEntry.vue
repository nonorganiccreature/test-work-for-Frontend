<script lang="ts" setup>
import type { Task } from "@/models";
import type { DeletionTimer, Timer } from "@/types";

import { formatDate, millisecondsToSeconds } from "@/utils";
import { computed } from "vue";

export interface ComponentProps {
  task: Task;
  timer: Timer | null;
  deletionPending: boolean;
  deletionTimers: DeletionTimer[];
}

export interface ComponentEmits {
  toggleTask: [id: Task["id"]];
  cancelDeletion: [id: Task["id"]];
  startDeletion: [id: Task["id"]];
}

const emit = defineEmits<ComponentEmits>();
const props = defineProps<ComponentProps>();

const formatTaskDate = (...args: Parameters<typeof formatDate>) => {
  return formatDate(...args);
};

const formattedDeletionTimer = computed(
  () =>
    millisecondsToSeconds(
      props.deletionTimers.find((t) => t.id === props.task.id)?.timeLeft || 0,
    ) || 10,
);

const toggleTask = (id: Task["id"]) => {
  emit("toggleTask", id);
};

const startDeletion = (id: Task["id"]) => {
  emit("startDeletion", id);
};

const cancelDeletion = (id: Task["id"]) => {
  emit("cancelDeletion", id);
};
</script>
<template>
  <v-list-item>
    <template #prepend>
      <v-checkbox
        :model-value="task.completed"
        density="comfortable"
        @update:model-value="toggleTask(task.id)"
      />
    </template>

    <v-list-item-title
      :class="{ 'text-decoration-line-through text-grey': task.completed }"
      class="font-weight-medium"
    >
      {{ task.title }}
    </v-list-item-title>
    <v-list-item-subtitle>
      Создано: {{ formatDate(task.createdAt) }} | Обновлено:
      {{ formatDate(task.updatedAt) }}
      <span v-if="task.completed">
        | Завершено: {{ formatTaskDate(task.completedAt) }}
      </span>
    </v-list-item-subtitle>

    <template #append>
      <div v-if="deletionPending" class="deletion-pending">
        <v-chip color="error" size="small" class="mr-2">
          Удаление через {{ formattedDeletionTimer }}
        </v-chip>
        <v-btn
          variant="text"
          color="warning"
          size="small"
          @click="cancelDeletion(task.id)"
        >
          Отмена
        </v-btn>
      </div>
      <v-btn
        v-else
        icon
        variant="text"
        color="error"
        size="small"
        @click="startDeletion(task.id)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-list-item>
</template>
<style scoped></style>
