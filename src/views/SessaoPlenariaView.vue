<template>
  <div class="max-w-7xl mx-auto px-6 py-8 relative">
    <nav class="text-sm mb-6">
      <ol class="flex items-center gap-2 text-gray-600">
        <li>
          <router-link to="/" class="hover:text-brand-blue">
            Início
          </router-link>
        </li>
        <li>›</li>
        <li class="text-gray-900 font-medium">Sessões plenárias</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Sessões plenárias</h1>
      </div>
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Buscar por nome da sessão
      </label>
      <div class="relative">
        <input
          type="text"
          v-model="filters.name"
          placeholder="Digite o nome da sessão..."
          class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent pl-10"
        />
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          Mês
        </label>
        <div class="relative">
          <select
            v-model="filters.mes"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
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
              <option :value="1">Ordinária</option>
              <option :value="2">Extraordinária</option>
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

    <div v-else class="space-y-6 mb-8">
      <div
        v-for="sessao in sessoes"
        :key="sessao.id"
        @click="goToDetalhes(sessao.id)"
        class="bg-gray-100 rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow"
      >
        <h3 class="text-lg font-bold text-gray-900 mb-4">
          {{ sessao.name }}
        </h3>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 flex items-center justify-center rounded-lg" style="background-color: rgba(0, 122, 184, 0.1);">
              <svg class="w-6 h-6" style="color: #007AB8;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-900">{{ formatDateTimeExtended(sessao.datetime_start) }}</p>
            </div>
          </div>

          <div class="flex gap-3 flex-wrap items-center">
            <button @click.stop class="px-4 py-2 rounded-lg text-sm font-medium bg-white border hover:bg-gray-50 transition-colors flex items-center gap-2" style="cursor: not-allowed; color: #007AB8; border-color: #007AB8;" disabled>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Gravação
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button
              @click.stop="goToVotacao(sessao.id)"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border',
                hasVotacao(sessao) ? 'text-white hover:opacity-90' : 'bg-white hover:bg-gray-50'
              ]"
              :style="hasVotacao(sessao) ? 'background-color: #007AB8; border-color: #007AB8;' : 'color: #007AB8; border-color: #007AB8;'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Votação
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            
            <button 
              @click.stop="baixarAta(sessao)"
              :disabled="sessao.isCarregandoAta"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border',
                hasAta(sessao) ? 'text-white hover:opacity-90' : 'bg-white hover:bg-gray-50'
              ]"
              :style="hasAta(sessao) ? 'background-color: #007AB8; border-color: #007AB8;' : 'color: #007AB8; border-color: #007AB8;'"
            >
              <div v-if="sessao.isCarregandoAta" :class="['w-4 h-4 border-2 border-t-transparent rounded-full animate-spin', hasAta(sessao) ? 'border-white' : 'border-[#007AB8]']"></div>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ata
              <svg v-if="!sessao.isCarregandoAta" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>

            <div class="relative inline-block text-left">
              <button 
                @click.stop="toggleDropdown(sessao.id)"
                :disabled="sessao.isCarregandoPauta"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border',
                  hasPauta(sessao) ? 'text-white hover:opacity-90' : 'bg-white hover:bg-gray-50'
                ]"
                :style="hasPauta(sessao) ? 'background-color: #007AB8; border-color: #007AB8;' : 'color: #007AB8; border-color: #007AB8;'"
              >
                <div v-if="sessao.isCarregandoPauta" :class="['w-4 h-4 border-2 border-t-transparent rounded-full animate-spin', hasPauta(sessao) ? 'border-white' : 'border-[#007AB8]']"></div>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Pauta
                <svg v-if="!sessao.isCarregandoPauta" class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div 
                v-if="activeDropdown === sessao.id" 
                class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
              >
                <button @click.stop="baixarPauta(sessao, 'pdf')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50">
                  <span class="w-2 h-2 rounded-full bg-red-500"></span> PDF
                </button>
                <button @click.stop="baixarPauta(sessao, 'xlsx')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50">
                  <span class="w-2 h-2 rounded-full bg-green-500"></span> XLSX
                </button>
                <button @click.stop="baixarPauta(sessao, 'txt')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-400"></span> TXT
                </button>
              </div>
            </div>
          </div>
        </div>
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
    <AppToast 
      :show="toast.show" 
      :message="toast.message" 
      @close="toast.show = false" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { sessoesService } from '@/services/api'
import { convertToS3Url } from '@/utils/image-url'
import { baixarArquivoViaLink } from '@/utils/file-helper'
import AppToast from '@/components/AppToast.vue'

const S3_HOST = import.meta.env.VITE_S3_HOST || ''
const router = useRouter()
const toast = ref({ show: false, message: '' })
let toastTimeout = null

const showToast = (message) => {
  toast.value.message = message
  toast.value.show = true
  
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.value.show = false
  }, 4000) 
}

const filters = ref({
  name: '',
  ano: 2026,
  mes: '',
  tipo: 1
})

const pagination = ref({
  currentPage: 1,
  lastPage: 1,
  perPage: 10,
  total: 0
})

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
  const startYear = 1950
  const yearList = []

  for (let year = currentYear; year >= startYear; year--) {
    yearList.push(year)
  }

  return yearList
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  getSessions()
  window.addEventListener('click', closeAllDropdowns)
})

onUnmounted(() => {
  window.removeEventListener('click', closeAllDropdowns)
  if (toastTimeout) clearTimeout(toastTimeout)
})

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

const hasAta = (sessao) => {
  return sessao.atas_count > 0;
}

const hasPauta = (sessao) => {
  return sessao.pautas_count > 0;
}

  // se quiser que o botão de votação fique azul APENAS se  os vereadores já tiverem de fato votado em algo,
  // troque para:
  // return sessao.votos_count > 0;
const hasVotacao = (sessao) => {
  return sessao.pautas_count > 0;
}

const sessoes = ref([])
const loading = ref(false)
let debounceTimeout = null

const getSessions = async (page = 1) => {
  try {
    loading.value = true
    const params = {
      page,
      per_page: pagination.value.perPage
    }

    if (filters.value.name) params.name = filters.value.name
    if (filters.value.ano) params.year = filters.value.ano
    if (filters.value.mes) params.month = filters.value.mes
    if (filters.value.tipo) params.session_type_id = filters.value.tipo

    const response = await sessoesService.get(params)

    sessoes.value = response.data.map(sessao => ({
      ...sessao,
      isCarregandoAta: false,
      isCarregandoPauta: false
    }))
    
    pagination.value = {
      currentPage: response.current_page,
      lastPage: response.last_page,
      perPage: response.per_page,
      total: response.total
    }
  } catch (error) {
    console.error('Erro ao buscar sessões:', error)
  } finally {
    loading.value = false
  }
}

const baixarAta = async (sessao) => {
  try {
    sessao.isCarregandoAta = true
    const response = await sessoesService.buscarDocumentos(sessao.id, 7) 

    const documentoInfo = response.data?.data?.[0] || response.data?.[0] || response.data?.data || response.data
    const caminhoArquivo = documentoInfo?.attachment
    
    if (!caminhoArquivo) {
       showToast('Esta sessão não possui o arquivo da Ata vinculado.')
       return
    }

    const urlCompleta = convertToS3Url(caminhoArquivo)
    window.open(urlCompleta, '_blank')
    
  } catch (error) {
    console.error('Erro ao abrir a Ata:', error)
    showToast('Não foi possível acessar a Ata no momento.')
  } finally {
    sessao.isCarregandoAta = false
  }
}

const baixarPauta = async (sessao, tipo = 'pdf') => {
  activeDropdown.value = null 
  try {
    sessao.isCarregandoPauta = true
    
    const response = await sessoesService.exportarPauta(sessao.id, tipo)
    
    const urlDownload = response.data?.data || response.data?.url || response.data
    
    if (!urlDownload || typeof urlDownload !== 'string') {
       showToast(`Esta sessão ainda não possui pauta em ${tipo.toUpperCase()}.`)
       return
    }

    window.open(urlDownload, '_blank')
    
  } catch (error) {
    console.error('Erro ao baixar a Pauta:', error)
    showToast('Não foi possível gerar a Pauta no momento.')
  } finally {
    sessao.isExportando = false 
    sessao.isCarregandoPauta = false
  }
}

watch(() => filters.value.name, () => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => { getSessions(1) }, 500)
})

watch(
  () => [filters.value.ano, filters.value.mes, filters.value.tipo],
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

const goToDetalhes = (id) => {
  router.push(`/sessao-plenaria/${id}`)
}

const goToVotacao = (id) => {
  router.push(`/sessao-plenaria/${id}/votacao`)
}
</script>