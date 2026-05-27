<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-x-10 opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed top-6 right-6 z-[100] flex items-center w-full max-w-sm p-4 space-x-3 text-white bg-red-600 rounded-xl shadow-xl border border-red-700" role="alert">
      
      <div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-red-500">
        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
      </div>
      
      <div class="ml-3 text-sm font-medium">{{ message }}</div>
      
      <button type="button" @click="$emit('close')" class="ml-auto -mx-1.5 -my-1.5 bg-red-600 text-red-200 hover:text-white rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-700 inline-flex h-8 w-8 transition-colors">
        <span class="sr-only">Fechar</span>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  }
})

defineEmits(['close'])
</script>