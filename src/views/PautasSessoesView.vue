<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <nav class="text-sm mb-6">
      <ol class="flex items-center gap-2 text-gray-600">
        <li>
          <router-link to="/" class="hover:text-brand-blue">Início</router-link>
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
        <label class="block text-sm font-medium text-gray-700 mb-2">Ano</label>
        <div class="relative">
          <select
            v-model="filters.ano"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue"
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
        <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
        <div class="relative">
          <select
            v-model="filters.tipo"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            <option value="">Selecione</option>
            <option value="ordinaria">Sessão Ordinária</option>
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

    <div v-else>
      <div class="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200">
        <div class="col-span-2 text-sm font-medium text-gray-700">Data</div>
        <div class="col-span-2 text-sm font-medium text-gray-700">Tipo</div>
        <div class="col-span-5 text-sm font-medium text-gray-700">Nome da sessão</div>
        <div class="col-span-3 text-right text-sm font-medium text-gray-700 pr-2">Ações</div>
      </div>

      <div
        v-for="sessao in sessoes"
        :key="sessao.id"
        class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 items-center transition-colors"
      >
        <div class="col-span-2 text-sm text-gray-900">{{ formatDate(sessao.datetime_start) }}</div>
        <div class="col-span-2 text-sm text-gray-900">{{ sessao.session_type?.name || '—' }}</div>
        <div class="col-span-5 text-sm text-gray-900">Pauta da sessão {{ sessao.name }}</div>
        
        <div class="col-span-3 flex justify-end">
          <div class="relative inline-block text-left">
            <button
              @click.stop="toggleDropdown(sessao.id)"
              :disabled="sessao.isExportando"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
            >
              <div v-if="sessao.isExportando" class="w-4 h-4 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exportar
              <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>

            <div 
              v-if="activeDropdown === sessao.id" 
              class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
            >
              <button @click="baixarDocumento(sessao.id, 'pdf')" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50">
                <span class="w-2 h-2 rounded-full bg-red-500"></span> PDF
              </button>
              <button @click="baixarDocumento(sessao.id, 'xlsx')" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50">
                <span class="w-2 h-2 rounded-full bg-green-500"></span> XLSX
              </button>
              <button @click="baixarDocumento(sessao.id, 'txt')" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-gray-400"></span> TXT
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!loading && sessoes.length === 0" class="px-6 py-10 text-center text-sm text-gray-500">
        Nenhuma pauta encontrada.
      </div>
    </div>

    <div class="flex items-center justify-between mt-6">
      <div class="text-sm text-gray-600">
        Mostrando {{ startItem }}-{{ endItem }} de {{ pagination.total }} resultados
      </div>
      <div class="flex gap-2">
        <button
          @click="goToPage(1)"
          :disabled="pagination.currentPage === 1"
          class="px-3 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          title="Primeira página"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        <button
          @click="previousPage"
          :disabled="pagination.currentPage === 1"
          class="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors"
          :class="page === pagination.currentPage ? 'bg-brand-blue text-white border-brand-blue' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'"
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
          class="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Próximo
        </button>

        <button
          @click="goToPage(pagination.lastPage)"
          :disabled="pagination.currentPage === pagination.lastPage"
          class="px-3 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
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
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { sessoesService } from '@/services/api'
import { baixarArquivoViaLink } from '@/utils/file-helper'

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
const activeDropdown = ref(null)

const toggleDropdown = (id) => {
  activeDropdown.value = activeDropdown.value === id ? null : id
}

const closeAllDropdowns = (e) => {
  if (!e.target.closest('.relative')) activeDropdown.value = null
}

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
  for (let year = currentYear; year >= 1950; year--) {
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
    sessoes.value = response.data.map(s => ({ ...s, isExportando: false }))
    
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

const baixarDocumento = async (sessaoId, tipo = 'pdf') => {
  activeDropdown.value = null
  const sessao = sessoes.value.find(s => s.id === sessaoId)
  if (!sessao) return

  sessao.isExportando = true

  try {

    const response = await sessoesService.exportarPauta(sessaoId, tipo) 
    const urlDownload = response.data?.url || response.data
    
    if (!urlDownload) {
       alert(`Não foi possível gerar o link de exportação para ${tipo.toUpperCase()}.`)
       return
    }

    baixarArquivoViaLink(urlDownload)

  } catch (error) {
    console.error(`Erro ao exportar pauta em ${tipo}:`, error)
    alert('Erro ao solicitar o arquivo ao servidor.')
  } finally {
    sessao.isExportando = false
  }
}

onMounted(() => {
  getSessions()
  window.addEventListener('click', closeAllDropdowns)
})

onUnmounted(() => {
  window.removeEventListener('click', closeAllDropdowns)
})

watch(
  () => [filters.value.ano, filters.value.tipo],
  () => { getSessions(1) }
)

const previousPage = () => { if (pagination.value.currentPage > 1) { scrollToTop(); getSessions(pagination.value.currentPage - 1); } }
const nextPage = () => { if (pagination.value.currentPage < pagination.value.lastPage) { scrollToTop(); getSessions(pagination.value.currentPage + 1); } }
const goToPage = (p) => { if (p !== pagination.value.currentPage) { scrollToTop(); getSessions(p); } }
</script>