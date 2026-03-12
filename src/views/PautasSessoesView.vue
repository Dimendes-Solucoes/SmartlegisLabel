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
        <li class="text-gray-900 font-medium">Pautas das sessões</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Pautas das sessões</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Ano
        </label>
        <div class="relative">
          <select
            v-model="filters.ano"
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
          Tipo
        </label>
        <div class="relative">
          <select
            v-model="filters.tipo"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="inaugural">Sessão Inaugural</option>
            <option value="ordinaria">Sessão Ordinária</option>
            <option value="extraordinaria">Sessão Extraordinária</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20 mb-8">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p class="text-gray-600">Carregando...</p>
      </div>
    </div>

    <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div class="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200">
        <div class="col-span-2 text-sm font-medium text-gray-700">Data</div>
        <div class="col-span-2 text-sm font-medium text-gray-700">Tipo</div>
        <div class="col-span-6 text-sm font-medium text-gray-700">Nome da sessão</div>
        <div class="col-span-2 text-sm font-medium text-gray-700">Visualizar</div>
      </div>

      <div
        v-for="sessao in sessoes"
        :key="sessao.id"
        class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 items-center transition-colors"
      >
        <div class="col-span-2 text-sm text-gray-900">{{ formatDate(sessao.datetime_start) }}</div>
        <div class="col-span-2 text-sm text-gray-900">{{ sessao.session_type?.name || '—' }}</div>
        <div class="col-span-6 text-sm text-gray-900">Pauta da sessão {{ sessao.name }}</div>
        <div class="col-span-2">
          <a
            :href="sessao.pauta_url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-sm font-medium hover:underline"
            style="color: #007AB8;"
            @click.stop
          >
            Abrir
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      <div v-if="!loading && sessoes.length === 0" class="px-6 py-10 text-center text-sm text-gray-500">
        Nenhuma pauta encontrada.
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="text-sm text-gray-600">
        Mostrando {{ startItem }}-{{ endItem }} de {{ pagination.total }} resultados
      </div>
      <div class="flex gap-2">
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
        <span v-if="showEllipsis" class="px-3 py-2 text-gray-500">...</span>
        <button
          v-if="shouldShowLastPage"
          @click="goToPage(pagination.lastPage)"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {{ pagination.lastPage }}
        </button>
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
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { sessoesService } from '@/services/api'

const filters = ref({
  ano: new Date().getFullYear(),
  tipo: ''
})

const pagination = ref({
  currentPage: 1,
  lastPage: 1,
  perPage: 10,
  total: 0
})

const sessoes = ref([])
const loading = ref(false)
let debounceTimeout = null

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

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const yearList = []
  for (let year = currentYear + 5; year >= 2000; year--) {
    yearList.push(year)
  }
  return yearList
})

const formatDate = (dateTimeString) => {
  if (!dateTimeString) return '—'
  const data = new Date(dateTimeString)
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  return `${dia}/${mes}/${ano}`
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getSessions = async (page = 1) => {
  try {
    loading.value = true
    const params = { page, per_page: pagination.value.perPage }

    if (filters.value.ano) params.year = filters.value.ano
    if (filters.value.tipo) params.session_type_id = filters.value.tipo

    const response = await sessoesService.get(params)
    sessoes.value = response.data
    pagination.value = {
      currentPage: response.current_page,
      lastPage: response.last_page,
      perPage: response.per_page,
      total: response.total
    }
  } catch (error) {
    console.error('Erro ao buscar pautas:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getSessions()
})

watch(
  () => [filters.value.ano, filters.value.tipo],
  () => { getSessions(1) }
)

const previousPage = () => {
  if (pagination.value.currentPage > 1) {
    scrollToTop()
    getSessions(pagination.value.currentPage - 1)
  }
}

const nextPage = () => {
  if (pagination.value.currentPage < pagination.value.lastPage) {
    scrollToTop()
    getSessions(pagination.value.currentPage + 1)
  }
}

const goToPage = (page) => {
  if (page !== pagination.value.currentPage && page >= 1 && page <= pagination.value.lastPage) {
    scrollToTop()
    getSessions(page)
  }
}
</script>
