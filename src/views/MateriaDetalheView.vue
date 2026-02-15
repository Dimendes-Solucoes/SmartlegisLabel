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

    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">
        EA 12/2025 - EMENDA ADITIVA A PROJETO
      </h2>

      <p class="text-sm text-gray-700 mb-6 leading-relaxed">
        EMENDA ADITIVA DO PARÁGRAFO ÚNICO DO ARTIGO 9 PROJETO DE LEI COMPLEMENTAR Nº 48, DE 09 DE DEZEMBRO DE 2025, QUE INSTITUI A POLÍTICA DE DESAFETAÇÃO E ALIENAÇÃO DE BENS IMÓVEIS PÚBLICOS MUNICIPAIS PARA FINS DE PERMUTA OU DOAÇÃO COM ENCARGO VOLTADOS À IMPLANTAÇÃO DE EQUIPAMENTOS PÚBLICOS, E DÁ OUTRAS PROVIDÊNCIAS.
      </p>

      <div class="grid grid-cols-2 md:grid-cols-6 gap-6 mb-6">
        <div>
          <p class="text-xs text-gray-500 mb-1">Protocolo</p>
          <p class="text-sm font-medium text-gray-900">AAAAA/2026</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Data de entrada</p>
          <p class="text-sm font-medium text-gray-900">22/01/2022</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Localização atual</p>
          <p class="text-sm font-medium text-gray-900">Secretaria legislativa</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Situação</p>
          <p class="text-sm font-medium text-gray-900">Rejeitado</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Em tramitação?</p>
          <p class="text-sm font-medium text-gray-900">Sim</p>
        </div>
        <div class="flex items-center gap-2">
          <img src="/images/member-placeholder.jpg" alt="Tiago P. Soares" class="w-8 h-8 rounded-full" />
          <div>
            <p class="text-sm font-medium text-gray-900">Tiago P. Soares</p>
            <p class="text-xs text-gray-500">Autor</p>
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
        <button class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style="background-color: #007AB8;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Matéria em PDF
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-bold text-gray-900">Histórico de tramitações</h3>
      </div>

      <div class="overflow-x-auto">
        <div class="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200">
          <div class="text-sm font-medium text-gray-700">Data</div>
          <div class="text-sm font-medium text-gray-700">Ação</div>
          <div class="text-sm font-medium text-gray-700">Origem</div>
          <div class="text-sm font-medium text-gray-700">Destino</div>
          <div class="text-sm font-medium text-gray-700">Situação</div>
        </div>

        <div
          v-for="tramitacao in tramitacoes"
          :key="tramitacao.id"
          class="grid grid-cols-5 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <div class="text-sm text-gray-900">{{ tramitacao.data }}</div>
          <div class="text-sm text-gray-900">{{ tramitacao.acao }}</div>
          <div class="text-sm text-gray-900">{{ tramitacao.origem }}</div>
          <div class="text-sm text-gray-900">{{ tramitacao.destino }}</div>
          <div class="text-sm text-gray-900">{{ tramitacao.situacao }}</div>
        </div>
      </div>

      <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <div class="text-sm text-gray-600">
          1 a 10 de 1000 itens
        </div>
        <div class="flex gap-2">
          <button disabled class="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-300 rounded-lg cursor-not-allowed">
            Anterior
          </button>
          <button class="px-4 py-2 text-sm font-medium text-white rounded-lg" style="background-color: #003d6f;">
            1
          </button>
          <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Próximo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const materiaId = route.params.id

const tramitacoes = ref([
  {
    id: 1,
    data: '00/00/0000',
    acao: 'Ementa rejeitada em segundo turno.',
    origem: 'Secretaria Legislativa',
    destino: 'Arquivo',
    situacao: 'Rejeitado'
  },
  {
    id: 2,
    data: '00/00/0000',
    acao: 'Ementa rejeitada em segundo turno.',
    origem: 'Secretaria Legislativa',
    destino: 'Arquivo',
    situacao: 'Rejeitado'
  },
  {
    id: 3,
    data: '00/00/0000',
    acao: 'Ementa rejeitada em segundo turno.',
    origem: 'Secretaria Legislativa',
    destino: 'Arquivo',
    situacao: 'Rejeitado'
  },
  {
    id: 4,
    data: '00/00/0000',
    acao: 'Ementa rejeitada em segundo turno.',
    origem: 'Secretaria Legislativa',
    destino: 'Arquivo',
    situacao: 'Rejeitado'
  },
  {
    id: 5,
    data: '00/00/0000',
    acao: 'Ementa rejeitada em segundo turno.',
    origem: 'Secretaria Legislativa',
    destino: 'Arquivo',
    situacao: 'Rejeitado'
  },
  {
    id: 6,
    data: '00/00/0000',
    acao: 'Ementa rejeitada em segundo turno.',
    origem: 'Secretaria Legislativa',
    destino: 'Arquivo',
    situacao: 'Rejeitado'
  },
  {
    id: 7,
    data: '00/00/0000',
    acao: 'Ementa rejeitada em segundo turno.',
    origem: 'Secretaria Legislativa',
    destino: 'Arquivo',
    situacao: 'Rejeitado'
  },
  {
    id: 8,
    data: '00/00/0000',
    acao: 'Ementa rejeitada em segundo turno.',
    origem: 'Secretaria Legislativa',
    destino: 'Arquivo',
    situacao: 'Rejeitado'
  },
  {
    id: 9,
    data: '00/00/0000',
    acao: 'Ementa rejeitada em segundo turno.',
    origem: 'Secretaria Legislativa',
    destino: 'Arquivo',
    situacao: 'Rejeitado'
  },
  {
    id: 10,
    data: '00/00/0000',
    acao: 'Ementa rejeitada em segundo turno.',
    origem: 'Secretaria Legislativa',
    destino: 'Arquivo',
    situacao: 'Rejeitado'
  }
])
</script>
