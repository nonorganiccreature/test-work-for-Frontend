<script setup lang="ts">
import type { TaskAction } from "@/types";

import UpdateFeedEntry from "./UpdateFeedEntry.vue";

export interface ComponentProps {
  actions: TaskAction[];
}

defineProps<ComponentProps>();
</script>
<template>
  <v-list
    v-if="actions.length > 0"
    lines="two"
    class="elevation-1 rounded overflow-y-auto feed-list"
  >
    <UpdateFeedEntry
      v-for="action in actions"
      :key="action.id"
      :action="action"
    />
  </v-list>
  <div v-else><h3>Список дествий пуст</h3></div>
</template>
<style scoped>
.feed-list {
  max-height: 400px;
  height: 100%;
}
</style>
