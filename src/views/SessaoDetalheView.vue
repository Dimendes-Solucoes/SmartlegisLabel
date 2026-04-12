<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <nav class="text-sm mb-6">
      <ol class="flex items-center gap-2 text-gray-600">
        <li>
          <router-link to="/" class="hover:text-brand-blue">Início</router-link>
        </li>
        <li>›</li>
        <li>
          <router-link to="/sessao-plenaria" class="hover:text-brand-blue">Sessão plenária</router-link>
        </li>
        <li>›</li>
        <li>
          <router-link to="/sessao-plenaria" class="hover:text-brand-blue">Detalhar sessão</router-link>
        </li>
        <li>›</li>
        <li class="text-gray-900 font-medium">Votação</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Votação</h1>
      </div>
    </div>

    <div class="bg-gray-50 rounded-lg p-6 mb-8">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Detalhes da Sessão</h3>
      <div class="grid grid-cols-1 gap-6">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 flex items-center justify-center rounded-lg" style="background-color: rgba(0, 122, 184, 0.1);">
            <svg class="w-6 h-6" style="color: #007AB8;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-700">Modo de Visualização</p>
            <p class="text-sm text-gray-900">Visualizando Votações Nominais</p>
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-xl font-bold text-gray-900 mb-6">Votação nominal das matérias na ordem do dia</h2>

    <div v-if="loading" class="flex items-center justify-center py-20 mb-8">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p class="text-gray-600">Buscando votos da sessão...</p>
      </div>
    </div>

    <div v-else class="space-y-6">
      <div v-if="materias.length === 0" class="bg-white rounded-lg p-10 text-center text-gray-500 shadow-sm">
        Nenhum documento registrado para esta sessão ainda.
      </div>

      <div
        v-for="materia in materias"
        :key="materia.id"
        class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
      >
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-2">Matéria - {{ materia.name }}</h3>

              <div class="flex items-center gap-6 text-sm">
                <div>
                  <span class="text-gray-600">Total</span>
                  <span class="ml-2 font-semibold text-gray-900">{{ materia.totals?.total || 0 }}</span>
                </div>
                <div>
                  <span class="text-gray-600">Favor</span>
                  <div class="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ml-2" style="background-color: #10B981;">
                    {{ materia.totals?.a_favor || 0 }}
                  </div>
                </div>
                <div>
                  <span class="text-gray-600">Contra</span>
                  <div class="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ml-2" style="background-color: #EF4444;">
                    {{ materia.totals?.contra || 0 }}
                  </div>
                </div>
                <div>
                  <span class="text-gray-600">Abstenção</span>
                  <span class="ml-2 font-semibold text-gray-900">{{ materia.totals?.abstencao || 0 }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="relative">
                <button
                  @click.stop="toggleDropdown(materia.id)"
                  :disabled="materia.isExportando"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
                >
                  <div v-if="materia.isExportando" class="w-4 h-4 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Exportar
                  <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>

                <div v-if="activeDropdown === materia.id" class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                  <button @click="handleExport(materia.id, 'pdf')" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 border-b border-gray-50 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-red-500"></span> PDF
                  </button>
                  <button @click="handleExport(materia.id, 'csv')" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 border-b border-gray-50 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-green-500"></span> CSV 
                  </button>
                  <button @click="handleExport(materia.id, 'txt')" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-gray-400"></span> TXT
                  </button>
                </div>
              </div>

              <div
                class="px-6 py-3 rounded-lg font-bold text-white text-center min-w-[120px] capitalize"
                :style="{ backgroundColor: (materia.resultado?.toLowerCase() === 'reprovado') ? '#EF4444' : (!materia.resultado || materia.resultado?.toLowerCase() === 'indefinido' ? '#9CA3AF' : '#10B981') }"
              >
                <div class="text-xs mb-1">Resultado</div>
                <div class="text-lg">{{ materia.resultado || 'Aguardando' }}</div>
              </div>
            </div>
          </div>

          <div v-if="materia.votes && materia.votes.length > 0" class="overflow-x-auto border rounded-lg">
            <div class="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 font-medium text-gray-700 text-sm">
              <div class="col-span-6">Parlamentar</div>
              <div class="col-span-3">Partido</div>
              <div class="col-span-3">Voto</div>
            </div>

            <div
              v-for="voto in getVotosPaginados(materia.id)"
              :key="voto.id"
              class="grid grid-cols-12 gap-4 px-4 py-4 border-t border-gray-100 items-center hover:bg-gray-50 transition-colors"
            >
              <div class="col-span-6 flex items-center gap-3">
                <img :src="getAvatarUrl(voto.user?.path_image, voto.user?.name)" class="w-8 h-8 rounded-full object-cover border border-gray-200" />
                <span class="text-sm text-gray-900 font-medium">{{ voto.user?.name || 'Não informado' }}</span>
              </div>
              <div class="col-span-3">
                <span class="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-brand-blue border border-blue-100">
                  {{ voto.user?.category_party?.name_party || 'Sem Partido' }}
                </span>
              </div>
              <div class="col-span-3">
                <span v-if="voto.vote_category?.name === 'A favor'" class="px-3 py-1 rounded-full text-xs font-medium text-white bg-emerald-500">Favor</span>
                <span v-else-if="voto.vote_category?.name === 'Contra'" class="px-3 py-1 rounded-full text-xs font-medium text-white bg-rose-500">Contra</span>
                <span v-else class="px-3 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-200">Abstenção</span>
              </div>
            </div>
          </div>
          
          <div v-else class="px-4 py-10 text-center text-sm text-gray-500 border-t border-gray-100 bg-gray-50/50">
            Esta matéria ainda não possui votos nominais registrados.
          </div>

          <div v-if="materia.votes && materia.votes.length > 0" class="flex items-center justify-between px-4 py-4 border-t border-gray-100 bg-white">
            <div class="text-sm text-gray-600">
              Mostrando {{ getInicioPaginacao(materia.id) }}-{{ getFimPaginacao(materia.id) }} de {{ materia.votes.length }}
            </div>
            
            <div v-if="getTotalPages(materia.id) > 1" class="flex gap-1">
              <button @click="prevPage(materia.id)" :disabled="paginationState[materia.id]?.currentPage === 1" class="p-2 border rounded-lg disabled:opacity-30">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              
              <button 
                v-for="page in getVisiblePages(materia.id)" 
                :key="page"
                @click="goToPage(materia.id, page)"
                class="px-3 py-1 rounded-lg text-sm border"
                :class="page === paginationState[materia.id]?.currentPage ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white hover:bg-gray-50 text-gray-700'"
              >
                {{ page }}
              </button>

              <button @click="nextPage(materia.id)" :disabled="paginationState[materia.id]?.currentPage === getTotalPages(materia.id)" class="p-2 border rounded-lg disabled:opacity-30">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { sessoesService } from '@/services/api' 
import { getAvatarUrl } from '@/utils/image-url'
import { fazerDownloadBase64, gerarNomeArquivo } from '@/utils/file-helper'

const route = useRoute()
const sessaoId = route.params.id

const materias = ref([])
const loading = ref(true)
const activeDropdown = ref(null)
const paginationState = ref({})
const itemsPerPage = 5 

const toggleDropdown = (materiaId) => {
  activeDropdown.value = activeDropdown.value === materiaId ? null : materiaId
}

const closeAllDropdowns = (e) => {
  if (!e.target.closest('.relative')) activeDropdown.value = null
}

const handleExport = async (materiaId, type) => {
  activeDropdown.value = null
  const materia = materias.value.find(m => m.id === materiaId)
  if (!materia) return

  try {
    materia.isExportando = true
    const response = await sessoesService.exportarVotos(sessaoId, materiaId, type)
    const base64String = response.data?.data || response.data
    
    if (base64String) {
      const mimeTypes = {
        pdf: 'application/pdf',
        csv: 'text/csv',
        txt: 'text/plain'
      }

      const nomeDoArquivo = gerarNomeArquivo('votos', materia.name, type)
      fazerDownloadBase64(base64String, nomeDoArquivo, mimeTypes[type])
    }
  } catch (error) {
    console.error('Erro ao exportar:', error)
    alert('Erro ao gerar exportação.')
  } finally {
    materia.isExportando = false
  }
}

const getVotosSessao = async () => {
  try {
    loading.value = true
    const response = await sessoesService.buscarVotos(sessaoId)
    const payload = response.data?.data || response.data || response
    
    let rawDocs = []
    if (payload?.documents) rawDocs = payload.documents
    else if (payload?.ordem_do_dia || payload?.expediente) {
      rawDocs = [...(payload.ordem_do_dia || []), ...(payload.expediente || [])]
    }

    const uniqueDocs = Array.from(new Map(rawDocs.map(doc => [doc.id, doc])).values())
    
    materias.value = uniqueDocs.map(m => ({
      ...m,
      isExportando: false
    }))

    materias.value.forEach(m => {
      paginationState.value[m.id] = { currentPage: 1 }
    })
  } catch (error) {
    console.error('Erro ao buscar votos:', error)
  } finally {
    loading.value = false
  }
}

const getVotosPaginados = (mId) => {
  const m = materias.value.find(x => x.id === mId)
  if (!m?.votes) return []
  const page = paginationState.value[mId]?.currentPage || 1
  return m.votes.slice((page - 1) * itemsPerPage, page * itemsPerPage)
}

const getTotalPages = (mId) => {
  const m = materias.value.find(x => x.id === mId)
  return m?.votes ? Math.ceil(m.votes.length / itemsPerPage) : 1
}

const getInicioPaginacao = (mId) => {
  const page = paginationState.value[mId]?.currentPage || 1
  return ((page - 1) * itemsPerPage) + 1
}

const getFimPaginacao = (mId) => {
  const m = materias.value.find(x => x.id === mId)
  const page = paginationState.value[mId]?.currentPage || 1
  return Math.min(page * itemsPerPage, m?.votes?.length || 0)
}

const getVisiblePages = (mId) => {
  const total = getTotalPages(mId)
  return Array.from({ length: total }, (_, i) => i + 1)
}

const goToPage = (mId, p) => { if (paginationState.value[mId]) paginationState.value[mId].currentPage = p }
const prevPage = (mId) => { if (paginationState.value[mId]?.currentPage > 1) paginationState.value[mId].currentPage-- }
const nextPage = (mId) => { if (paginationState.value[mId]?.currentPage < getTotalPages(mId)) paginationState.value[mId].currentPage++ }

onMounted(() => {
  getVotosSessao()
  window.addEventListener('click', closeAllDropdowns)
})

onUnmounted(() => {
  window.removeEventListener('click', closeAllDropdowns)
})
</script>

<style scoped>
.relative {
  position: relative;
}
</style>