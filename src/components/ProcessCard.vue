<template>
  <div
    class="relative bg-brand-dark-blue-legis rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl group cursor-pointer h-64"
    @click="handleClick"
  >
    <div class="absolute inset-0 flex items-center justify-center p-8">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-contain opacity-90"
      />
    </div>

    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

    <div class="relative h-full flex flex-col justify-between p-6">
      <div class="mt-auto">
        <h3 class="text-white text-2xl font-bold leading-tight">
          {{ title }}
        </h3>
      </div>

      <div
        class="absolute inset-0 bg-brand-dark-blue-legis/95 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div>
          <h3 class="text-white text-2xl font-bold mb-4 leading-tight">
            {{ title }}
          </h3>
          <p class="text-white/90 text-sm leading-relaxed">
            {{ description }}
          </p>
        </div>

        <div class="flex justify-end">
          <button
            class="bg-white text-brand-blue px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            Acessar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  }
})

const router = useRouter()

const handleClick = () => {
  router.push(props.route)
}
</script>
