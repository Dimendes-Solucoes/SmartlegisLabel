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
          <router-link to="/parlamentares" class="hover:text-brand-blue">
            Parlamentares
          </router-link>
        </li>
        <li>›</li>
        <li class="text-gray-900 font-medium">Parlamentar</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Parlamentar</h1>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-500">Carregando...</p>
    </div>

    <div v-else-if="parlamentar" class="rounded-lg shadow-sm p-8 mb-6">
      <div class="flex items-start gap-8 mb-8 bg-gray-100 p-6 rounded-xl">
        <!-- Coluna Esquerda: Foto e Informações -->
        <div class="flex gap-6">
          <div class="flex-shrink-0">
            <img
              :src="parlamentar.path_image ? S3_HOST + parlamentar.path_image : '/images/member-placeholder.jpg'"
              :alt="parlamentar.nickname"
              class="w-64 h-64 rounded-lg object-cover"
            />
          </div>

          <div class="flex flex-col justify-between py-2">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                {{ parlamentar.name }}
              </h2>

              <div class="space-y-3 mb-6">
                <div class="text-sm">
                  <span class="font-semibold text-gray-900">Data de nascimento:</span>
                  <span class="text-gray-700 ml-1">
                    {{ parlamentar.birthdate ? formatDate(parlamentar.birthdate) : 'Não informado' }}
                  </span>
                </div>

                <div class="text-sm">
                  <span class="font-semibold text-gray-900">Mandato atual:</span>
                  <span class="text-gray-700 ml-1">
                    {{ mandatoAtual }}
                  </span>
                </div>

                <div class="text-sm flex items-center gap-2">
                  <span class="font-semibold text-gray-900">Cargo:</span>
                  <span class="px-3 py-1 text-xs font-medium rounded-full text-white" style="background-color: #007AB8;">
                    {{ parlamentar.user_category?.name || 'Não informado' }}
                  </span>
                </div>

                <div class="text-sm">
                  <span class="font-semibold text-gray-900">Partido:</span>
                  <span class="text-gray-700 ml-1">
                    {{ parlamentar?.category_party?.name_party || 'Não informado' }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="parlamentar?.category_party?.logo" class="mt-2">
              <img
                :src="S3_HOST + parlamentar.category_party.logo"
                :alt="`Logo ${parlamentar.category_party.name_party}`"
                class="h-16 object-contain"
              />
            </div>
          </div>
        </div>

        <!-- Divider Vertical -->
        <div class="w-px bg-gray-300 self-stretch mx-4"></div>

        <!-- Coluna Direita: Resumo -->
        <div class="flex-1 py-2">
          <h3 class="text-sm font-semibold text-gray-900 mb-3">Resumo</h3>
          <p class="text-sm text-gray-700 leading-relaxed">
            {{ parlamentar?.summary || 'Não há resumo disponível para este parlamentar.' }}
          </p>
        </div>
      </div>

      <div class="border-b border-gray-200 mb-6">
        <div class="flex gap-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-brand-blue text-brand-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div v-if="activeTab === 'mandatos'">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Mandatos</h3>
        <div v-if="parlamentar.legislatures && parlamentar.legislatures.length > 0" class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Legislatura
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Nº Votos
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Titular?
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Início do mandato
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Fim do mandato
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Relatorias
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="legislatura in parlamentar.legislatures" :key="legislatura.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ legislatura.title || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  00/00/0000
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Sim
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  00/00/0000
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  00/00/0000
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  00/00/0000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          Nenhum mandato encontrado
        </div>
      </div>

      <div v-if="activeTab === 'mesa-diretora'">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Mesa diretora</h3>
        <div class="text-center py-8 text-gray-500">
          Nenhum registro encontrado
        </div>
      </div>

      <div v-if="activeTab === 'comissoes'">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Comissões</h3>
        <div class="text-center py-8 text-gray-500">
          Nenhuma comissão encontrada
        </div>
      </div>

      <div v-if="activeTab === 'proposicoes'">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Proposições</h3>
        
        <div v-if="loadingProposicoes" class="flex items-center justify-center py-20">
          <div class="flex flex-col items-center gap-4">
            <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p class="text-gray-600">Carregando proposições...</p>
          </div>
        </div>

        <div v-else-if="proposicoes.length === 0" class="text-center py-8 text-gray-500">
          Nenhuma proposição encontrada
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="materia in proposicoes"
            :key="materia.id"
            class="bg-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            @click="goToMateria(materia.id)"
          >
            <h4 class="text-lg font-bold text-blue-600 mb-3">
              {{ materia.document_category.abbreviation }}
            </h4>

            <p class="text-sm text-gray-700 mb-4 leading-relaxed">
              {{ materia.name }}
            </p>

            <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">Protocolo</p>
                <p class="text-sm font-medium text-gray-900">{{ materia.id }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Data de entrada</p>
                <p class="text-sm font-medium text-gray-900">{{ formatDate(materia.created_at) }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Localização atual</p>
                <p v-if="materia.document_status_movement_id === 1" class="text-sm font-medium text-gray-900">Secretaria</p>
                <p v-else-if="materia.document_status_movement_id === 2" class="text-sm font-medium text-gray-900">Sessão</p>
                <p v-else-if="materia.document_status_movement_id === 3" class="text-sm font-medium text-gray-900">Procurador</p>
                <p v-else-if="materia.document_status_movement_id === 4" class="text-sm font-medium text-gray-900">Comissão</p>
                <p v-else-if="materia.document_status_movement_id === 5" class="text-sm font-medium text-gray-900">Sessão</p>
                <p v-else-if="materia.document_status_movement_id === 6" class="text-sm font-medium text-gray-900">Prefeitura</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Situação</p>
                <p class="text-sm font-medium text-gray-900">{{ getSituacao(materia.voting_result_1, materia.voting_result_2) }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Em tramitação?</p>
                <p class="text-sm font-medium text-gray-900">{{ materia.document_status_movement_id != 6 ? 'Sim' : 'Não' }}</p>
              </div>
            </div>

            <div class="flex gap-3 justify-end">
              <a 
                v-if="materia.attachment"
                :href="S3_HOST + materia.attachment" 
                target="_blank"
                download
                @click.stop
                class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity inline-flex items-center"
                style="background-color: #007AB8;"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Matéria em PDF
              </a>
            </div>
          </div>

          <!-- Paginação -->
          <div class="flex items-center justify-between pt-4">
            <div class="text-sm text-gray-600">
              Mostrando {{ startItemProposicoes }}-{{ endItemProposicoes }} de {{ paginationProposicoes.total }} resultados
            </div>
            <div class="flex gap-2">
              <!-- Primeira página -->
              <button
                @click="goToPageProposicoes(1)"
                :disabled="paginationProposicoes.currentPage === 1"
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-lg',
                  paginationProposicoes.currentPage === 1
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
                @click="previousPageProposicoes"
                :disabled="paginationProposicoes.currentPage === 1"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg',
                  paginationProposicoes.currentPage === 1
                    ? 'text-gray-400 bg-white border border-gray-300 cursor-not-allowed'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                ]"
              >
                Anterior
              </button>

              <!-- Números das páginas -->
              <button
                v-for="page in visiblePagesProposicoes"
                :key="page"
                @click="goToPageProposicoes(page)"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg',
                  page === paginationProposicoes.currentPage
                    ? 'text-white'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                ]"
                :style="page === paginationProposicoes.currentPage ? 'background-color: #003d6f;' : ''"
              >
                {{ page }}
              </button>

              <!-- Reticências se necessário -->
              <span v-if="showEllipsisProposicoes" class="px-3 py-2 text-gray-500">...</span>

              <!-- Última página (se não estiver visível) -->
              <button
                v-if="shouldShowLastPageProposicoes"
                @click="goToPageProposicoes(paginationProposicoes.lastPage)"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {{ paginationProposicoes.lastPage }}
              </button>

              <!-- Próximo -->
              <button
                @click="nextPageProposicoes"
                :disabled="paginationProposicoes.currentPage === paginationProposicoes.lastPage"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg',
                  paginationProposicoes.currentPage === paginationProposicoes.lastPage
                    ? 'text-gray-400 bg-white border border-gray-300 cursor-not-allowed'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                ]"
              >
                Próximo
              </button>

              <!-- Última página -->
              <button
                @click="goToPageProposicoes(paginationProposicoes.lastPage)"
                :disabled="paginationProposicoes.currentPage === paginationProposicoes.lastPage"
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-lg',
                  paginationProposicoes.currentPage === paginationProposicoes.lastPage
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

      <div v-if="activeTab === 'relatorias'">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Relatorias</h3>
        
        <div v-if="loadingRelatorias" class="flex items-center justify-center py-20">
          <div class="flex flex-col items-center gap-4">
            <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p class="text-gray-600">Carregando dados de relatorias...</p>
          </div>
        </div>

        <div v-else>
          <!-- Cards de Estatísticas -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="rounded-lg p-6" style="background-color: #007AB8;">
              <p class="text-white text-sm mb-2">Total de documentos</p>
              <p class="text-white text-4xl font-bold">{{ relatorias.total }}</p>
              <p class="text-white text-sm">Total</p>
            </div>

            <div class="bg-gray-100 rounded-lg p-6">
              <p class="text-gray-700 text-sm mb-2">Tipo de documento mais produzido</p>
              <p class="text-gray-900 text-4xl font-bold">{{ relatorias.most_sent_category?.total || 0 }}</p>
              <p class="text-gray-700 text-sm">{{ relatorias.most_sent_category?.name || '-' }}</p>
            </div>

            <div class="bg-gray-100 rounded-lg p-6">
              <p class="text-gray-700 text-sm mb-2">Tipo de documento menos produzido</p>
              <p class="text-gray-900 text-4xl font-bold">{{ relatorias.least_sent_category?.total || 0 }}</p>
              <p class="text-gray-700 text-sm">{{ relatorias.least_sent_category?.name || '-' }}</p>
            </div>

            <div class="bg-gray-100 rounded-lg p-6">
              <p class="text-gray-700 text-sm mb-2">Média de documentos criados por parlamentar</p>
              <p class="text-gray-900 text-4xl font-bold">{{ relatorias.average_per_author }}</p>
            </div>
          </div>

          <!-- Ranking do Parlamentar -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Sua colocação no ranking</h3>
            <p class="text-sm text-gray-600 mb-6">Posição do parlamentar entre todos</p>

            <div v-if="relatorias.top_authors && relatorias.top_authors.length > 0" class="space-y-3">
              <div v-for="(item, index) in relatorias.top_authors" :key="index">
                <div class="flex items-center justify-between text-sm mb-1">
                  <span class="text-gray-700">{{ item.rank }}º {{ item.nickname }}</span>
                  <span class="text-gray-900 font-semibold">{{ item.total }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div
                    class="h-3 rounded-full transition-all duration-300"
                    :style="{ width: calculateWidth(item.total) + '%', backgroundColor: '#007AB8' }"
                  ></div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8 text-gray-500">
              Nenhum dado de ranking disponível
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500">Parlamentar não encontrado</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { parlamentaresService, materiasService, relatoriosService } from '@/services/api'

const route = useRoute()
const router = useRouter()
const parlamentarId = route.params.id
const S3_HOST = import.meta.env.VITE_S3_HOST

const parlamentar = ref(null)
const loading = ref(true)
const activeTab = ref('mandatos')

const proposicoes = ref([])
const loadingProposicoes = ref(false)

const relatorias = ref({
  total: 0,
  average_per_author: 0,
  most_sent_category: { total: 0, name: '' },
  least_sent_category: { total: 0, name: '' },
  top_authors: []
})
const loadingRelatorias = ref(false)

const paginationProposicoes = ref({
  currentPage: 1,
  lastPage: 1,
  perPage: 10,
  total: 0
})

const tabs = [
  { id: 'mandatos', label: 'Mandatos' },
  { id: 'mesa-diretora', label: 'Mesa diretora' },
  { id: 'comissoes', label: 'Comissões' },
  { id: 'proposicoes', label: 'Proposições' },
  { id: 'relatorias', label: 'Relatorias' }
]

const mandatoAtual = computed(() => {
  if (!parlamentar.value?.legislatures || parlamentar.value.legislatures.length === 0) {
    return 'Não informado'
  }

  const atual = parlamentar.value.legislatures[0]
  return atual.title || 'Não informado'
})

const startItemProposicoes = computed(() => {
  if (paginationProposicoes.value.total === 0) return 0
  return (paginationProposicoes.value.currentPage - 1) * paginationProposicoes.value.perPage + 1
})

const endItemProposicoes = computed(() => {
  const end = paginationProposicoes.value.currentPage * paginationProposicoes.value.perPage
  return end > paginationProposicoes.value.total ? paginationProposicoes.value.total : end
})

const visiblePagesProposicoes = computed(() => {
  const pages = []
  const current = paginationProposicoes.value.currentPage
  const last = paginationProposicoes.value.lastPage

  pages.push(current)

  for (let i = 1; i <= 3 && current + i <= last; i++) {
    pages.push(current + i)
  }

  return pages
})

const showEllipsisProposicoes = computed(() => {
  const lastVisible = visiblePagesProposicoes.value[visiblePagesProposicoes.value.length - 1]
  return lastVisible < paginationProposicoes.value.lastPage - 1
})

const shouldShowLastPageProposicoes = computed(() => {
  const lastVisible = visiblePagesProposicoes.value[visiblePagesProposicoes.value.length - 1]
  return lastVisible < paginationProposicoes.value.lastPage
})

const maxRankingValue = computed(() => {
  if (!relatorias.value.top_authors || relatorias.value.top_authors.length === 0) {
    return 1
  }
  return Math.max(...relatorias.value.top_authors.map(item => item.total))
})

const calculateWidth = (total) => {
  return (total / maxRankingValue.value) * 100
}

const formatDate = (dateString) => {
  if (!dateString) return 'Não informado'

  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const getSituacao = (voting_result_1, voting_result_2) => {
  // Se ambos são null → Em tramitação
  if (voting_result_1 === null && voting_result_2 === null) {
    return 'Em tramitação'
  }
  
  // Se apenas voting_result_1 = 1 → Aprovado
  if (voting_result_1 === 1 && (voting_result_2 === null || voting_result_2 === undefined)) {
    return 'Aprovado'
  }
  
  // Se apenas voting_result_1 = 2 → Rejeitado
  if (voting_result_1 === 2 && (voting_result_2 === null || voting_result_2 === undefined)) {
    return 'Rejeitado'
  }
  
  // Se voting_result_1 = 1 e voting_result_2 = 1 → Aprovado
  if (voting_result_1 === 1 && voting_result_2 === 1) {
    return 'Aprovado'
  }
  
  // Se voting_result_1 = 2 e voting_result_2 = 2 → Rejeitado
  if (voting_result_1 === 2 && voting_result_2 === 2) {
    return 'Rejeitado'
  }
  
  // Se voting_result_1 = 1 e voting_result_2 = 2 → Indefinido (tratado como Em tramitação)
  // Se voting_result_1 = 2 e voting_result_2 = 1 → Indefinido (tratado como Em tramitação)
  if ((voting_result_1 === 1 && voting_result_2 === 2) || (voting_result_1 === 2 && voting_result_2 === 1)) {
    return 'Em tramitação'
  }
  
  return 'Em tramitação'
}

const getParlamentar = async () => {
  try {
    loading.value = true
    const response = await parlamentaresService.buscarPorId(parlamentarId)
    console.log('Resposta do servidor:', response)
    parlamentar.value = response.user
  } catch (error) {
    console.error('Erro ao buscar parlamentar:', error)
    parlamentar.value = null
  } finally {
    loading.value = false
  }
}

const getProposicoes = async (page = 1) => {
  try {
    loadingProposicoes.value = true
    const params = {
      page,
      per_page: paginationProposicoes.value.perPage,
      authors: [Number(parlamentarId)]
    }

    console.log('📋 Buscando proposições com authors:', params.authors)
    const response = await materiasService.get(params)
    console.log('Proposições encontradas:', response)

    proposicoes.value = response.data
    paginationProposicoes.value = {
      currentPage: response.current_page,
      lastPage: response.last_page,
      perPage: response.per_page,
      total: response.total
    }
  } catch (error) {
    console.error('Erro ao buscar proposições:', error)
    proposicoes.value = []
  } finally {
    loadingProposicoes.value = false
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const previousPageProposicoes = () => {
  if (paginationProposicoes.value.currentPage > 1) {
    scrollToTop()
    getProposicoes(paginationProposicoes.value.currentPage - 1)
  }
}

const nextPageProposicoes = () => {
  if (paginationProposicoes.value.currentPage < paginationProposicoes.value.lastPage) {
    scrollToTop()
    getProposicoes(paginationProposicoes.value.currentPage + 1)
  }
}

const goToPageProposicoes = (page) => {
  if (page !== paginationProposicoes.value.currentPage && page >= 1 && page <= paginationProposicoes.value.lastPage) {
    scrollToTop()
    getProposicoes(page)
  }
}

const goToMateria = (id) => {
  router.push(`/materias-legislativas/${id}`)
}

const getRelatorias = async () => {
  try {
    loadingRelatorias.value = true
    const params = {
      author_id: Number(parlamentarId)
    }

    console.log('📊 Buscando dados de relatorias para autor:', params.author_id)
    const response = await relatoriosService.get(params)
    console.log('Dados de relatorias obtidos:', response.data)
    
    relatorias.value = {
      total: response.data.total || 0,
      average_per_author: response.data.average_per_author || 0,
      most_sent_category: response.data.most_sent_category || { total: 0, name: '' },
      least_sent_category: response.data.least_sent_category || { total: 0, name: '' },
      top_authors: response.data.top_authors || []
    }
  } catch (error) {
    console.error('Erro ao buscar dados de relatorias:', error)
    relatorias.value = {
      total: 0,
      average_per_author: 0,
      most_sent_category: { total: 0, name: '' },
      least_sent_category: { total: 0, name: '' },
      top_authors: []
    }
  } finally {
    loadingRelatorias.value = false
  }
}

// Watch para carregar proposições quando a aba for ativada
watch(activeTab, (newTab) => {
  if (newTab === 'proposicoes' && proposicoes.value.length === 0) {
    getProposicoes()
  }
  if (newTab === 'relatorias' && relatorias.value.total === 0) {
    getRelatorias()
  }
})

onMounted(() => {
  getParlamentar()
})
</script>
