<template>
  <div class="max-w-7xl mx-auto px-6 py-8 relative">
    <nav class="text-sm mb-6">
      <ol class="flex items-center gap-2 text-gray-600">
        <li><router-link to="/" class="hover:text-brand-blue">Início</router-link></li>
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
          Buscar parlamentar
        </label>
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Digite o nome..."
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent pl-10"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Legislatura
        </label>
        <div class="relative">
          <select
            v-model="selectedMandate"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option v-for="leg in legislaturas" :key="leg.id" :value="leg.start_at?.slice(0, 4)">
              Legislatura {{ leg.start_at?.slice(0, 4) }}-{{ leg.end_at?.slice(0, 4) }}
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
            <option value="">Todos os partidos</option>
            <option v-for="partido in partidos" :key="partido.id" :value="partido.id">
              {{ partido.name_party || partido.sigla }}
            </option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-if="parlamentares.length === 0" class="col-span-2 text-center py-12 text-gray-500">
        Nenhum parlamentar encontrado com os filtros aplicados.
      </div>

      <div
        v-for="parlamentar in parlamentares"
        :key="parlamentar.id"
        class="rounded-lg shadow-sm p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
        style="background-color: #EFEFEF;"
        @click="goToParlamentar(parlamentar.id)"
      >
        <div class="flex-shrink-0">
          <img
            :src="getAvatarUrl(parlamentar.path_image, parlamentar.nickname)"
            :alt="parlamentar.nickname"
            class="w-20 h-20 rounded-full object-cover border border-gray-200"
          />
        </div>

        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-800 mb-2">
            {{ parlamentar.nickname }}
          </h3>
          <span class="px-3 py-1 text-xs font-medium rounded-full inline-block" style="background-color: rgba(0, 122, 184, 0.15); color: #007AB8;">
            {{ getParty(parlamentar)?.name_party || 'Partido não informado' }}
          </span>
        </div>

        <div class="flex-shrink-0">
          <img
            v-if="getParty(parlamentar)?.logo"
            :src="getAvatarUrl(getParty(parlamentar).logo)"
            :alt="`Logo ${getParty(parlamentar)?.name_party}`"
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
import { getAvatarUrl } from '@/utils/image-url'

const router = useRouter()

const searchQuery = ref('')
const selectedMandate = ref('')
const selectedPartido = ref('')

const todosParlamentares = ref([])
const partidos = ref([])
const legislaturas = ref([])

const parlamentares = computed(() => {
  let resultado = [...todosParlamentares.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()

    resultado = resultado.filter(parlamentar =>
      parlamentar.nickname?.toLowerCase().includes(query) ||
      parlamentar.name?.toLowerCase().includes(query)
    )
  }

  if (selectedMandate.value) {
    resultado = resultado.filter(parlamentar =>
      parlamentar.terms?.some(term => {
        const matchMandate =
          term.mandate?.start_at?.slice(0, 4) === selectedMandate.value

        const matchParty =
          !selectedPartido.value ||
          term.category_party?.id === Number(selectedPartido.value)

        return matchMandate && matchParty
      })
    )
  } else if (selectedPartido.value) {
    resultado = resultado.filter(parlamentar =>
      parlamentar.terms?.some(
        term =>
          term.category_party?.id === Number(selectedPartido.value)
      )
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

    const dataList =
      response.data?.data ||
      response.data ||
      []

    legislaturas.value = dataList

    const atual =
      dataList.find(leg => leg.is_current) ??
      dataList[dataList.length - 1]

    if (atual) {
      selectedMandate.value =
        atual.start_at?.slice(0, 4)
    }
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

    todosParlamentares.value = response.users.filter(
      user =>
        user.user_category_id == 2 ||
        user.user_category_id == 3
    )
  } catch (error) {
    console.error('Erro ao buscar parlamentares:', error)
  }
}

const getParty = (parlamentar) => {
  if (selectedMandate.value) {
    const term = parlamentar.terms?.find(
      term =>
        term.mandate?.start_at?.slice(0, 4) ===
        selectedMandate.value
    )

    if (term?.category_party) {
      return term.category_party
    }
  }

  const currentTerm = parlamentar.terms?.find(
    term => term.mandate?.is_current
  )

  if (currentTerm?.category_party) {
    return currentTerm.category_party
  }

  return parlamentar.category_party
}

const goToParlamentar = (id) => {
  router.push({
    name: 'parlamentar-detalhe',
    params: { id }
  })
}
</script>