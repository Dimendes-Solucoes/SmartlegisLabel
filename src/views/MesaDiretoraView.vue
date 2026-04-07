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

    <div class="mb-8 max-w-md">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Legislatura <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <select
          v-model="filters.legislature_id"
          class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
        >
          <option
            v-for="leg in legislaturas"
            :key="leg.id"
            :value="leg.id"
          >
            {{ leg.title }} {{ leg.is_current ? '- Atual' : '' }}
          </option>
        </select>
        <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="w-10 h-10 border-4 border-gray-200 border-t-brand-blue rounded-full animate-spin"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MemberCard
        v-for="member in members"
        :key="member.id"
        :member="member"
        :s3-host="S3_HOST"
        @click="goToParlamentar(member.id)"
      />
    </div>
    
    <div v-if="!loading && members.length === 0" class="text-center py-12 text-gray-500">
      Nenhum membro encontrado para os filtros selecionados.
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import MemberCard from '@/components/MemberCard.vue'
import { mesaDiretoraService, legislaturasService } from '@/services/api' 

const router = useRouter()
const S3_HOST = import.meta.env.VITE_S3_HOST

const legislaturas = ref([])
const members = ref([])
const loading = ref(false)

const filters = ref({
  legislature_id: ''
})

const getLegislaturas = async () => {
  try {
    const response = await legislaturasService.get()
    
    const dataList = response.data?.data || response.data || []
    legislaturas.value = dataList

    const legislaturaAtual = dataList.find(leg => leg.is_current)
    if (legislaturaAtual) {
      filters.value.legislature_id = legislaturaAtual.id
    }
  } catch (error) {
    console.error('Erro ao buscar legislaturas:', error)
  }
}

const getBoardDirector = async () => {
  try {
    loading.value = true

    const response = await mesaDiretoraService.get()
    const dataList = response.data?.data || response.data || []
    
    const mesaDiretoraFiltrada = dataList.filter(item => {
      const isMesa = item.comission_name === 'MESA DIRETORA'
      const matchLegislatura = filters.value.legislature_id 
        ? item.legislature_id === filters.value.legislature_id 
        : true

      return isMesa && matchLegislatura
    })
    
    members.value = mesaDiretoraFiltrada.flatMap(item => item.users ?? [])
    
  } catch (error) {
    console.error('Erro ao buscar mesa diretora:', error)
    members.value = []
  } finally {
    loading.value = false
  }
}

// Watcher observando apenas a alteração da legislatura
watch(
  () => filters.value.legislature_id,
  () => {
    getBoardDirector()
  }
)

const goToParlamentar = (id) => {
  router.push({ name: 'parlamentar-detalhe', params: { id } })
}

onMounted(async () => {
  await getLegislaturas()

  if (!filters.value.legislature_id) {
    getBoardDirector()
  }
})
</script>