<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <nav class="text-sm mb-6">
      <ol class="flex items-center gap-2 text-gray-600">
        <li><router-link to="/" class="hover:text-brand-blue">Início</router-link></li>
        <li>›</li>
        <li><router-link to="/comissoes" class="hover:text-brand-blue">Comissões</router-link></li>
        <li>›</li>
        <li class="text-gray-900 font-medium">{{ comissao?.comission_name || 'Comissão' }}</li>
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
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ comissao?.comission_name }}</h1>
          <span
            v-if="comissao"
            class="inline-flex mt-2 px-3 py-1 rounded-full text-xs font-medium text-white"
            :style="comissao.is_active ? 'background-color: #10B981;' : 'background-color: #E5E7EB; color: #374151;'"
          >
            {{ comissao.is_active ? 'Ativa' : 'Inativa' }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-4">
        <div class="w-10 h-10 border-4 border-gray-200 border-t-brand-blue rounded-full animate-spin"></div>
        <p class="text-gray-600 text-sm font-medium">Carregando parlamentares...</p>
      </div>
    </div>

    <template v-else>
      <div v-if="parlamentares.length === 0" class="text-center py-12 text-gray-500">
        Nenhum parlamentar encontrado para esta comissão.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MemberCard
          v-for="parlamentar in parlamentares"
          :key="parlamentar.id"
          :member="parlamentar"
          :s3-host="S3_HOST"
          @click="goToParlamentar(parlamentar.id)"
        />
      </div>
    </template>

    <div class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Documentos</h2>

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
              <option v-for="tipo in tiposDocumento" :key="tipo.id" :value="tipo.id">{{ tipo.name }}</option>
            </select>
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div v-if="loadingDocumentos" class="flex items-center justify-center py-12">
        <div class="flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-4 border-gray-200 border-t-brand-blue rounded-full animate-spin"></div>
          <p class="text-gray-600 text-sm font-medium">Carregando documentos...</p>
        </div>
      </div>

      <div v-else>
        <div class="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200">
          <div class="col-span-2 text-sm font-medium text-gray-700">Data</div>
          <div class="col-span-2 text-sm font-medium text-gray-700">Tipo</div>
          <div class="col-span-5 text-sm font-medium text-gray-700">Nome do documento</div>
          <div class="col-span-3 text-right text-sm font-medium text-gray-700 pr-2">Ações</div>
        </div>

        <div
          v-for="item in documentos"
          :key="item.id"
          class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 items-center transition-colors"
        >
          <div class="col-span-2 text-sm text-gray-900">{{ formatDate(item.document.created_at) }}</div>
          <div class="col-span-2 text-sm text-gray-900">{{ item.document?.document_category?.name || item.document_type?.name || '—' }}</div>
          <div class="col-span-5 text-sm text-gray-900">{{ item.document?.name || '—' }}</div>
          <div class="col-span-3 flex justify-end">
            <a
              v-if="item.document?.attachment"
              :href="S3_HOST + item.document.attachment"
              target="_blank"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Baixar PDF
            </a>
            <span v-else class="text-sm text-gray-400">—</span>
          </div>
        </div>

        <div v-if="documentos.length === 0" class="px-6 py-10 text-center text-sm text-gray-500">
          Nenhum documento encontrado para esta comissão.
        </div>

        <div class="flex items-center justify-between mt-6" v-if="paginacaoDocumentos.total > 0">
          <div class="text-sm text-gray-600">
            Mostrando {{ startItemDoc }}-{{ endItemDoc }} de {{ paginacaoDocumentos.total }} resultados
          </div>
          <div class="flex gap-2">
            <button
              @click="goToPageDoc(1)"
              :disabled="paginacaoDocumentos.currentPage === 1"
              class="px-3 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
              title="Primeira página"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <button
              @click="previousPageDoc"
              :disabled="paginacaoDocumentos.currentPage === 1"
              class="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              v-for="page in visiblePagesDoc"
              :key="page"
              @click="goToPageDoc(page)"
              class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors"
              :class="page === paginacaoDocumentos.currentPage ? 'bg-brand-blue text-white border-brand-blue' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'"
            >
              {{ page }}
            </button>
            <span v-if="showEllipsisDoc" class="px-3 py-2 text-gray-500">...</span>
            <button
              v-if="shouldShowLastPageDoc"
              @click="goToPageDoc(paginacaoDocumentos.lastPage)"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {{ paginacaoDocumentos.lastPage }}
            </button>
            <button
              @click="nextPageDoc"
              :disabled="paginacaoDocumentos.currentPage === paginacaoDocumentos.lastPage"
              class="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Próximo
            </button>
            <button
              @click="goToPageDoc(paginacaoDocumentos.lastPage)"
              :disabled="paginacaoDocumentos.currentPage === paginacaoDocumentos.lastPage"
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { comissoesService } from '@/services/api'
import MemberCard from '@/components/MemberCard.vue'

const router = useRouter()
const route = useRoute()
const S3_HOST = import.meta.env.VITE_S3_HOST

const comissao = ref(null)
const loading = ref(true)
const documentos = ref([])
const loadingDocumentos = ref(false)
const tiposDocumento = ref([])

const filters = ref({
  ano: new Date().getFullYear(),
  tipo: ''
})

const paginacaoDocumentos = ref({
  currentPage: 1,
  lastPage: 1,
  perPage: 10,
  total: 0
})

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const list = []
  for (let y = currentYear; y >= 1950; y--) list.push(y)
  return list
})

const startItemDoc = computed(() => {
  if (paginacaoDocumentos.value.total === 0) return 0
  return (paginacaoDocumentos.value.currentPage - 1) * paginacaoDocumentos.value.perPage + 1
})

const endItemDoc = computed(() => {
  const end = paginacaoDocumentos.value.currentPage * paginacaoDocumentos.value.perPage
  return end > paginacaoDocumentos.value.total ? paginacaoDocumentos.value.total : end
})

const visiblePagesDoc = computed(() => {
  const pages = []
  const current = paginacaoDocumentos.value.currentPage
  const last = paginacaoDocumentos.value.lastPage
  pages.push(current)
  for (let i = 1; i <= 3 && current + i <= last; i++) pages.push(current + i)
  return pages
})

const showEllipsisDoc = computed(() => {
  const lastVisible = visiblePagesDoc.value[visiblePagesDoc.value.length - 1]
  return lastVisible < paginacaoDocumentos.value.lastPage - 1
})

const shouldShowLastPageDoc = computed(() => {
  const lastVisible = visiblePagesDoc.value[visiblePagesDoc.value.length - 1]
  return lastVisible < paginacaoDocumentos.value.lastPage
})

const parlamentares = computed(() => comissao.value?.users ?? [])

const getComissao = async () => {
  loading.value = true
  try {
    const response = await comissoesService.get({ ignore_active: 1 })
    const id = parseInt(route.params.id)
    const data = response.data?.data || response.data || []
    comissao.value = data.find(c => c.id === id) ?? null
  } catch (error) {
    console.error('Erro ao buscar comissão:', error)
  } finally {
    loading.value = false
  }
}

const getDocumentos = async (page = 1) => {
  loadingDocumentos.value = true
  try {
    const id = parseInt(route.params.id)
    const params = { page, per_page: paginacaoDocumentos.value.perPage }
    if (filters.value.ano) params.year = filters.value.ano
    if (filters.value.tipo) params.document_type_id = filters.value.tipo

    const response = await comissoesService.getDocuments(id, params)

    if (response.data?.data) {
      documentos.value = response.data.data
      paginacaoDocumentos.value = {
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        perPage: response.data.per_page,
        total: response.data.total
      }
    } else {
      const list = response.data ?? []
      documentos.value = Array.isArray(list) ? list : []
      paginacaoDocumentos.value = {
        currentPage: 1,
        lastPage: 1,
        perPage: documentos.value.length || 10,
        total: documentos.value.length
      }
    }
  } catch (error) {
    console.error('Erro ao buscar documentos da comissão:', error)
    documentos.value = []
  } finally {
    loadingDocumentos.value = false
  }
}

const getTiposDocumento = async () => {
  try {
    const response = await comissoesService.getDocumentTypes()
    tiposDocumento.value = response.data ?? []
  } catch (error) {
    console.error('Erro ao buscar tipos de documento:', error)
  }
}

onMounted(() => {
  getComissao()
  getDocumentos()
  getTiposDocumento()
})

watch(
  () => [filters.value.ano, filters.value.tipo],
  () => { getDocumentos(1) }
)

const previousPageDoc = () => {
  if (paginacaoDocumentos.value.currentPage > 1) getDocumentos(paginacaoDocumentos.value.currentPage - 1)
}
const nextPageDoc = () => {
  if (paginacaoDocumentos.value.currentPage < paginacaoDocumentos.value.lastPage) getDocumentos(paginacaoDocumentos.value.currentPage + 1)
}
const goToPageDoc = (p) => {
  if (p !== paginacaoDocumentos.value.currentPage) getDocumentos(p)
}

const goToParlamentar = (id) => {
  router.push({ name: 'parlamentar-detalhe', params: { id } })
}

const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('pt-BR')
}
</script>