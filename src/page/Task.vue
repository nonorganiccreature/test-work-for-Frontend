<script setup lang="ts">
import type { Task, TaskAction, TaskPageState } from "@/types";

import * as Tasks from "@/components/tasks";

import { ref } from "vue";
import { useEventListener, useFetch, useLocalStorage } from "@/composables";

const pageState = ref<TaskPageState>({
  tasks: useLocalStorage<Task[]>(
    "tasks",
    useFetch<Task[]>("/tasks", []).state.value.data,
  ),
  taskFilter: "all",
  userTasks: useLocalStorage<Task[]>(
    "user-tasks",
    useFetch<Task[]>("/tasks", []).state.value.data,
  ),
  updateFeedActions: [],
});

const events = useEventListener();

const handleActionsInvoke = (id: Task["id"], action: TaskAction["type"]) => {
  pageState.value.updateFeedActions.push({
    id: Math.random() * performance.now(),
    time: new Date(),
    title: pageState.value.tasks.find((t) => t.id === id)?.title || "",
    type: action,
  });
};

const handleKeyPress = () => {
  console.log("Key pressed");
};

const handleResize = () => {
  console.log("Resize event");
};

events.create("keypress", handleKeyPress);
events.create("resize", handleResize);
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Tasks.Header />
        <Tasks.Filter
          v-model:current-filter="pageState.taskFilter"
          :tasks="pageState.tasks"
        />
        <Tasks.AddForm
          v-model:tasks="pageState.tasks"
          @add-task="(id) => handleActionsInvoke(id, 'created')"
        />
        <v-row>
          <v-col cols="8">
            <Tasks.List
              v-model:tasks="pageState.tasks"
              :filter="pageState.taskFilter"
              @deleted="(id) => handleActionsInvoke(id, 'deleted')"
              @cancel-deletion="
                (id) => handleActionsInvoke(id, 'cancelDeletion')
              "
              @completed="(id) => handleActionsInvoke(id, 'completed')"
              @uncompleted="(id) => handleActionsInvoke(id, 'uncompleted')"
              @start-deletion="(id) => handleActionsInvoke(id, 'startDeletion')"
            />
          </v-col>
          <v-col cols="4">
            <Tasks.UpdateFeed :actions="pageState.updateFeedActions" />
          </v-col>
        </v-row>
        <Tasks.Statistics :tasks="pageState.tasks" />
      </v-col>
    </v-row>
  </v-container>
</template>
