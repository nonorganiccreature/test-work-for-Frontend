<script setup lang="ts">
import type { Task } from "@/types";
import { computed } from "vue";

export interface ComponentProps {
  tasks: Task[];
}

const props = defineProps<ComponentProps>();

const activeTasksAmount = computed(
  () => props.tasks.filter((t) => !t.completed).length,
);

const completedTasksAmount = computed(
  () => props.tasks.filter((t) => t.completed).length,
);

const completedPercentage = computed(() =>
  (
    (props.tasks.filter((t) => t.completed).length / props.tasks.length) *
    100
  ).toFixed(1),
);
</script>
<template>
  <v-card class="mt-6">
    <v-card-text>
      <p>Всего задач: {{ tasks.length }}</p>
      <p>Активных: {{ activeTasksAmount }}</p>
      <p>Завершенных: {{ completedTasksAmount }}</p>
      <p>
        Процент завершения:
        {{ completedPercentage }}%
      </p>
    </v-card-text>
  </v-card>
</template>
