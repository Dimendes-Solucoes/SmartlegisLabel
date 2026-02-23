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
        <li class="text-gray-900 font-medium">Matérias legislativas</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Matérias legislativas</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo de matéria
        </label>
        <div class="relative">
          <select
            v-model.number="filters.document_category_id"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option
              v-for="type in documentsTypes"
              :key="type.id"
              :value="type.id"
            >
              {{ type.name }}
            </option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Ano
        </label>
        <div class="relative">
          <select
            v-model.number="filters.year"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Localização
        </label>
        <div class="relative">
          <select
            v-model.number="filters.document_status_movement_id"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option :value="1">Secretaria</option>
            <option :value="2">Sessão</option>
            <option :value="3">Procurador</option>
            <option :value="4">Comissão</option>
            <option :value="6">Prefeitura</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Situação
        </label>
        <div class="relative">
          <select
            v-model="filters.situacao"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="rejeitado">Rejeitado</option>
            <option value="tramitacao">Em tramitação</option>
            <option value="aprovado">Aprovado</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Parlamentar
        </label>
        <div class="relative">
          <select
            v-model.number="filters.author_id"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option
              v-for="parlamentar in parlamentares"
              :key="parlamentar.id"
              :value="parlamentar.id"
            >
              {{ parlamentar.name }}
            </option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <div class="mb-8">
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
            placeholder="Busque pelo assunto, ementa ou protocolo..."
            class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          />
        </div>
        <button
          @click="handleSearch"
          class="px-6 py-2.5 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          style="background-color: #007AB8;"
        >
          Buscar
        </button>
        <button
          @click="clearFilters"
          class="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          style="color: #007AB8;"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Limpar filtros
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p class="text-gray-600">Carregando...</p>
      </div>
    </div>

    <div v-else-if="!hasSearched" class="flex flex-col items-center justify-center py-20">
      <img src="/images/empty-search.svg" alt="Busca vazia" class="w-64 h-64 mb-6 opacity-50" />
      <p class="text-gray-500 text-center">
        Execute uma busca para que o resultado seja carregado.
      </p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="materia in materias"
        :key="materia.id"
        class="bg-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
        @click="goToMateria(materia.id)"
      >

        <h3 class="text-lg font-bold text-blue-600 mb-3">
          {{ materia.document_category.abbreviation }}
        </h3>

        <p class="text-sm text-gray-700 mb-4 leading-relaxed">
          {{ materia.name }}
        </p>

        <div class="grid grid-cols-2 md:grid-cols-7 gap-4 mb-4">
          <div>
            <p class="text-xs text-gray-500 mb-1">Protocolo</p>
            <p class="text-sm font-medium text-gray-900">{{ materia.id }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Data de entrada</p>
            <p class="text-sm font-medium text-gray-900">{{ formatDate(materia.created_at) }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Localização atual</p>
            <p v-if="materia.document_status_movement_id === 1" class="text-sm font-medium text-gray-900">Secretaria</p>
            <p v-else-if="materia.document_status_movement_id === 2" class="text-sm font-medium text-gray-900">Sessão</p>
            <p v-else-if="materia.document_status_movement_id === 3" class="text-sm font-medium text-gray-900">Procurador</p>
            <p v-else-if="materia.document_status_movement_id === 4" class="text-sm font-medium text-gray-900">Comissão</p>
            <p v-else-if="materia.document_status_movement_id === 5" class="text-sm font-medium text-gray-900">Sessão</p>
            <p v-else-if="materia.document_status_movement_id === 6" class="text-sm font-medium text-gray-900">Prefeitura</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Situação</p>
            <p class="text-sm font-medium text-gray-900">{{ getSituacao(materia.voting_result_1, materia.voting_result_2) }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Em tramitação?</p>
            <p class="text-sm font-medium text-gray-900">{{ materia.document_status_movement_id != 6 ? 'Sim' : 'Não' }}</p>
          </div>
          <div class="flex items-center gap-4">
                <div v-for="autor in materia.authors" :key="autor" class="flex items-center gap-5 mb-1">
                  <img
                    v-if="autor.path_image"
                    :src="S3_HOST + autor.path_image"
                    :alt="autor.name"
                    class="w-8 h-8 rounded-full object-cover"
                  />
                  <div v-else class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ autor.name || 'Autor não informado' }}</p>
                    <p class="text-xs text-gray-500">Autor</p>
                  </div>
                </div>
              </div>
        </div>

        <div class="flex gap-3 justify-end">
          <a 
            :href="S3_HOST + materia.attachment" 
            target="_blank"
            download
            @click.stop
            class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity inline-flex items-center"
            style="background-color: #007AB8;"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Matéria em PDF
          </a>
        </div>
      </div>
      

      <div class="flex items-center justify-between pt-4">
        <div class="text-sm text-gray-600">
          Mostrando {{ startItem }}-{{ endItem }} de {{ pagination.total }} resultados
        </div>
        <div class="flex gap-2">
          <!-- Primeira página -->
          <button
            @click="goToPage(1)"
            :disabled="pagination.currentPage === 1"
            :class="[
              'px-3 py-2 text-sm font-medium rounded-lg',
              pagination.currentPage === 1
                ? 'text-gray-400 bg-white border border-gray-300 cursor-not-allowed'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            ]"
            title="Primeira página"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>

          <!-- Anterior -->
          <button
            @click="previousPage"
            :disabled="pagination.currentPage === 1"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-lg',
              pagination.currentPage === 1
                ? 'text-gray-400 bg-white border border-gray-300 cursor-not-allowed'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            ]"
          >
            Anterior
          </button>

          <!-- Números das páginas -->
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-lg',
              page === pagination.currentPage
                ? 'text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            ]"
            :style="page === pagination.currentPage ? 'background-color: #003d6f;' : ''"
          >
            {{ page }}
          </button>

          <!-- Reticências se necessário -->
          <span v-if="showEllipsis" class="px-3 py-2 text-gray-500">...</span>

          <!-- Última página (se não estiver visível) -->
          <button
            v-if="shouldShowLastPage"
            @click="goToPage(pagination.lastPage)"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {{ pagination.lastPage }}
          </button>

          <!-- Próximo -->
          <button
            @click="nextPage"
            :disabled="pagination.currentPage === pagination.lastPage"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-lg',
              pagination.currentPage === pagination.lastPage
                ? 'text-gray-400 bg-white border border-gray-300 cursor-not-allowed'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            ]"
          >
            Próximo
          </button>

          <!-- Última página -->
          <button
            @click="goToPage(pagination.lastPage)"
            :disabled="pagination.currentPage === pagination.lastPage"
            :class="[
              'px-3 py-2 text-sm font-medium rounded-lg',
              pagination.currentPage === pagination.lastPage
                ? 'text-gray-400 bg-white border border-gray-300 cursor-not-allowed'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            ]"
            title="Última página"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { materiasService, parlamentaresService } from '@/services/api'

const router = useRouter()

const searchQuery = ref('')
const hasSearched = ref(false)
const loading = ref(false)
const documentsTypes = ref([])
const parlamentares = ref([])
const S3_HOST = import.meta.env.VITE_S3_HOST
let debounceTimeout = null

onMounted(() => {
  getDocuments()
  getTypes()
  getParlamentares()
})

const filters = ref({
  document_category_id: '',
  year: '',
  document_status_movement_id: '',
  situacao: '',
  author_id: ''
})

const pagination = ref({
  currentPage: 1,
  lastPage: 1,
  perPage: 10,
  total: 0
})

const startItem = computed(() => {
  if (pagination.value.total === 0) return 0
  return (pagination.value.currentPage - 1) * pagination.value.perPage + 1
})

const endItem = computed(() => {
  const end = pagination.value.currentPage * pagination.value.perPage
  return end > pagination.value.total ? pagination.value.total : end
})

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const startYear = 2000
  const endYear = currentYear + 5
  const yearList = []

  for (let year = endYear; year >= startYear; year--) {
    yearList.push(year)
  }

  return yearList
})

const visiblePages = computed(() => {
  const pages = []
  const current = pagination.value.currentPage
  const last = pagination.value.lastPage

  pages.push(current)

  for (let i = 1; i <= 3 && current + i <= last; i++) {
    pages.push(current + i)
  }

  return pages
})

const showEllipsis = computed(() => {
  const lastVisible = visiblePages.value[visiblePages.value.length - 1]
  return lastVisible < pagination.value.lastPage - 1
})

const shouldShowLastPage = computed(() => {
  const lastVisible = visiblePages.value[visiblePages.value.length - 1]
  return lastVisible < pagination.value.lastPage
})

const materias = ref([])

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getTypes = async () => {
  try {
    const response = await materiasService.getTypes()
    documentsTypes.value = response.data
  } catch (error) {
    console.error('Erro ao buscar tipos de matéria:', error)
    return []
  }
}

const getParlamentares = async () => {
  try {
    const response = await parlamentaresService.get()
    parlamentares.value = response.users.filter(user => {
      const status = user.status_user
      return status === 1
    })
  } catch (error) {
    console.error('Erro ao buscar parlamentares:', error)
  }
}

const getDocuments = async (page = 1) => {
  try {
    loading.value = true
    console.log('Valores dos filtros:', filters.value)
    
    const params = {
      page,
      per_page: pagination.value.perPage
    }

    if (searchQuery.value) {
      params.name = searchQuery.value
    }
    if (filters.value.document_category_id) {
      params.document_category_id = filters.value.document_category_id
    }
    if (filters.value.year) {
      params.year = filters.value.year
    }
    if (filters.value.document_status_movement_id) {
      params.document_status_movement_id = filters.value.document_status_movement_id
    }

    if (filters.value.situacao) {
      if (filters.value.situacao === 'aprovado') {
        params.voting_result = 1
      } else if (filters.value.situacao === 'rejeitado') {
        params.voting_result = 2
      }
      // Em tramitação: não adiciona filtro
    }
    if (filters.value.author_id) {
      params.authors = [Number(filters.value.author_id)]
      console.log('📋 Authors array:', params.authors)
    }

    console.log('Parâmetros enviados para API:', params)
    const response = await materiasService.get(params)
    console.log('Detalhes das matérias:', response)

    materias.value = response.data
    pagination.value = {
      currentPage: response.current_page,
      lastPage: response.last_page,
      perPage: response.per_page,
      total: response.total
    }
    hasSearched.value = true
  } catch (error) {
    console.error('Erro ao buscar matérias:', error)
    materias.value = []
  } finally {
    loading.value = false
  }
}

watch(() => searchQuery.value, () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
  debounceTimeout = setTimeout(() => {
    if (hasSearched.value || searchQuery.value) {
      getDocuments(1)
    }
  }, 500)
})

watch(
  () => [filters.value.document_category_id, filters.value.year, filters.value.document_status_movement_id, filters.value.situacao, filters.value.author_id],
  () => {
    if (hasSearched.value) {
      getDocuments(1)
    }
  }
)

const previousPage = () => {
  if (pagination.value.currentPage > 1) {
    scrollToTop()
    getDocuments(pagination.value.currentPage - 1)
  }
}

const nextPage = () => {
  if (pagination.value.currentPage < pagination.value.lastPage) {
    scrollToTop()
    getDocuments(pagination.value.currentPage + 1)
  }
}

const goToPage = (page) => {
  if (page !== pagination.value.currentPage && page >= 1 && page <= pagination.value.lastPage) {
    scrollToTop()
    getDocuments(page)
  }
}

const formatDateTimeExtended = (dateTimeString) => {
  if (!dateTimeString) return 'Data não informada'

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const diasSemana = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ]

  const data = new Date(dateTimeString)

  const dia = data.getDate()
  const mes = meses[data.getMonth()]
  const ano = data.getFullYear()
  const diaSemana = diasSemana[data.getDay()]
  const horas = String(data.getHours()).padStart(2, '0')
  const minutos = String(data.getMinutes()).padStart(2, '0')

  return `${dia} de ${mes} de ${ano} (${diaSemana}) às ${horas}:${minutos} horas`
}

const formatDate = (dateString) => {
  if (!dateString) return 'Não informado'

  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const getSituacao = (voting_result_1, voting_result_2) => {
  // Se ambos são null → Em tramitação
  if (voting_result_1 === null && voting_result_2 === null) {
    return 'Em tramitação'
  }
  
  // Se apenas voting_result_1 = 1 → Aprovado
  if (voting_result_1 === 1 && (voting_result_2 === null || voting_result_2 === undefined)) {
    return 'Aprovado'
  }
  
  // Se apenas voting_result_1 = 2 → Rejeitado
  if (voting_result_1 === 2 && (voting_result_2 === null || voting_result_2 === undefined)) {
    return 'Rejeitado'
  }
  
  // Se voting_result_1 = 1 e voting_result_2 = 1 → Aprovado
  if (voting_result_1 === 1 && voting_result_2 === 1) {
    return 'Aprovado'
  }
  
  // Se voting_result_1 = 2 e voting_result_2 = 2 → Rejeitado
  if (voting_result_1 === 2 && voting_result_2 === 2) {
    return 'Rejeitado'
  }
  
  // Se voting_result_1 = 1 e voting_result_2 = 2 → Indefinido (tratado como Em tramitação)
  // Se voting_result_1 = 2 e voting_result_2 = 1 → Indefinido (tratado como Em tramitação)
  if ((voting_result_1 === 1 && voting_result_2 === 2) || (voting_result_1 === 2 && voting_result_2 === 1)) {
    return 'Em tramitação'
  }
  
  return 'Em tramitação'
}

const handleSearch = () => {
  getDocuments(1)
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {
    document_category_id: '',
    year: '',
    document_status_movement_id: '',
    situacao: '',
    author_id: ''
  }
  hasSearched.value = false
  getDocuments(1)
}

const goToMateria = (id) => {
  router.push(`/materias-legislativas/${id}`)
}
</script>
