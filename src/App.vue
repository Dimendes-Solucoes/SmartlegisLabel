<template>
  <div id="app" class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>
