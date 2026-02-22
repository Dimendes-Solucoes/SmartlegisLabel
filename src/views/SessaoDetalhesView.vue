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
          <router-link to="/sessao-plenaria" class="hover:text-brand-blue">
            Sessão plenária
          </router-link>
        </li>
        <li>›</li>
        <li class="text-gray-900 font-medium">Detalhar sessão</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Detalhar sessão</h1>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-500">Carregando...</p>
    </div>

    <div v-else-if="sessao" class="space-y-6">
      <div class="bg-gray-50 rounded-lg p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4">
          {{ sessao.name }}
        </h3>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-8">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 flex items-center justify-center rounded-lg" style="background-color: rgba(0, 122, 184, 0.1);">
                <svg class="w-6 h-6" style="color: #007AB8;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Data/hora</p>
                <p class="text-sm text-gray-900">{{ formatDateTimeExtended(sessao.datetime_start) }}</p>
              </div>
            </div>
            
            <div>
              <p class="text-sm font-medium text-gray-700">Encerramento</p>
              <p class="text-sm text-gray-900">{{ sessao.datetime_end ? formatDate(sessao.datetime_end) : 'Não informado' }}</p>
            </div>
          </div>

          <div class="flex gap-3 flex-wrap">
            <button class="px-4 py-2 rounded-lg text-sm font-medium bg-white border hover:bg-gray-50 transition-colors flex items-center gap-2" style="cursor:not-allowed; color: #3e4345; border-color: #3e4345;" disabled>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Gravação
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button 
              @click="goToVotacao"
              class="px-4 py-2 rounded-lg text-sm font-medium bg-white border hover:bg-gray-50 transition-colors flex items-center gap-2" 
              style="color: #007AB8; border-color: #007AB8;"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Votação
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button class="px-4 py-2 rounded-lg text-sm font-medium bg-white border hover:bg-gray-50 transition-colors flex items-center gap-2" style="color: #007AB8; border-color: #007AB8;">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ata
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style="background-color: #007AB8;">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Pauta
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Oradores Inscritos no Expediente -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">Oradores Inscritos no Expediente</h2>
        
        <div v-if="sessao.speakers && sessao.speakers.length > 0" class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ordem</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Parlamentar</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Partido</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(orador, index) in sessao.speakers" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <img 
                      v-if="orador.user?.path_image"
                      :src="S3_HOST + orador.user.path_image" 
                      :alt="orador.user.nickname"
                      class="w-8 h-8 rounded-full object-cover"
                    />
                    <div v-else class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-sm text-gray-900">{{ orador.user?.name || 'Orador' }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 text-xs font-medium rounded-full" style="background-color: rgba(0, 122, 184, 0.15); color: #007AB8;">
                    {{ orador.user?.category_party?.name_party || 'N/A' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          Nenhum orador inscrito
        </div>
      </div>

      <!-- Matérias da ordem do dia -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">Matérias da ordem do dia</h2>

        <div v-if="sessao.documents && sessao.documents.length > 0" class="space-y-4">
          <div
            v-for="materia in sessao.documents"
            :key="materia.id"
            class="bg-gray-100 rounded-xl p-4"
          >
            <h3 class="text-base font-bold mb-2" style="color: #007AB8;">
              {{ materia.document_category.abbreviation || 'N/A' }}
            </h3>

            <p class="text-sm text-gray-700 mb-4">
              {{ materia.name || 'Sem descrição disponível' }}
            </p>

            <div class="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm mb-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">Protocolo</p>
                <p class="font-medium text-gray-900">{{ materia.id || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Data de entrada</p>
                <p class="font-medium text-gray-900">{{ materia.created_at ? formatDate(materia.created_at) : 'N/A' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Localização atual</p>
                <p class="font-medium text-gray-900">{{ materia.document_status_movement.name || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Situação</p>
                <p class="font-medium text-gray-900">{{ materia.document_status_vote.name || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Em tramitação?</p>
                <p class="font-medium text-gray-900">{{ materia.document_status_movement.name === 'prefeitura' ? 'Não' : 'Sim' }}</p>
              </div>
              <div class="flex items-center gap-3">
                <div v-for="autor in materia.authors" :key="autor" class="flex items-center gap-3">
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

            <div class="flex items-center justify-end">

            <a :href="S3_HOST + materia.attachment" target="_blank">
              <div class="flex gap-3">
                <button class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style="background-color: #007AB8;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Matéria em PDF
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
              </a>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          Nenhuma matéria na ordem do dia
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500">Sessão não encontrada</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sessoesService } from '@/services/api'

const route = useRoute()
const router = useRouter()
const sessaoId = route.params.id
const S3_HOST = import.meta.env.VITE_S3_HOST

const sessao = ref(null)
const loading = ref(true)

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

const getSessao = async () => {
  try {
    loading.value = true
    const response = await sessoesService.buscarPorId(sessaoId)
    console.log('Detalhes da sessão:', response.data)
    sessao.value = response.data
  } catch (error) {
    console.error('Erro ao buscar sessão:', error)
    sessao.value = null
  } finally {
    loading.value = false
  }
}

const goToVotacao = () => {
  router.push(`/sessao-plenaria/${sessaoId}/votacao`)
}

onMounted(() => {
  getSessao()
})
</script>
