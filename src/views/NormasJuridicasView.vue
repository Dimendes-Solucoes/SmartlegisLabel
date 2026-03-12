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
        <li class="text-gray-900 font-medium">Normas jurídicas</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Normas jurídicas</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Data de publicação
        </label>
        <div class="relative">
          <input
            type="date"
            v-model="filters.date"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo de norma
        </label>
        <div class="relative">
          <select
            v-model.number="filters.norm_type_id"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option
              v-for="type in normTypes"
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
          Assunto
        </label>
        <div class="relative">
          <select
            v-model.number="filters.norm_subject_id"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option
              v-for="subject in normSubjects"
              :key="subject.id"
              :value="subject.id"
            >
              {{ subject.name }}
            </option>
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
            v-model="filters.is_active"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="true">Em vigor</option>
            <option value="false">Não em vigor</option>
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
            placeholder="Busque pelo número ou nome da norma..."
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

    <div v-else-if="!hasSearched" class="flex flex-col items-center justify-center py-16">
      <img src="/images/empty-normas.svg" alt="Buscar normas" class="w-64 h-64 mb-6" />
      <p class="text-gray-500 text-center">
        Execute uma busca para que o resultado seja carregado.
      </p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="norma in normas"
        :key="norma.id"
        class="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          {{ norma.name }}
        </h3>

        <p class="text-sm text-gray-700 mb-4 leading-relaxed uppercase">
          {{ norma.name }}
        </p>

        <div class="flex items-center gap-6 flex-wrap">
          <div>
            <p class="text-xs text-gray-500 mb-1">Número</p>
            <p class="text-sm font-medium text-gray-900">{{ norma.number }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Data de publicação</p>
            <p class="text-sm font-medium text-gray-900">{{ formatDate(norma.created_at) }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Assunto</p>
            <p class="text-sm font-medium text-gray-900">{{ norma.norm_subject?.name ?? '—' }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Situação</p>
            <span
              class="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white"
              :style="norma.is_active ? 'background-color: #10B981;' : 'background-color: #6B7280;'"
            >
              {{ norma.is_active ? 'Em vigor' : 'Não em vigor' }}
            </span>
          </div>
          <div class="ml-auto">
            <a
              :href="S3_HOST + norma.attachment"
              target="_blank"
              class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              style="background-color: #007AB8;"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Norma em PDF
            </a>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-6">
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
import { normasService } from '@/services/api'

const router = useRouter()

const searchQuery = ref('')
const hasSearched = ref(false)
const loading = ref(false)
const normTypes = ref([])
const normSubjects = ref([])
const S3_HOST = import.meta.env.VITE_S3_HOST
let debounceTimeout = null

const filters = ref({
  date: '',
  norm_type_id: '',
  norm_subject_id: '',
  is_active: ''
})

const pagination = ref({
  currentPage: 1,
  lastPage: 1,
  perPage: 10,
  total: 0
})

const normas = ref([])

onMounted(() => {
  getNormas()
})

const startItem = computed(() => {
  if (pagination.value.total === 0) return 0
  return (pagination.value.currentPage - 1) * pagination.value.perPage + 1
})

const endItem = computed(() => {
  const end = pagination.value.currentPage * pagination.value.perPage
  return end > pagination.value.total ? pagination.value.total : end
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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getTypes = async () => {
  try {
    const response = await normasService.getTypes()
    normTypes.value = response.data
  } catch (error) {
    console.error('Erro ao buscar tipos de norma:', error)
  }
}

const getSubjects = async () => {
  try {
    const response = await normasService.getSubjects()
    normSubjects.value = response.data
  } catch (error) {
    console.error('Erro ao buscar assuntos de norma:', error)
  }
}

const getNormas = async (page = 1) => {
  try {
    loading.value = true

    const params = {
      page,
      per_page: pagination.value.perPage
    }

    if (searchQuery.value) {
      params.search = searchQuery.value
    }
    if (filters.value.date) {
      params.date = filters.value.date
    }
    if (filters.value.norm_type_id) {
      params.norm_type_id = filters.value.norm_type_id
    }
    if (filters.value.norm_subject_id) {
      params.norm_subject_id = filters.value.norm_subject_id
    }
    if (filters.value.is_active !== '') {
      params.is_active = filters.value.is_active
    }

    const response = await normasService.get(params)

    normas.value = response.data
    pagination.value = {
      currentPage: response.current_page,
      lastPage: response.last_page,
      perPage: response.per_page,
      total: response.total
    }
    hasSearched.value = true
  } catch (error) {
    console.error('Erro ao buscar normas:', error)
    normas.value = []
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
      getNormas(1)
    }
  }, 500)
})

watch(
  () => [filters.value.date, filters.value.norm_type_id, filters.value.norm_subject_id, filters.value.is_active],
  () => {
    if (hasSearched.value) {
      getNormas(1)
    }
  }
)

const handleSearch = () => {
  getNormas(1)
}

const clearFilters = () => {
  filters.value = {
    date: '',
    norm_type_id: '',
    norm_subject_id: '',
    is_active: ''
  }
  searchQuery.value = ''
  hasSearched.value = false
  normas.value = []
}

const previousPage = () => {
  if (pagination.value.currentPage > 1) {
    scrollToTop()
    getNormas(pagination.value.currentPage - 1)
  }
}

const nextPage = () => {
  if (pagination.value.currentPage < pagination.value.lastPage) {
    scrollToTop()
    getNormas(pagination.value.currentPage + 1)
  }
}

const goToPage = (page) => {
  if (page !== pagination.value.currentPage && page >= 1 && page <= pagination.value.lastPage) {
    scrollToTop()
    getNormas(page)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Não informado'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}
</script>
