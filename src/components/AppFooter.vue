<template>
  <footer class="bg-brand-blue text-white py-4 px-6 mt-auto">
    <div class="max-w-7xl mx-auto flex items-center justify-center gap-2">
      <img
        src="../assets/img/logo_legis.png"
        alt="SmartLegis"
        class="h-6 object-contain"
      />
      <span class="text-sm">Desenvolvido por SmartLegis - {{ currentYear }}</span>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
