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
          <router-link to="/pautas-sessoes" class="hover:text-brand-blue">
            Pautas das sessões
          </router-link>
        </li>
        <li>›</li>
        <li class="text-gray-900 font-medium">Pauta da sessão</li>
      </ol>
    </nav>

    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <button
            @click="$router.back()"
            class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-2xl font-bold text-gray-900">
            1ª Sessão Ordinária da 1ª Sessão Legislativa da 20ª Legislatura (22/01/2022)
          </h1>
        </div>
        <div class="relative">
          <button
            @click="showExportMenu = !showExportMenu"
            class="px-4 py-2 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            style="background-color: #007AB8;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar pauta
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            v-if="showExportMenu"
            class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10"
          >
            <button class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">PDF</button>
            <button class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">TXT</button>
            <button class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">CSV</button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Oradores inscritos no Expediente</h3>
      
      <div class="overflow-x-auto">
        <div class="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-100 border-b border-gray-200">
          <div class="col-span-2 text-sm font-medium text-gray-700">Ordem</div>
          <div class="col-span-10 text-sm font-medium text-gray-700">Nome</div>
        </div>

        <div
          v-for="orador in oradores"
          :key="orador.ordem"
          class="grid grid-cols-12 gap-4 px-4 py-4 border-b border-gray-200"
        >
          <div class="col-span-2 text-sm text-gray-900">{{ orador.ordem }}</div>
          <div class="col-span-10 flex items-center gap-3">
            <img :src="orador.foto" :alt="orador.nome" class="w-8 h-8 rounded-full" />
            <span class="text-sm text-gray-900">{{ orador.nome }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Ordem do dia</h3>
      
      <div class="overflow-x-auto">
        <div class="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-100 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div class="col-span-1">Item</div>
          <div class="col-span-3">Matéria</div>
          <div class="col-span-4">Ementa</div>
          <div class="col-span-1">Protocolo</div>
          <div class="col-span-2">Autor</div>
          <div class="col-span-1">Situação</div>
        </div>

        <div
          v-for="materia in materias"
          :key="materia.item"
          class="grid grid-cols-12 gap-4 px-4 py-4 border-b border-gray-200 items-center"
        >
          <div class="col-span-1 text-sm text-gray-900">{{ materia.item }}</div>
          <div class="col-span-3 text-sm text-gray-900">{{ materia.materia }}</div>
          <div class="col-span-4 text-sm text-gray-700">{{ materia.ementa }}</div>
          <div class="col-span-1 text-sm text-gray-900">{{ materia.protocolo }}</div>
          <div class="col-span-2 flex items-center gap-2">
            <img :src="materia.autorFoto" :alt="materia.autor" class="w-8 h-8 rounded-full" />
            <span class="text-sm text-gray-900">{{ materia.autor }}</span>
          </div>
          <div class="col-span-1">
            <span class="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white" style="background-color: #007AB8;">
              {{ materia.situacao }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between mt-4">
        <div class="text-sm text-gray-600">
          Mostrando 1-2 de 2 resultados
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
import { useRoute } from 'vue-router'

const route = useRoute()
const pautaId = route.params.id

const showExportMenu = ref(false)

const oradores = ref([
  {
    ordem: 1,
    nome: 'Tiago Pereira Agnaldo Silvestre Soares',
    foto: '/images/member-placeholder.jpg'
  },
  {
    ordem: 2,
    nome: 'Orador',
    foto: '/images/member-placeholder.jpg'
  }
])

const materias = ref([
  {
    item: 1,
    materia: 'PLOE 111/2025 - Projeto de Lei Ordinária do Executivo',
    ementa: 'PLOE nº 111/2025 - Dispõe sobre a criação deo Programa Investe Saúde, no Âmbito do Município',
    protocolo: '000000000',
    autor: 'Tiago Pereira Agnaldo',
    autorFoto: '/images/member-placeholder.jpg',
    situacao: 'Disponível'
  },
  {
    item: 1,
    materia: 'PLOE 111/2025 - Projeto de Lei Ordinária do Executivo',
    ementa: 'PLOE nº 111/2025 - Dispõe sobre a criação deo Programa Investe Saúde, no Âmbito do Município',
    protocolo: '000000000',
    autor: 'Tiago Pereira Agnaldo',
    autorFoto: '/images/member-placeholder.jpg',
    situacao: 'Disponível'
  },
  {
    item: 1,
    materia: 'PLOE 111/2025 - Projeto de Lei Ordinária do Executivo',
    ementa: 'PLOE nº 111/2025 - Dispõe sobre a criação deo Programa Investe Saúde, no Âmbito do Município',
    protocolo: '000000000',
    autor: 'Tiago Pereira Agnaldo',
    autorFoto: '/images/member-placeholder.jpg',
    situacao: 'Disponível'
  }
])
</script>
