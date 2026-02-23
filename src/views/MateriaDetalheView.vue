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
        <li>
          <router-link to="/materias-legislativas" class="hover:text-brand-blue">
            Matérias legislativas
          </router-link>
        </li>
        <li>›</li>
        <li class="text-gray-900 font-medium">Detalhar matéria</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Detalhar matéria</h1>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p class="text-gray-600">Carregando...</p>
      </div>
    </div>

    <div v-else-if="materia" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-xl font-bold mb-4" style="color: #007AB8;">
          {{ materia.document_category?.abbreviation || 'N/A' }}
        </h2>

        <p class="text-sm text-gray-700 mb-6 leading-relaxed">
          {{ materia.name || 'Sem descrição disponível' }}
        </p>

        <div class="grid grid-cols-2 md:grid-cols-6 gap-6 mb-6">
          <div>
            <p class="text-xs text-gray-500 mb-1">Protocolo</p>
            <p class="text-sm font-medium text-gray-900">{{ materia.id || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Data de entrada</p>
            <p class="text-sm font-medium text-gray-900">{{ materia.created_at ? formatDate(materia.created_at) : 'N/A' }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Localização atual</p>
            <p class="text-sm font-medium text-gray-900">{{ getLocalizacao(materia.document_status_movement_id) }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Situação</p>
            <p class="text-sm font-medium text-gray-900">{{ getSituacao(materia) }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Em tramitação?</p>
            <p class="text-sm font-medium text-gray-900">{{ materia.document_status_movement_id != 6 ? 'Sim' : 'Não' }}</p>
          </div>
          <div v-if="materia.authors && materia.authors.length > 0" class="flex items-center gap-2">
            <img
              v-if="materia.authors[0].path_image"
              :src="S3_HOST + materia.authors[0].path_image"
              :alt="materia.authors[0].name"
              class="w-8 h-8 rounded-full object-cover"
            />
            <div v-else class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ materia.authors[0].name || 'Autor' }}</p>
              <p class="text-xs text-gray-500">Autor</p>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <a 
            v-if="materia.attachment"
            :href="S3_HOST + materia.attachment" 
            target="_blank"
            class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            style="background-color: #007AB8;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Matéria em PDF
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Histórico de tramitações -->
      <div v-if="materia.logs && materia.logs.length > 0" class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-bold text-gray-900">Histórico de tramitações</h3>
        </div>

        <div class="overflow-x-auto">
          <div class="grid grid-cols-3 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200">
            <div class="text-sm font-medium text-gray-700">Data</div>
            <div class="text-sm font-medium text-gray-700">Ação</div>
            <div class="text-sm font-medium text-gray-700">Descrição</div>
          </div>

          <div
            v-for="tramitacao in materia.logs"
            :key="tramitacao.id"
            class="grid grid-cols-3 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div class="text-sm text-gray-900">{{ formatDate(tramitacao.created_at) }}</div>
            <div class="text-sm text-gray-900">{{ tramitacao.document_log_title || 'N/A' }}</div>
            <div class="text-sm text-gray-900">{{ tramitacao.document_log_description || 'N/A' }}</div>
          </div>
        </div>
      </div>

      <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-bold text-gray-900">Histórico de tramitações</h3>
        </div>
        <div class="px-6 py-8 text-center text-gray-500">
          Não há tramitações para esse documento ainda
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500">Matéria não encontrada</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { materiasService } from '@/services/api'

const route = useRoute()
const materiaId = route.params.id
const S3_HOST = import.meta.env.VITE_S3_HOST

const materia = ref(null)
const loading = ref(true)

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'

  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const getLocalizacao = (statusId) => {
  const localizacoes = {
    1: 'Secretaria',
    2: 'Sessão',
    3: 'Procurador',
    4: 'Comissão',
    5: 'Sessão',
    6: 'Prefeitura'
  }
  return localizacoes[statusId] || 'N/A'
}

const getSituacao = (materia) => {
  if (materia.is_approved === true) return 'Aprovado'
  if (materia.is_approved === false) return 'Rejeitado'
  if (materia.document_status_movement_id === 2) return 'Em tramitação'
  if (materia.document_status_vote_id) return `Status: ${materia.document_status_vote_id}`
  return 'N/A'
}

const getMateria = async () => {
  try {
    loading.value = true
    const response = await materiasService.buscarPorId(materiaId)
    console.log('Detalhes da matéria:', response.data)
    materia.value = response.data
  } catch (error) {
    console.error('Erro ao buscar matéria:', error)
    materia.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getMateria()
})
</script>
