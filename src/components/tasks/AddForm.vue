<script setup lang="ts">
import { Task } from "@/models";
import { ref } from "vue";

export interface ComponentProps { }

export interface ComponentEmits {
  addTask: [id: Task["id"]];
}

export interface ComponentState {
  taskTitle: string;
}

defineProps<ComponentProps>();
const emit = defineEmits<ComponentEmits>();
const state = ref<ComponentState>({ taskTitle: "" });

const tasks = defineModel<Task[]>("tasks", { default: () => [] });

const onAddTask = () => {
  if (!state.value.taskTitle.trim()) return;

  const newTask: Task = new Task({
    id: Date.now(),
    title: state.value.taskTitle,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null
  }
  );

  tasks.value.push(newTask);

  emit("addTask", newTask.id);
};
state.value.taskTitle = "";
</script>
<template>
  <v-form class="mb-6" @submit.prevent="onAddTask">
    <v-text-field v-model="state.taskTitle" label="Новая задача" :rules="[(value) => !!value || 'Введите текст задачи']"
      variant="outlined" density="comfortable" />
    <v-btn type="submit" color="primary" class="mt-2">Добавить</v-btn>
  </v-form>
</template>
<style scoped></style>
