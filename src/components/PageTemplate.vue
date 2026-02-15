<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <div class="mb-8">
      <button
        @click="$router.back()"
        class="text-brand-blue hover:text-brand-blue-dark flex items-center gap-2 mb-6"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </button>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ title }}</h1>
      <p class="text-gray-600 text-lg">{{ description }}</p>
    </div>

    <div class="bg-white rounded-lg shadow-md p-8">
      <p class="text-gray-500 text-center">
        Conteúdo em desenvolvimento...
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>
