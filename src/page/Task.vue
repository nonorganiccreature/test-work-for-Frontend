<script setup lang="ts">
import type { TaskPageState } from "@/types";
import type { TaskDTO } from "@/types/dto";

import * as Tasks from "@/components/tasks";

import { ref } from "vue";
import {
  useEventListener,
  useFetch,
  useLocalStorage,
  useTaskActions,
} from "@/composables";
import { Task } from "@/models";

const tasks = useLocalStorage<Task[]>(
  "tasks",
  useFetch<TaskDTO[]>("/tasks", []).state.value.data.map((t) => new Task(t)),
  {
    transformFunction: (tasksArray: TaskDTO[]) =>
      tasksArray.map((t) => new Task(t)),
  },
);
const { state: updateFeedActions, handleActionsInvoke } = useTaskActions(tasks);

const pageState = ref<TaskPageState>({
  tasks,
  updateFeedActions,
  taskFilter: "all",
});

const events = useEventListener();

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
            <Tasks.UpdateFeed v-model:actions="pageState.updateFeedActions" />
          </v-col>
        </v-row>
        <Tasks.Statistics :tasks="pageState.tasks" />
      </v-col>
    </v-row>
  </v-container>
</template>
