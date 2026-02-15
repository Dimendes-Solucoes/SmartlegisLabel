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
        <li class="text-gray-900 font-medium">Sessões plenárias</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Sessões plenárias</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Ano
        </label>
        <div class="relative">
          <input
            type="number"
            v-model="filters.ano"
            placeholder="2026"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent pr-10"
          />
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Mês
        </label>
        <div class="relative">
          <select
            v-model="filters.mes"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo
        </label>
        <div class="relative">
          <select
            v-model="filters.tipo"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="ordinaria">Ordinária</option>
            <option value="extraordinaria">Extraordinária</option>
            <option value="solene">Solene</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <div class="space-y-6 mb-8">
      <div
        v-for="sessao in sessoes"
        :key="sessao.id"
        class="bg-gray-50 rounded-lg p-6"
      >
        <h3 class="text-lg font-bold text-gray-900 mb-4">
          {{ sessao.titulo }}
        </h3>
        
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 flex items-center justify-center rounded-lg" style="background-color: rgba(0, 122, 184, 0.1);">
            <svg class="w-6 h-6" style="color: #007AB8;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-700">Data/hora</p>
            <p class="text-sm text-gray-900">{{ sessao.dataHora }}</p>
          </div>
        </div>

        <div class="flex gap-3 flex-wrap">
          <button class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style="background-color: #007AB8;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Gravação
          </button>
          <button 
            @click="goToVotacao(sessao.id)"
            class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" 
            style="background-color: #007AB8;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Votação
          </button>
          <button class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style="background-color: #007AB8;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Ata
          </button>
          <button class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style="background-color: #007AB8;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Pauta
          </button>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between">
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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const filters = ref({
  ano: 2026,
  mes: '',
  tipo: ''
})

const sessoes = ref([
  {
    id: 1,
    titulo: '79ª Sessão Ordinária da 1ª Sessão Legislativa da 20ª Legislatura',
    dataHora: '17 de Dezembro de 2025 (Quarta-feira) - 09h00'
  },
  {
    id: 2,
    titulo: '13ª Sessão Ordinária da 1ª Sessão Legislativa da 20ª Legislatura',
    dataHora: '17 de Dezembro de 2025 (Quarta-feira) - 09h00'
  },
  {
    id: 3,
    titulo: '14ª Sessão Ordinária da 1ª Sessão Legislativa da 20ª Legislatura',
    dataHora: '17 de Dezembro de 2025 (Quarta-feira) - 09h00'
  }
])

const goToVotacao = (id) => {
  router.push(`/sessao-plenaria/${id}/votacao`)
}
</script>
