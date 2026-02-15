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
        <li class="text-gray-900 font-medium">Normas jurídicas</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Normas jurídicas</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Período de publicação
        </label>
        <div class="relative">
          <input
            type="text"
            v-model="filters.periodo"
            placeholder="01 / 01 / 2026 a 01 / 12 / 2026"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent pr-10"
          />
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo de norma
        </label>
        <div class="relative">
          <select
            v-model="filters.tipo"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="ato">Ato da Mesa Diretora</option>
            <option value="lei">Lei Ordinária</option>
            <option value="decreto">Decreto Legislativo</option>
            <option value="resolucao">Resolução</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Assunto
        </label>
        <div class="relative">
          <select
            v-model="filters.assunto"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="comissoes">Comissões Parlamentares</option>
            <option value="administrativa">Administrativa</option>
            <option value="financeira">Financeira</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Situação
        </label>
        <div class="relative">
          <select
            v-model="filters.situacao"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="vigor">Em vigor</option>
            <option value="revogada">Revogada</option>
            <option value="suspensa">Suspensa</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <div class="mb-8">
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
            placeholder="Busque pelo número ou nome da norma..."
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
        <button
          @click="clearFilters"
          class="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Limpar filtros
        </button>
      </div>
    </div>

    <div v-if="!hasSearched" class="flex flex-col items-center justify-center py-16">
      <img src="/images/empty-normas.svg" alt="Buscar normas" class="w-64 h-64 mb-6" />
      <p class="text-gray-500 text-center">
        Execute uma busca para que o resultado seja carregado.
      </p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="norma in normas"
        :key="norma.id"
        class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
        @click="goToNorma(norma.id)"
      >
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          {{ norma.titulo }}
        </h3>

        <p class="text-sm text-gray-700 mb-4 leading-relaxed">
          {{ norma.descricao }}
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
          <div>
            <p class="text-xs text-gray-500 mb-1">Número</p>
            <p class="text-sm font-medium text-gray-900">{{ norma.numero }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Data de publicação</p>
            <p class="text-sm font-medium text-gray-900">{{ norma.dataPublicacao }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Assunto</p>
            <p class="text-sm font-medium text-gray-900">{{ norma.assunto }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Situação</p>
            <span class="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white" style="background-color: #10B981;">
              {{ norma.situacao }}
            </span>
          </div>
        </div>

        <button class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style="background-color: #007AB8;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Norma em PDF
        </button>
      </div>

      <div class="flex items-center justify-between pt-6">
        <div class="text-sm text-gray-600">
          Mostrando 1-3 de 3 resultados
        </div>
        <div class="flex gap-2">
          <button disabled class="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-300 rounded-lg cursor-not-allowed">
            Anterior
          </button>
          <button class="px-4 py-2 text-sm font-medium text-white rounded-lg" style="background-color: #003d6f;">
            1
          </button>
          <button disabled class="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-300 rounded-lg cursor-not-allowed">
            Próximo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const hasSearched = ref(false)

const filters = ref({
  periodo: '01 / 01 / 2026 a 01 / 12 / 2026',
  tipo: '',
  assunto: '',
  situacao: ''
})

const normas = ref([
  {
    id: 1,
    titulo: 'Ato da Mesa Diretora',
    descricao: 'DISPÕE SOBRE A NOMEAÇÃO DOS VEREADORES MEMBROS DA COMISSÃO REPRESENTATIVA PARA FUNCIONAMENTO DURANTE O RECESSO PARLAMENTAR.',
    numero: '29/2025',
    dataPublicacao: '22/01/2022',
    assunto: 'Comissões Parlamentares',
    situacao: 'em vigor'
  },
  {
    id: 2,
    titulo: 'Ato da Mesa Diretora',
    descricao: 'DISPÕE SOBRE A NOMEAÇÃO DOS VEREADORES MEMBROS DA COMISSÃO REPRESENTATIVA PARA FUNCIONAMENTO DURANTE O RECESSO PARLAMENTAR.',
    numero: '29/2025',
    dataPublicacao: '22/01/2022',
    assunto: 'Comissões Parlamentares',
    situacao: 'em vigor'
  },
  {
    id: 3,
    titulo: 'Ato da Mesa Diretora',
    descricao: 'DISPÕE SOBRE A NOMEAÇÃO DOS VEREADORES MEMBROS DA COMISSÃO REPRESENTATIVA PARA FUNCIONAMENTO DURANTE O RECESSO PARLAMENTAR.',
    numero: '29/2025',
    dataPublicacao: '22/01/2022',
    assunto: 'Comissões Parlamentares',
    situacao: 'em vigor'
  }
])

const handleSearch = () => {
  hasSearched.value = true
}

const clearFilters = () => {
  filters.value = {
    periodo: '01 / 01 / 2026 a 01 / 12 / 2026',
    tipo: '',
    assunto: '',
    situacao: ''
  }
  searchQuery.value = ''
  hasSearched.value = false
}

const goToNorma = (id) => {
  router.push(`/normas-juridicas/${id}`)
}
</script>
