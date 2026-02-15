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
        <li class="text-gray-900 font-medium">Matérias legislativas</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Matérias legislativas</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo de matéria
        </label>
        <div class="relative">
          <select
            v-model="filters.tipo"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="emenda">Emenda Aditiva</option>
            <option value="projeto">Projeto de Lei</option>
            <option value="indicacao">Indicação</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Ano
        </label>
        <input
          type="number"
          v-model="filters.ano"
          placeholder="2026"
          class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Localização
        </label>
        <div class="relative">
          <select
            v-model="filters.localizacao"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="secretaria">Secretaria Legislativa</option>
            <option value="comissao">Comissão</option>
            <option value="plenario">Plenário</option>
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
            <option value="rejeitado">Rejeitado</option>
            <option value="tramitacao">Em tramitação</option>
            <option value="aprovado">Aprovado</option>
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
            placeholder="Busque pelo assunto, ementa ou protocolo..."
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
          class="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          style="color: #007AB8;"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Limpar filtros
        </button>
      </div>
    </div>


    <div v-if="!hasSearched" class="flex flex-col items-center justify-center py-20">
      <img src="/images/empty-search.svg" alt="Busca vazia" class="w-64 h-64 mb-6 opacity-50" />
      <p class="text-gray-500 text-center">
        Execute uma busca para que o resultado seja carregado.
      </p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="materia in materias"
        :key="materia.id"
        class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
        @click="goToMateria(materia.id)"
      >

        <h3 class="text-lg font-bold text-blue-600 mb-3">
          {{ materia.titulo }}
        </h3>

        <p class="text-sm text-gray-700 mb-4 leading-relaxed">
          {{ materia.ementa }}
        </p>


        <div class="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
          <div>
            <p class="text-xs text-gray-500 mb-1">Protocolo</p>
            <p class="text-sm font-medium text-gray-900">{{ materia.protocolo }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Data de entrada</p>
            <p class="text-sm font-medium text-gray-900">{{ materia.dataEntrada }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Localização atual</p>
            <p class="text-sm font-medium text-gray-900">{{ materia.localizacao }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Situação</p>
            <p class="text-sm font-medium text-gray-900">{{ materia.situacao }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Em tramitação?</p>
            <p class="text-sm font-medium text-gray-900">{{ materia.emTramitacao }}</p>
          </div>
          <div class="flex items-center gap-2">
            <img :src="materia.autorFoto" :alt="materia.autor" class="w-8 h-8 rounded-full" />
            <div>
              <p class="text-xs text-gray-500">{{ materia.autor }}</p>
              <p class="text-xs text-gray-400">Autor</p>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button class="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2" style="color: #007AB8; border-color: #007AB8;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            PLE 00/0000
          </button>
          <button class="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2" style="color: #007AB8; border-color: #007AB8;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            PLE 00/0000
          </button>
          <button class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity" style="background-color: #007AB8;">
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Matéria em PDF
          </button>
        </div>
      </div>


      <div class="flex items-center justify-between pt-4">
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
  tipo: '',
  ano: '',
  localizacao: '',
  situacao: ''
})

const materias = ref([
  {
    id: 1,
    titulo: 'EA 12/2025 - EMENDA ADITIVA A PROJETO',
    ementa: 'EMENDA ADITIVA DO PARÁGRAFO ÚNICO DO ARTIGO 9 PROJETO DE LEI COMPLEMENTAR Nº 48, DE 09 DE DEZEMBRO DE 2025, QUE INSTITUI A POLÍTICA DE DESAFETAÇÃO E ALIENAÇÃO DE BENS IMÓVEIS PÚBLICOS MUNICIPAIS PARA FINS DE PERMUTA OU DOAÇÃO COM ENCARGO VOLTADOS À IMPLANTAÇÃO DE EQUIPAMENTOS PÚBLICOS, E DÁ OUTRAS PROVIDÊNCIAS.',
    protocolo: 'AAAAA/2026',
    dataEntrada: '22/01/2022',
    localizacao: 'Secretaria legislativa',
    situacao: 'Rejeitado',
    emTramitacao: 'Sim',
    autor: 'Tiago P. Soares',
    autorFoto: '/images/member-placeholder.jpg'
  },
  {
    id: 2,
    titulo: 'EA 12/2025 - EMENDA ADITIVA A PROJETO',
    ementa: 'EMENDA ADITIVA DO PARÁGRAFO ÚNICO DO ARTIGO 9 PROJETO DE LEI COMPLEMENTAR Nº 48, DE 09 DE DEZEMBRO DE 2025, QUE INSTITUI A POLÍTICA DE DESAFETAÇÃO E ALIENAÇÃO DE BENS IMÓVEIS PÚBLICOS MUNICIPAIS PARA FINS DE PERMUTA OU DOAÇÃO COM ENCARGO VOLTADOS À IMPLANTAÇÃO DE EQUIPAMENTOS PÚBLICOS, E DÁ OUTRAS PROVIDÊNCIAS.',
    protocolo: 'AAAAA/2026',
    dataEntrada: '22/01/2022',
    localizacao: 'Secretaria legislativa',
    situacao: 'Rejeitado',
    emTramitacao: 'Sim',
    autor: 'Tiago P. Soares',
    autorFoto: '/images/member-placeholder.jpg'
  },
  {
    id: 3,
    titulo: 'EA 12/2025 - EMENDA ADITIVA A PROJETO',
    ementa: 'EMENDA ADITIVA DO PARÁGRAFO ÚNICO DO ARTIGO 9 PROJETO DE LEI COMPLEMENTAR Nº 48, DE 09 DE DEZEMBRO DE 2025, QUE INSTITUI A POLÍTICA DE DESAFETAÇÃO E ALIENAÇÃO DE BENS IMÓVEIS PÚBLICOS MUNICIPAIS PARA FINS DE PERMUTA OU DOAÇÃO COM ENCARGO VOLTADOS À IMPLANTAÇÃO DE EQUIPAMENTOS PÚBLICOS, E DÁ OUTRAS PROVIDÊNCIAS.',
    protocolo: 'AAAAA/2026',
    dataEntrada: '22/01/2022',
    localizacao: 'Secretaria legislativa',
    situacao: 'Rejeitado',
    emTramitacao: 'Sim',
    autor: 'Tiago P. Soares',
    autorFoto: '/images/member-placeholder.jpg'
  }
])

const handleSearch = () => {
  hasSearched.value = true
  console.log('Buscando materias:', searchQuery.value)
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {
    tipo: '',
    ano: '',
    localizacao: '',
    situacao: ''
  }
  hasSearched.value = false
}

const goToMateria = (id) => {
  router.push(`/materias-legislativas/${id}`)
}
</script>
