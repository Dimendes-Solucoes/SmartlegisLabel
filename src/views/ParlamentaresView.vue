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
        <li class="text-gray-900 font-medium">Parlamentares</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Parlamentares</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Buscar
        </label>
        <div class="flex gap-2">
          <div class="relative flex-1">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Busque pelo nome do parlamentar..."
              class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Legislatura
        </label>
        <div class="relative">
          <select
            v-model="selectedLegislatura"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option
              v-for="legislatura in legislaturas"
              :key="legislatura.id"
              :value="legislatura.id"
            >
              {{ legislatura.title }}
            </option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Partido
        </label>
        <div class="relative">
          <select
            v-model="selectedPartido"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option
              v-for="partido in partidos"
              :key="partido.id"
              :value="partido.id"
            >
              {{ partido.name_party }}
            </option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="parlamentar in parlamentares"
        :key="parlamentar.id"
        class="rounded-lg shadow-sm p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
        style="background-color: #EFEFEF;"
        @click="goToParlamentar(parlamentar.id)"
      >
        <div class="flex-shrink-0">
          <img
            :src="parlamentar.path_image ? S3_HOST + parlamentar.path_image : '/images/member-placeholder.jpg'"
            :alt="parlamentar.nickname"
            class="w-20 h-20 rounded-full object-cover"
          />
        </div>

        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-800 mb-2">
            {{ parlamentar.nickname }}
          </h3>
          <span class="px-3 py-1 text-xs font-medium rounded-full inline-block" style="background-color: rgba(0, 122, 184, 0.15); color: #007AB8;">
            {{ parlamentar?.category_party?.name_party || 'Partido não informado' }}
          </span>
        </div>

        <div class="flex-shrink-0">
          <img
            v-if="parlamentar?.category_party?.logo || ''"
            :src="S3_HOST + (parlamentar.category_party?.logo || '')"
            :alt="`Logo ${parlamentar.category_party?.[0]?.name_party || parlamentar.party}`"
            class="h-12 object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { parlamentaresService, partidosService, legislaturasService } from '@/services/api'

const router = useRouter()
const S3_HOST = import.meta.env.VITE_S3_HOST

const searchQuery = ref('')
const selectedLegislatura = ref('')
const selectedPartido = ref('')

const todosParlamentares = ref([])
const partidos = ref([])
const legislaturas = ref([])
const parlamentares = computed(() => {
  let resultado = todosParlamentares.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    resultado = resultado.filter(p =>
      p.nickname?.toLowerCase().includes(query)
    )
  }

  if (selectedLegislatura.value) {
    resultado = resultado.filter(p =>
      p.legislatures?.some(leg => leg.id === parseInt(selectedLegislatura.value))
    )
  }

  if (selectedPartido.value) {
    resultado = resultado.filter(p =>
      p.category_party?.id === parseInt(selectedPartido.value)
    )
  }

  return resultado
})

onMounted(() => {
  getParlamentares()
  getPartidos()
  getLegislaturas()
})

const getLegislaturas = async () => {
  try {
    const response = await legislaturasService.get()
    legislaturas.value = response.data
  } catch (error) {
    console.error('Erro ao buscar legislaturas:', error)
  }
}

const getPartidos = async () => {
  try {
    const response = await partidosService.get()
    partidos.value = response.data
  } catch (error) {
    console.error('Erro ao buscar partidos:', error)
  }
}

const getParlamentares = async () => {
  try {
    const response = await parlamentaresService.get()
    todosParlamentares.value = response.users.filter(user => {
      const status = user.status_user
      return status === 1
    })
  } catch (error) {
    console.error('Erro ao buscar parlamentares:', error)
  }
}

const goToParlamentar = (id) => {
  router.push({ name: 'parlamentar-detalhe', params: { id } })
}
</script>
