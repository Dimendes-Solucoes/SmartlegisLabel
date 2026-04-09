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
      <h3 class="text-lg font-bold text-gray-900 mb-4">
        Detalhes da Sessão
      </h3>

      <div class="grid grid-cols-2 gap-6 mb-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 flex items-center justify-center rounded-lg" style="background-color: rgba(0, 122, 184, 0.1);">
            <svg class="w-6 h-6" style="color: #007AB8;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-700">Data/hora</p>
            <p class="text-sm text-gray-900">Visualizando Votações</p>
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
        class="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-2">
                Matéria - {{ materia.name }}
              </h3>

              <div class="flex items-center gap-6 text-sm">
                <div>
                  <span class="text-gray-600">Total de votos</span>
                  <span class="ml-2 font-semibold text-gray-900">{{ materia.totals?.total || 0 }}</span>
                </div>
                <div>
                  <span class="text-gray-600">Votos a favor</span>
                  <div class="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ml-2" style="background-color: #10B981;">
                    {{ materia.totals?.a_favor || 0 }}
                  </div>
                </div>
                <div>
                  <span class="text-gray-600">Votos contra</span>
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
              <button
                @click="exportarVotos(materia.id)"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Exportar Votos
              </button>

              <div
                class="px-6 py-3 rounded-lg font-bold text-white text-center min-w-[120px] capitalize"
                :style="{ backgroundColor: (materia.resultado?.toLowerCase() === 'reprovado') ? '#EF4444' : (!materia.resultado || materia.resultado?.toLowerCase() === 'indefinido' ? '#9CA3AF' : '#10B981') }"
              >
                <div class="text-xs mb-1">Resultado</div>
                <div class="text-lg">{{ materia.resultado || 'Aguardando' }}</div>
              </div>
            </div>
          </div>

          <div v-if="materia.votes && materia.votes.length > 0" class="overflow-x-auto">
            <div class="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-100 border-b border-gray-200">
              <div class="col-span-5 text-sm font-medium text-gray-700">Parlamentar</div>
              <div class="col-span-3 text-sm font-medium text-gray-700">Partido</div>
              <div class="col-span-3 text-sm font-medium text-gray-700">Voto</div>
              <div class="col-span-1"></div>
            </div>

            <div
              v-for="voto in getVotosPaginados(materia.id)"
              :key="voto.id"
              class="grid grid-cols-12 gap-4 px-4 py-4 border-b border-gray-200 items-center hover:bg-gray-50 transition-colors"
            >
              <div class="col-span-5 flex items-center gap-3">
                <img :src="getAvatar(voto.user?.path_image, voto.user?.name)" class="w-8 h-8 rounded-full object-cover border border-gray-200" />
                <span class="text-sm text-gray-900">{{ voto.user?.name || 'Não informado' }}</span>
              </div>
              <div class="col-span-3">
                <span class="inline-flex px-3 py-1 rounded-full text-xs font-medium" style="background-color: rgba(0, 122, 184, 0.15); color: #007AB8;">
                  {{ voto.user?.category_party?.name_party || 'Sem Partido' }}
                </span>
              </div>
              <div class="col-span-3">
                <span
                  v-if="voto.vote_category?.name === 'A favor'"
                  class="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white"
                  style="background-color: #10B981;"
                >
                  Favor
                </span>
                <span
                  v-else-if="voto.vote_category?.name === 'Abstenção'"
                  class="inline-flex px-3 py-1 rounded-full text-xs font-medium text-gray-700"
                  style="background-color: #E5E7EB;"
                >
                  Abstenção
                </span>
                <span
                  v-else-if="voto.vote_category?.name === 'Contra'"
                  class="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white"
                  style="background-color: #EF4444;"
                >
                  Contra
                </span>
                <span v-else class="text-gray-500 text-xs">{{ voto.vote_category?.name || 'Não votou' }}</span>
              </div>
              <div class="col-span-1 flex justify-end">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div v-else class="px-4 py-6 text-center text-sm text-gray-500 border-t border-gray-100">
            Esta matéria ainda não possui votos nominais registrados.
          </div>

          <div v-if="materia.votes && materia.votes.length > 0" class="flex items-center justify-between px-4 py-4">
            <div class="text-sm text-gray-600">
              Mostrando {{ getInicioPaginacao(materia.id) }}-{{ getFimPaginacao(materia.id) }} de {{ materia.votes.length }} resultados
            </div>
            
            <div v-if="getTotalPages(materia.id) > 1" class="flex gap-2">
              <button 
                @click="prevPage(materia.id)" 
                :disabled="paginationState[materia.id]?.currentPage === 1"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              <button 
                v-for="page in getVisiblePages(materia.id)" 
                :key="page"
                @click="goToPage(materia.id, page)"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  page === paginationState[materia.id]?.currentPage 
                    ? 'text-white' 
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                ]"
                :style="page === paginationState[materia.id]?.currentPage ? 'background-color: #003d6f;' : ''"
              >
                {{ page }}
              </button>

              <button 
                @click="nextPage(materia.id)" 
                :disabled="paginationState[materia.id]?.currentPage === getTotalPages(materia.id)"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { sessoesService } from '@/services/api' 

const route = useRoute()
const sessaoId = route.params.id
const S3_HOST = import.meta.env.VITE_S3_HOST || '' 

const materias = ref([])
const loading = ref(true)


const fazerDownloadBase64 = (base64String, nomeArquivo, mimeType = 'application/pdf') => {
  try {
    const byteCharacters = atob(base64String)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: mimeType })
    const fileURL = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = fileURL
    link.download = nomeArquivo
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => URL.revokeObjectURL(fileURL), 5000)
  } catch (e) {
    console.error('Erro ao processar download Base64:', e)
    alert('Erro ao processar o arquivo para download.')
  }
}

const getVotosSessao = async () => {
  try {
    loading.value = true
    const response = await sessoesService.buscarVotos(sessaoId)
    
    const payload = response.data?.data || response.data || response
    
    let rawDocuments = []
    
    if (payload?.documents && Array.isArray(payload.documents)) {
      rawDocuments = payload.documents
    } 
    else if (payload?.ordem_do_dia || payload?.expediente) {
      rawDocuments = [
        ...(payload.ordem_do_dia || []),
        ...(payload.expediente || [])
      ]
    }

    const uniqueDocuments = Array.from(new Map(rawDocuments.map(doc => [doc.id, doc])).values())
    
    materias.value = uniqueDocuments

    materias.value.forEach(materia => {
      paginationState.value[materia.id] = {
        currentPage: 1
      }
    })

  } catch (error) {
    console.error('Erro ao buscar votos da sessão:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getVotosSessao()
})


const getAvatar = (caminhoImagem, nome) => {
  if (!caminhoImagem || caminhoImagem === '') {
    const nomeFormatado = encodeURIComponent(nome || 'Parlamentar')
    return `https://ui-avatars.com/api/?name=${nomeFormatado}&background=E5E7EB&color=9CA3AF`
  }
  
  return caminhoImagem;
}

const exportarVotos = async (materiaId) => {
  try {
    const response = await sessoesService.exportarVotosPdf(materiaId);
    const base64String = response.data?.data || response.data;

    if (base64String && (typeof base64String === 'string') && base64String.startsWith('JVBERi')) {
      fazerDownloadBase64(base64String, `votos_materia_${materiaId}.pdf`);
    } else {
      alert('Ocorreu um erro: O formato do arquivo retornado não é um PDF válido.');
      console.error('Resposta inesperada:', response);
    }
  } catch (error) {
    console.error('Erro ao exportar votos:', error);
    alert('Não foi possível gerar o PDF de votos.');
  }
}

const paginationState = ref({})
const itemsPerPage = 5 

const getVotosPaginados = (materiaId) => {
  const materia = materias.value.find(m => m.id === materiaId)
  if (!materia || !materia.votes) return []
  
  const page = paginationState.value[materiaId]?.currentPage || 1
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  
  return materia.votes.slice(start, end)
}

const getTotalPages = (materiaId) => {
  const materia = materias.value.find(m => m.id === materiaId)
  if (!materia || !materia.votes) return 1
  return Math.ceil(materia.votes.length / itemsPerPage) || 1
}

const getInicioPaginacao = (materiaId) => {
  const materia = materias.value.find(m => m.id === materiaId)
  if (!materia || !materia.votes || materia.votes.length === 0) return 0
  const page = paginationState.value[materiaId]?.currentPage || 1
  return ((page - 1) * itemsPerPage) + 1
}

const getFimPaginacao = (materiaId) => {
  const materia = materias.value.find(m => m.id === materiaId)
  if (!materia || !materia.votes) return 0
  const page = paginationState.value[materiaId]?.currentPage || 1
  const fim = page * itemsPerPage
  return fim > materia.votes.length ? materia.votes.length : fim
}

const getVisiblePages = (materiaId) => {
  const pages = []
  const total = getTotalPages(materiaId)
  for (let i = 1; i <= total; i++) {
    pages.push(i)
  }
  return pages
}

const goToPage = (materiaId, page) => {
  if (paginationState.value[materiaId]) {
    paginationState.value[materiaId].currentPage = page
  }
}

const prevPage = (materiaId) => {
  if (paginationState.value[materiaId] && paginationState.value[materiaId].currentPage > 1) {
    paginationState.value[materiaId].currentPage--
  }
}

const nextPage = (materiaId) => {
  if (paginationState.value[materiaId] && paginationState.value[materiaId].currentPage < getTotalPages(materiaId)) {
    paginationState.value[materiaId].currentPage++
  }
}
</script>