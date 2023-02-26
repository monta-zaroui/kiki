<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBarOverview from '@/components/NavBarOverview.vue';</script>

<template>
  <div id="app">
    <NavBarOverview />
    <RouterView />
  </div>
</template>

<style scoped></style>
