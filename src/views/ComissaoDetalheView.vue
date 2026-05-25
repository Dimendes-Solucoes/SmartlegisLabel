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

      <div v-if="loadingDocumentos" class="flex items-center justify-center py-12">
        <div class="flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-4 border-gray-200 border-t-brand-blue rounded-full animate-spin"></div>
          <p class="text-gray-600 text-sm font-medium">Carregando documentos...</p>
        </div>
      </div>

      <div v-else-if="documentos.length === 0" class="text-center py-10 text-gray-500">
        Nenhum documento encontrado para esta comissão.
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="item in documentos"
          :key="item.id"
          class="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            {{ item.document?.name || '—' }}
          </h3>

          <div class="flex items-center gap-6 flex-wrap">
            <div>
              <p class="text-xs text-gray-500 mb-1">Data</p>
              <p class="text-sm font-medium text-gray-900">{{ formatDate(item.created_at) }}</p>
            </div>
            <div v-if="item.document?.authors?.length > 0">
              <p class="text-xs text-gray-500 mb-1">Autor(es)</p>
              <p class="text-sm font-medium text-gray-900">
                {{ item.document.authors.map(a => a?.name).filter(Boolean).join(', ') }}
              </p>
            </div>

            <div class="ml-auto flex gap-2 flex-wrap">
              <a
                v-if="item.document?.attachment"
                :href="S3_HOST + item.document.attachment"
                target="_blank"
                class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                style="background-color: #007AB8;"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Documento em PDF
              </a>
              <a
                v-if="item.parecer_pdf"
                :href="S3_HOST + item.parecer_pdf"
                target="_blank"
                class="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2 border"
                style="color: #007AB8; border-color: #007AB8;"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Parecer em PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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

const parlamentares = computed(() => comissao.value?.users ?? [])

const getComissao = async () => {
  loading.value = true
  try {
    const response = await comissoesService.get({
      ignore_active: 1
    })
    const id = parseInt(route.params.id)
    const data = response.data?.data || response.data || []
    comissao.value = data.find(c => c.id === id) ?? null
  } catch (error) {
    console.error('Erro ao buscar comissão:', error)
  } finally {
    loading.value = false
  }
}

const getDocumentos = async () => {
  loadingDocumentos.value = true
  try {
    const id = parseInt(route.params.id)
    const response = await comissoesService.getDocuments(id)
    documentos.value = response.data ?? []
  } catch (error) {
    console.error('Erro ao buscar documentos da comissão:', error)
    documentos.value = []
  } finally {
    loadingDocumentos.value = false
  }
}

onMounted(() => {
  getComissao()
  getDocumentos()
})

const goToParlamentar = (id) => {
  router.push({ name: 'parlamentar-detalhe', params: { id } })
}

const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('pt-BR')
}
</script>