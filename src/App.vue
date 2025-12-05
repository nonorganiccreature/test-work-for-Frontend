<template>
  <v-app>
    <AppHeader />

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="8">
            <TaskPage />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import TaskPage from "@/page/Task.vue";
</script>

<style scoped></style>
