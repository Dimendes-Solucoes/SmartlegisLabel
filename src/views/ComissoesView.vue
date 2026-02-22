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
        <li class="text-gray-900 font-medium">Comissões</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Comissões</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-end">
      <div class="md:col-span-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Buscar
        </label>
        <div class="flex gap-2">
          <div class="relative flex-1">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Busque pela comissão ou sigla..."
              class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>
          <button
            @click="handleSearch"
            class="px-6 py-2.5 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            style="background-color: #007AB8;"
          >
            Buscar
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Situação
        </label>
        <div class="relative">
          <select
            v-model="selectedSituacao"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            v-model="showExtintas"
            class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          <span class="text-sm font-medium text-gray-700">
            Exibir comissões extintas?
          </span>
        </label>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div class="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200">
        <div class="col-span-5 text-sm font-medium text-gray-700">Comissão</div>
        <div class="col-span-3 text-sm font-medium text-gray-700">Sigla</div>
        <div class="col-span-3 text-sm font-medium text-gray-700">Situação</div>
        <div class="col-span-1"></div>
      </div>

      <div
        v-for="comissao in paginatedComissoes"
        :key="comissao.id"
        class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 items-center cursor-pointer transition-colors"
        @click="goToComissao(comissao.id)"
      >
        <div class="col-span-5 text-sm text-gray-900">{{ comissao.nome }}</div>
        <div class="col-span-3 text-sm text-gray-600">{{ comissao.sigla }}</div>
        <div class="col-span-3">
          <span
            v-if="comissao.situacao === 'Ativo'"
            class="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white"
            style="background-color: #10B981;"
          >
            Ativo
          </span>
          <span
            v-else
            class="inline-flex px-3 py-1 rounded-full text-xs font-medium text-gray-700"
            style="background-color: #E5E7EB;"
          >
            Inativa
          </span>
        </div>
        <div class="col-span-1 flex justify-end">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-600">Mostrando</span>
        <select
          v-model="perPage"
          class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
        >
          <option :value="10">1-10</option>
          <option :value="20">1-20</option>
          <option :value="50">1-50</option>
        </select>
        <span class="text-sm text-gray-600">de {{ totalItems }} resultados</span>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg',
            currentPage === page
              ? 'bg-brand-dark-blue-legis text-white'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ page }}
        </button>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { comissoesService } from '@/services/api'

const router = useRouter()

const searchQuery = ref('')
const selectedSituacao = ref('')
const showExtintas = ref(false)
const currentPage = ref(1)
const perPage = ref(10)

const getComissoes = async () => {
  try {
    const response = await comissoesService.listar({
      search: searchQuery.value,
      situacao: selectedSituacao.value,
      showExtintas: showExtintas.value
    })
    comissoes.value = response.data
  } catch (error) {
    console.error('Erro ao buscar comissões:', error)
  }
}

onMounted(() => {
  getComissoes()
})

const comissoes = ref([
  { id: 1, nome: 'Comissão de Saúde, Seguridade e Bem-Estar', sigla: 'AAAAA', situacao: 'Ativo' },
  { id: 2, nome: 'Comissão de Planejamento, Uso e Ocupação', sigla: 'AAAAA', situacao: 'Ativo' },
  { id: 3, nome: 'Comissão de Educação', sigla: 'AAAAA', situacao: 'Ativo' },
  { id: 4, nome: 'Comissão de Educação', sigla: 'AAAAA', situacao: 'Ativo' },
  { id: 5, nome: 'Comissão de Educação', sigla: 'AAAAA', situacao: 'Ativo' },
  { id: 6, nome: 'Comissão de Educação', sigla: 'AAAAA', situacao: 'Ativo' },
  { id: 7, nome: 'Comissão de Educação', sigla: 'AAAAA', situacao: 'Ativo' },
  { id: 8, nome: 'Comissão de Legislação Parlamentar', sigla: 'AAAAA', situacao: 'Inativa' },
  { id: 9, nome: 'Comissão de Legislação Parlamentar', sigla: 'AAAAA', situacao: 'Inativa' },
  { id: 10, nome: 'Comissão de Legislação Parlamentar', sigla: 'AAAAA', situacao: 'Inativa' },
  { id: 11, nome: 'Comissão de Finanças e Orçamento', sigla: 'BBBBB', situacao: 'Ativo' },
  { id: 12, nome: 'Comissão de Meio Ambiente e Sustentabilidade', sigla: 'CCCCC', situacao: 'Ativo' },
  { id: 13, nome: 'Comissão de Direitos Humanos', sigla: 'DDDDD', situacao: 'Ativo' },
  { id: 14, nome: 'Comissão de Segurança Pública', sigla: 'EEEEE', situacao: 'Inativa' },
  { id: 15, nome: 'Comissão de Cultura e Esporte', sigla: 'FFFFF', situacao: 'Ativo' },
  { id: 16, nome: 'Comissão de Transporte e Mobilidade', sigla: 'GGGGG', situacao: 'Ativo' },
  { id: 17, nome: 'Comissão de Desenvolvimento Econômico', sigla: 'HHHHH', situacao: 'Ativo' },
  { id: 18, nome: 'Comissão de Habitação', sigla: 'IIIII', situacao: 'Inativa' },
  { id: 19, nome: 'Comissão de Infraestrutura', sigla: 'JJJJJ', situacao: 'Ativo' },
  { id: 20, nome: 'Comissão de Turismo', sigla: 'KKKKK', situacao: 'Ativo' },
  ...Array.from({ length: 100 }, (_, i) => ({
    id: 21 + i,
    nome: `Comissão Fake ${i + 1}`,
    sigla: `FK${String(i + 1).padStart(3, '0')}`,
    situacao: i % 3 === 0 ? 'Inativa' : 'Ativo'
  }))
])

const totalItems = computed(() => comissoes.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value))

const paginatedComissoes = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return comissoes.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')

    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i)
    }

    if (current < total - 2) pages.push('...')
    pages.push(total)
  }

  return pages
})

const handleSearch = () => {
  console.log('Buscando:', searchQuery.value)
}

const goToPage = (page) => {
  if (page !== '...') {
    currentPage.value = page
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToComissao = (id) => {
  console.log('Detalhes da comissão:', id)
}
</script>
