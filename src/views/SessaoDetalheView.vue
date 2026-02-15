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
        <li>
          <router-link to="/sessao-plenaria" class="hover:text-brand-blue">
            Detalhar sessão
          </router-link>
        </li>
        <li>›</li>
        <li class="text-gray-900 font-medium">Votação</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Votação</h1>
      </div>
    </div>

    <div class="bg-gray-50 rounded-lg p-6 mb-8">
      <h3 class="text-lg font-bold text-gray-900 mb-4">
        79ª Sessão Ordinária da 1ª Sessão Legislativa da 20ª Legislatura
      </h3>
      
      <div class="grid grid-cols-2 gap-6 mb-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 flex items-center justify-center rounded-lg" style="background-color: rgba(0, 122, 184, 0.1);">
            <svg class="w-6 h-6" style="color: #007AB8;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-700">Data/hora</p>
            <p class="text-sm text-gray-900">17 de Dezembro de 2025 (Quarta-feira) - 09h00</p>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <div>
            <p class="text-sm font-medium text-gray-700">Encerramento</p>
            <p class="text-sm text-gray-900">17/12/2025</p>
          </div>
        </div>
      </div>

      <div class="flex gap-3 flex-wrap">
        <button class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style="background-color: #007AB8;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Gravação
        </button>
        <button class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style="background-color: #007AB8;">
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

    <h2 class="text-xl font-bold text-gray-900 mb-6">Votação nominal das matérias na ordem do dia</h2>

    <div class="space-y-6">
      <div
        v-for="materia in materias"
        :key="materia.id"
        class="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-2">
                Matéria - {{ materia.titulo }}
              </h3>
              
              <div class="flex items-center gap-6 text-sm">
                <div>
                  <span class="text-gray-600">Total de votos</span>
                  <span class="ml-2 font-semibold text-gray-900">{{ materia.totalVotos }}</span>
                </div>
                <div>
                  <span class="text-gray-600">Votos à favor</span>
                  <div class="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ml-2" style="background-color: #10B981;">
                    {{ materia.votosFavor }}
                  </div>
                </div>
                <div>
                  <span class="text-gray-600">Votos contra</span>
                  <div class="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ml-2" style="background-color: #EF4444;">
                    {{ materia.votosContra }}
                  </div>
                </div>
                <div>
                  <span class="text-gray-600">Abstenção</span>
                  <span class="ml-2 font-semibold text-gray-900">{{ materia.abstencao }}</span>
                </div>
              </div>
            </div>
            
            <div 
              class="px-6 py-3 rounded-lg font-bold text-white"
              :style="{ backgroundColor: materia.resultado === 'Reprovado' ? '#EF4444' : '#10B981' }"
            >
              <div class="text-xs mb-1">Resultado</div>
              <div class="text-lg">{{ materia.resultado }}</div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <div class="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-100 border-b border-gray-200">
              <div class="col-span-5 text-sm font-medium text-gray-700">Parlamentar</div>
              <div class="col-span-3 text-sm font-medium text-gray-700">Partido</div>
              <div class="col-span-3 text-sm font-medium text-gray-700">Voto</div>
              <div class="col-span-1"></div>
            </div>

            <div
              v-for="voto in materia.votos.slice(0, showAllVotes[materia.id] ? undefined : 6)"
              :key="voto.id"
              class="grid grid-cols-12 gap-4 px-4 py-4 border-b border-gray-200 items-center"
            >
              <div class="col-span-5 flex items-center gap-3">
                <img :src="voto.foto" :alt="voto.nome" class="w-8 h-8 rounded-full" />
                <span class="text-sm text-gray-900">{{ voto.nome }}</span>
              </div>
              <div class="col-span-3">
                <span class="inline-flex px-3 py-1 rounded-full text-xs font-medium" style="background-color: rgba(0, 122, 184, 0.15); color: #007AB8;">
                  {{ voto.partido }}
                </span>
              </div>
              <div class="col-span-3">
                <span 
                  v-if="voto.voto === 'Favor'"
                  class="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white"
                  style="background-color: #10B981;"
                >
                  Favor
                </span>
                <span 
                  v-else-if="voto.voto === 'Abstenção'"
                  class="inline-flex px-3 py-1 rounded-full text-xs font-medium text-gray-700"
                  style="background-color: #E5E7EB;"
                >
                  Abstenção
                </span>
                <span 
                  v-else
                  class="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white"
                  style="background-color: #EF4444;"
                >
                  Contra
                </span>
              </div>
              <div class="col-span-1 flex justify-end">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="text-sm text-gray-600">
              Mostrando 1-10 de {{ materia.totalVotos }} resultados
            </div>
            <div class="flex gap-2">
              <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Anterior
              </button>
              <button class="px-4 py-2 text-sm font-medium text-white rounded-lg" style="background-color: #003d6f;">
                1
              </button>
              <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                2
              </button>
              <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                3
              </button>
              <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sessaoId = route.params.id

const showAllVotes = ref({})

const materias = ref([
  {
    id: 1,
    titulo: 'EA 12/2025 - EMENDA ADITIVA A PROJETO',
    totalVotos: 26,
    votosFavor: 8,
    votosContra: 20,
    abstencao: 2,
    resultado: 'Reprovado',
    votos: [
      { id: 1, nome: 'Tiago Pereira Agnaldo Silvestre Soares', partido: 'MDB', voto: 'Favor', foto: '/images/member-placeholder.jpg' },
      { id: 2, nome: 'Nome do Parlamentar', partido: 'MDB', voto: 'Favor', foto: '/images/member-placeholder.jpg' },
      { id: 3, nome: 'Nome do Parlamentar', partido: 'MDB', voto: 'Favor', foto: '/images/member-placeholder.jpg' },
      { id: 4, nome: 'Nome do Parlamentar', partido: 'MDB', voto: 'Favor', foto: '/images/member-placeholder.jpg' },
      { id: 5, nome: 'Nome do Parlamentar', partido: 'MDB', voto: 'Abstenção', foto: '/images/member-placeholder.jpg' },
      { id: 6, nome: 'Nome do Parlamentar', partido: 'MDB', voto: 'Abstenção', foto: '/images/member-placeholder.jpg' }
    ]
  },
  {
    id: 2,
    titulo: 'EA 12/2025 - EMENDA NOVA ADITIVA',
    totalVotos: 26,
    votosFavor: 20,
    votosContra: 4,
    abstencao: 2,
    resultado: 'Aprovado',
    votos: [
      { id: 1, nome: 'Tiago Pereira Agnaldo Silvestre Soares', partido: 'MDB', voto: 'Favor', foto: '/images/member-placeholder.jpg' },
      { id: 2, nome: 'Nome do Parlamentar', partido: 'MDB', voto: 'Favor', foto: '/images/member-placeholder.jpg' },
      { id: 3, nome: 'Nome do Parlamentar', partido: 'MDB', voto: 'Favor', foto: '/images/member-placeholder.jpg' },
      { id: 4, nome: 'Nome do Parlamentar', partido: 'MDB', voto: 'Favor', foto: '/images/member-placeholder.jpg' },
      { id: 5, nome: 'Nome do Parlamentar', partido: 'MDB', voto: 'Abstenção', foto: '/images/member-placeholder.jpg' },
      { id: 6, nome: 'Nome do Parlamentar', partido: 'MDB', voto: 'Abstenção', foto: '/images/member-placeholder.jpg' }
    ]
  }
])
</script>
