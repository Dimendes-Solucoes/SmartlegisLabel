<template>
  <header class="bg-brand-dark-blue-legis text-white py-4 px-6">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-4">
        <img
          :src="brasao"
          :alt="`Brasão de ${tenantName}`"
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
import { useTenant } from '@/composables/useTenant'

const { tenantName, tenantFullName, brasao } = useTenant()

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  subtitle: {
    type: String,
    default: 'Sistema de Apoio ao Processo Legislativo'
  }
})

const title = props.title || tenantFullName.value
</script>
