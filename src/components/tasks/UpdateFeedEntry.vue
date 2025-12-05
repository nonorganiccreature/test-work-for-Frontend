<script lang="ts" setup>
import type { TaskAction } from "@/types";

import { formatDate } from "@/utils";
import { computed } from "vue";

export interface ComponentProps {
  action: TaskAction;
}

const props = defineProps<ComponentProps>();

const actionTypeFormatted = computed(() => {
  if (props.action.type === "created") {
    return "создание задачи";
  }

  if (props.action.type === "deleted") {
    return "удаление задачи";
  }

  if (props.action.type === "startDeletion") {
    return "начало удаления";
  }

  if (props.action.type === "completed") {
    return "выполнена";
  }

  if (props.action.type === "uncompleted") {
    return "не выполнена";
  }

  if (props.action.type === "cancelDeletion") {
    return "отмена удаления";
  }

  return "";
});
</script>
<template>
  <v-list-item>
    <v-list-item-title class="font-weight-medium">
      {{ action.title }}
    </v-list-item-title>
    <v-list-item-subtitle>
      Действие: {{ actionTypeFormatted }}
    </v-list-item-subtitle>
    <v-list-item-subtitle>
      Время: {{ formatDate(action.time) }}
    </v-list-item-subtitle>
  </v-list-item>
</template>
<style scoped></style>
