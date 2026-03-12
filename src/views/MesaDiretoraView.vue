<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <nav class="text-sm mb-6">
      <ol class="flex items-center gap-2 text-gray-600">
        <li>
          <router-link to="/" class="hover:text-brand-blue">
            Início
          </router-link>
        </li>
        <li>›</li>
        <li class="text-gray-900 font-medium">Mesa diretora</li>
      </ol>
    </nav>

    <div class="mb-8">
      <div class="flex items-center gap-4 mb-4">
        <button
          @click="$router.back()"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-3xl font-bold text-gray-900">Mesa diretora</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MemberCard
        v-for="member in members"
        :key="member.id"
        :member="member"
        :s3-host="S3_HOST"
        @click="goToParlamentar(member.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MemberCard from '@/components/MemberCard.vue'
import { mesaDiretoraService } from '@/services/api'

const router = useRouter()
const S3_HOST = import.meta.env.VITE_S3_HOST

const selectedLegislatura = ref('20')
const period = ref('')
const members = ref([])

const getBoardDirector = async () => {
  try {
    const response = await mesaDiretoraService.get()
    members.value = response.data.flatMap(item => item.users ?? [])
  } catch (error) {
    console.error('Erro ao buscar mesa diretora:', error)
  }
}

const goToParlamentar = (id) => {
  router.push({ name: 'parlamentar-detalhe', params: { id } })
}

onMounted(() => {
  getBoardDirector()
})
</script>
