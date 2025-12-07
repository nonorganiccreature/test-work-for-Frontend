<script setup lang="ts">
import { Task } from "@/models";

export interface ComponentProps {
  tasks: Task[];
}

const currentFilter = defineModel<"all" | "active" | "completed">(
  "currentFilter",
  { required: false },
);

defineProps<ComponentProps>();
</script>
<template>
  <div class="filter-section mb-4">
    <v-btn
      :class="{ 'bg-primary': currentFilter === 'all' }"
      variant="tonal"
      class="mr-2"
      @click="currentFilter = 'all'"
    >
      Все ({{ tasks.length }})
    </v-btn>
    <v-btn
      :class="{ 'bg-primary': currentFilter === 'active' }"
      variant="tonal"
      class="mr-2"
      @click="currentFilter = 'active'"
    >
      Активные ({{ tasks.filter((t) => !t.completed).length }})
    </v-btn>
    <v-btn
      :class="{ 'bg-primary': currentFilter === 'completed' }"
      variant="tonal"
      class="mr-2"
      @click="currentFilter = 'completed'"
    >
      Завершенные ({{ tasks.filter((t) => t.completed).length }})
    </v-btn>
  </div>
</template>
<style scoped>
.filter-section {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 960px) {
  .filter-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-section button {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>
