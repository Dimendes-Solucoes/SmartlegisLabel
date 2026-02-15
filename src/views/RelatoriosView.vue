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
        <li class="text-gray-900 font-medium">Relatórios</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Relatórios</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Período
        </label>
        <div class="relative">
          <input
            type="text"
            v-model="filters.periodo"
            placeholder="0 / 01 / 2026 a 01 / 12 / 2026"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent pr-10"
          />
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Parlamentar
        </label>
        <div class="relative">
          <select
            v-model="filters.parlamentar"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="todos">Todos</option>
            <option value="1">Tiago Pereira Agnaldo</option>
            <option value="2">Nome do Parlamentar</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <div class="flex gap-3 mb-8">
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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="rounded-lg p-6" style="background-color: #007AB8;">
        <p class="text-white text-sm mb-2">Total de documentos</p>
        <p class="text-white text-4xl font-bold">1000</p>
        <p class="text-white text-sm">Total</p>
      </div>
      
      <div class="bg-gray-100 rounded-lg p-6">
        <p class="text-gray-700 text-sm mb-2">Tipo de documento mais produzido</p>
        <p class="text-gray-900 text-4xl font-bold">250</p>
        <p class="text-gray-700 text-sm">Requerimento</p>
      </div>
      
      <div class="bg-gray-100 rounded-lg p-6">
        <p class="text-gray-700 text-sm mb-2">Tipo de documento menos produzido</p>
        <p class="text-gray-900 text-4xl font-bold">250</p>
        <p class="text-gray-700 text-sm">Projeto de Lei</p>
      </div>
      
      <div class="bg-gray-100 rounded-lg p-6">
        <p class="text-gray-700 text-sm mb-2">Média de documentos criados por parlamentar</p>
        <p class="text-gray-900 text-4xl font-bold">25</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-2">Estatística</h3>
        <p class="text-sm text-gray-600 mb-6">Documentos produzidos</p>
        
        <div class="relative h-80">
          <svg class="w-full h-full" viewBox="0 0 500 320">
            <line x1="40" y1="280" x2="460" y2="280" stroke="#E5E7EB" stroke-width="2"/>
            <line x1="40" y1="210" x2="460" y2="210" stroke="#E5E7EB" stroke-width="1"/>
            <line x1="40" y1="140" x2="460" y2="140" stroke="#E5E7EB" stroke-width="1"/>
            <line x1="40" y1="70" x2="460" y2="70" stroke="#E5E7EB" stroke-width="1"/>
            
            <rect x="60" y="150" width="35" height="130" fill="#007AB8" rx="2"/>
            <rect x="120" y="180" width="35" height="100" fill="#007AB8" rx="2"/>
            <rect x="180" y="120" width="35" height="160" fill="#007AB8" rx="2"/>
            <rect x="240" y="160" width="35" height="120" fill="#007AB8" rx="2"/>
            <rect x="300" y="30" width="35" height="250" fill="#007AB8" rx="2"/>
            <rect x="360" y="190" width="35" height="90" fill="#007AB8" rx="2"/>
            <rect x="420" y="140" width="35" height="140" fill="#007AB8" rx="2"/>
            
            <text x="313" y="20" text-anchor="middle" fill="#1F2937" font-size="14" font-weight="bold">500</text>
            
            <text x="77" y="300" text-anchor="middle" fill="#6B7280" font-size="12">TIPO</text>
            <text x="137" y="300" text-anchor="middle" fill="#6B7280" font-size="12">TIPO</text>
            <text x="197" y="300" text-anchor="middle" fill="#6B7280" font-size="12">TIPO</text>
            <text x="257" y="300" text-anchor="middle" fill="#6B7280" font-size="12">TIPO</text>
            <text x="317" y="300" text-anchor="middle" fill="#6B7280" font-size="12">TIPO</text>
            <text x="377" y="300" text-anchor="middle" fill="#6B7280" font-size="12">TIPO</text>
            <text x="437" y="300" text-anchor="middle" fill="#6B7280" font-size="12">TIPO</text>
            
            <text x="30" y="285" text-anchor="end" fill="#6B7280" font-size="12">0</text>
            <text x="30" y="215" text-anchor="end" fill="#6B7280" font-size="12">100</text>
            <text x="30" y="145" text-anchor="end" fill="#6B7280" font-size="12">200</text>
            <text x="30" y="75" text-anchor="end" fill="#6B7280" font-size="12">300</text>
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-2">Ranking Top 10</h3>
        <p class="text-sm text-gray-600 mb-6">Parlamentares que mais produziram documentos</p>
        
        <div class="space-y-3">
          <div v-for="(item, index) in ranking" :key="index">
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-700">{{ index + 1 }}º {{ item.nome }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div 
                class="h-3 rounded-full" 
                :style="{ width: item.porcentagem + '%', backgroundColor: '#007AB8' }"
              ></div>
            </div>
          </div>
        </div>
        
        <div class="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-2">Evolução</h3>
      <p class="text-sm text-gray-600 mb-6">Documentos produzidos ao longo do período</p>
      
      <div class="relative h-64">
        <svg class="w-full h-full" viewBox="0 0 800 250">
          <line x1="40" y1="220" x2="760" y2="220" stroke="#E5E7EB" stroke-width="2"/>
          <line x1="40" y1="165" x2="760" y2="165" stroke="#E5E7EB" stroke-width="1"/>
          <line x1="40" y1="110" x2="760" y2="110" stroke="#E5E7EB" stroke-width="1"/>
          <line x1="40" y1="55" x2="760" y2="55" stroke="#E5E7EB" stroke-width="1"/>
          
          <polyline 
            points="60,220 120,200 180,190 240,210 300,170 360,100 420,115 480,90 540,110 600,200 660,205 720,210"
            fill="none"
            stroke="#007AB8"
            stroke-width="3"
          />
          
          <circle cx="60" cy="220" r="5" fill="#007AB8"/>
          <circle cx="120" cy="200" r="5" fill="#007AB8"/>
          <circle cx="180" cy="190" r="5" fill="#007AB8"/>
          <circle cx="240" cy="210" r="5" fill="#007AB8"/>
          <circle cx="300" cy="170" r="5" fill="#007AB8"/>
          <circle cx="360" cy="100" r="5" fill="#007AB8"/>
          <circle cx="420" cy="115" r="5" fill="#007AB8"/>
          <circle cx="480" cy="90" r="5" fill="#007AB8"/>
          <circle cx="540" cy="110" r="5" fill="#007AB8"/>
          <circle cx="600" cy="200" r="5" fill="#007AB8"/>
          <circle cx="660" cy="205" r="5" fill="#007AB8"/>
          <circle cx="720" cy="210" r="5" fill="#007AB8"/>
          
          <rect x="470" y="75" width="30" height="20" fill="#1F2937" opacity="0.9" rx="3"/>
          <text x="485" y="89" text-anchor="middle" fill="white" font-size="12" font-weight="bold">30</text>
          
          <text x="60" y="240" text-anchor="middle" fill="#6B7280" font-size="11">JAN</text>
          <text x="120" y="240" text-anchor="middle" fill="#6B7280" font-size="11">FEV</text>
          <text x="180" y="240" text-anchor="middle" fill="#6B7280" font-size="11">MAR</text>
          <text x="240" y="240" text-anchor="middle" fill="#6B7280" font-size="11">ABR</text>
          <text x="300" y="240" text-anchor="middle" fill="#6B7280" font-size="11">MAI</text>
          <text x="360" y="240" text-anchor="middle" fill="#6B7280" font-size="11">JUN</text>
          <text x="420" y="240" text-anchor="middle" fill="#6B7280" font-size="11">JUL</text>
          <text x="480" y="240" text-anchor="middle" fill="#6B7280" font-size="11">AGO</text>
          <text x="540" y="240" text-anchor="middle" fill="#6B7280" font-size="11">SET</text>
          <text x="600" y="240" text-anchor="middle" fill="#6B7280" font-size="11">OUT</text>
          <text x="660" y="240" text-anchor="middle" fill="#6B7280" font-size="11">NOV</text>
          <text x="720" y="240" text-anchor="middle" fill="#6B7280" font-size="11">DEZ</text>
          
          <text x="30" y="225" text-anchor="end" fill="#6B7280" font-size="11">0</text>
          <text x="30" y="170" text-anchor="end" fill="#6B7280" font-size="11">10</text>
          <text x="30" y="115" text-anchor="end" fill="#6B7280" font-size="11">20</text>
          <text x="30" y="60" text-anchor="end" fill="#6B7280" font-size="11">30</text>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const filters = ref({
  periodo: '0 / 01 / 2026 a 01 / 12 / 2026',
  parlamentar: 'todos'
})

const ranking = ref([
  { nome: 'Nome do Parlamentar', porcentagem: 100 },
  { nome: 'Nome do Parlamentar', porcentagem: 90 },
  { nome: 'Nome do Parlamentar', porcentagem: 85 },
  { nome: 'Nome do Parlamentar', porcentagem: 80 },
  { nome: 'Nome do Parlamentar', porcentagem: 75 },
  { nome: 'Nome do Parlamentar', porcentagem: 70 },
  { nome: 'Nome do Parlamentar', porcentagem: 65 },
  { nome: 'Nome do Parlamentar', porcentagem: 55 },
  { nome: 'Nome do Parlamentar', porcentagem: 40 },
  { nome: 'Nome do Parlamentar', porcentagem: 30 }
])

const handleSearch = () => {
  console.log('Buscando relatórios...')
}

const clearFilters = () => {
  filters.value = {
    periodo: '0 / 01 / 2026 a 01 / 12 / 2026',
    parlamentar: 'todos'
  }
}
</script>
