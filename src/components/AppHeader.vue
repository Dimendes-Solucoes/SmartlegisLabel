<template>
  <header class="bg-brand-blue text-white py-4 px-6">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-4">
        <img
          src="../assets/img/natal.png"
          alt="Brasão"
          class="h-12 w-12 object-contain"
        />
        <div>
          <h1 class="text-2xl font-bold">{{ title }}</h1>
          <p class="text-sm opacity-90">{{ subtitle }}</p>
        </div>
      </div>
      <div>
        <img
          src="../assets/img/logo_legis.png"
          alt="SmartLegis"
          class="h-10 object-contain"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Câmara Municipal de Natal - RN'
  },
  subtitle: {
    type: String,
    default: 'Sistema de Apoio ao Processo Legislativo'
  }
})
</script>
