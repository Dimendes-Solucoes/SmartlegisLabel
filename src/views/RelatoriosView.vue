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

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="relative">
        <div class="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
        <div class="w-16 h-16 border-4 border-t-brand-blue border-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p class="mt-4 text-gray-600 font-medium">Carregando relatórios...</p>
    </div>

    <!-- Content State -->
    <div v-else>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Data Início
        </label>
        <div class="relative">
          <input
            type="date"
            v-model="filters.date_start"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Data Fim
        </label>
        <div class="relative">
          <input
            type="date"
            v-model="filters.date_end"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Parlamentar
        </label>
        <div class="relative">
          <select
            v-model="filters.author_id"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="todos">Todos</option>
            <option
              v-for="parlamentar in todosParlamentares"
              :key="parlamentar.id"
              :value="parlamentar.id"
            >
              {{ parlamentar.nickname }}
            </option>
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
        <p class="text-white text-sm mb-2">{{ textoTotalDocumentos }}</p>
        <p class="text-white text-4xl font-bold">{{ dataReport.total || 0 }}</p>
        <p class="text-white text-sm">Total</p>
      </div>

      <div class="bg-gray-100 rounded-lg p-6">
        <p class="text-gray-700 text-sm mb-2">Tipo de documento mais produzido</p>
        <p class="text-gray-900 text-4xl font-bold">{{ dataReport.most_sent_category?.total || 0 }}</p>
        <p class="text-gray-700 text-sm">{{ dataReport.most_sent_category?.name || '-' }}</p>
      </div>

      <div class="bg-gray-100 rounded-lg p-6">
        <p class="text-gray-700 text-sm mb-2">Tipo de documento menos produzido</p>
        <p class="text-gray-900 text-4xl font-bold">{{ dataReport.least_sent_category?.total || 0 }}</p>
        <p class="text-gray-700 text-sm">{{ dataReport.least_sent_category?.name || '-' }}</p>
      </div>

      <div class="bg-gray-100 rounded-lg p-6">
        <p class="text-gray-700 text-sm mb-2">{{ textoMedia }}</p>
        <p class="text-gray-900 text-4xl font-bold">{{ dataReport.average_per_author || 0 }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-2">Estatística</h3>
        <p class="text-sm text-gray-600 mb-6">Documentos com maior produção</p>

        <div class="relative h-80">
          <svg class="w-full h-full" viewBox="0 0 500 320">
            <!-- Linhas do grid -->
            <line x1="40" y1="280" x2="460" y2="280" stroke="#E5E7EB" stroke-width="2"/>
            <line x1="40" y1="210" x2="460" y2="210" stroke="#E5E7EB" stroke-width="1"/>
            <line x1="40" y1="140" x2="460" y2="140" stroke="#E5E7EB" stroke-width="1"/>
            <line x1="40" y1="70" x2="460" y2="70" stroke="#E5E7EB" stroke-width="1"/>

            <!-- Barras dinâmicas -->
            <g
              v-for="(category, index) in categoryData"
              :key="category.id"
              style="cursor: pointer;"
              @click="selectCategory(index)"
            >
              <title>{{ category.name }}</title>

              <rect
                :x="getCategoryX(index)"
                :y="getCategoryY(category.total)"
                width="35"
                :height="getCategoryHeight(category.total)"
                :fill="selectedCategory === index ? '#005A8C' : '#007AB8'"
                rx="2"
              />

              <!-- Abreviação da categoria no eixo X -->
              <text
                :x="getCategoryX(index) + 17.5"
                y="300"
                text-anchor="middle"
                :fill="selectedCategory === index ? '#007AB8' : '#6B7280'"
                :font-weight="selectedCategory === index ? 'bold' : 'normal'"
                font-size="10"
              >
                {{ category.abbreviation }}
              </text>
            </g>

            <!-- Tooltip da categoria selecionada -->
            <template v-if="selectedCategory !== null && categoryData[selectedCategory]">
              <rect
                :x="getCategoryX(selectedCategory) - 7.5"
                :y="getCategoryY(categoryData[selectedCategory].total) - 55"
                width="50"
                height="35"
                fill="#1F2937"
                opacity="0.95"
                rx="4"
              />
              <text
                :x="getCategoryX(selectedCategory) + 17.5"
                :y="getCategoryY(categoryData[selectedCategory].total) - 39"
                text-anchor="middle"
                fill="white"
                font-size="9"
                font-weight="600"
              >
                {{ categoryData[selectedCategory].abbreviation }}
              </text>
              <text
                :x="getCategoryX(selectedCategory) + 17.5"
                :y="getCategoryY(categoryData[selectedCategory].total) - 39"
                text-anchor="middle"
                fill="white"
                font-size="13"
                font-weight="bold"
                dy="14"
              >
                {{ categoryData[selectedCategory].total }}
              </text>
            </template>

            <!-- Labels do eixo Y -->
            <text x="30" y="285" text-anchor="end" fill="#6B7280" font-size="12">0</text>
            <text x="30" y="215" text-anchor="end" fill="#6B7280" font-size="12">{{ Math.round(maxCategoryValue / 3) }}</text>
            <text x="30" y="145" text-anchor="end" fill="#6B7280" font-size="12">{{ Math.round((maxCategoryValue * 2) / 3) }}</text>
            <text x="30" y="75" text-anchor="end" fill="#6B7280" font-size="12">{{ maxCategoryValue }}</text>
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-2">{{ tituloRanking }}</h3>
        <p class="text-sm text-gray-600 mb-6">{{ subtituloRanking }}</p>

        <div class="space-y-3">
          <div v-for="(item, index) in dataReport.top_authors" :key="index">
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-700">{{ isParlamentarSelecionado ? item.rank : (index + 1) }}º {{ item.nickname }}</span>
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

        <div v-if="!isParlamentarSelecionado" class="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>0</span>
          <span>{{ Math.round(maxRankingValue / 4) }}</span>
          <span>{{ Math.round(maxRankingValue / 2) }}</span>
          <span>{{ maxRankingValue }}</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-2">Evolução</h3>
      <p class="text-sm text-gray-600 mb-6">Documentos produzidos ao longo do período</p>

      <div class="relative h-64">
        <svg class="w-full h-full" viewBox="0 0 800 250">
          <!-- Linhas horizontais do grid -->
          <line x1="40" y1="220" x2="760" y2="220" stroke="#E5E7EB" stroke-width="2"/>
          <line x1="40" y1="165" x2="760" y2="165" stroke="#E5E7EB" stroke-width="1"/>
          <line x1="40" y1="110" x2="760" y2="110" stroke="#E5E7EB" stroke-width="1"/>
          <line x1="40" y1="55" x2="760" y2="55" stroke="#E5E7EB" stroke-width="1"/>

          <!-- Linha de evolução dinâmica -->
          <polyline
            :points="evolutionPoints"
            fill="none"
            stroke="#007AB8"
            stroke-width="3"
          />

          <!-- Pontos nos meses (dinâmicos e clicáveis) -->
          <circle
            v-for="(total, index) in monthlyData"
            :key="'circle-' + index"
            :cx="monthXPositions[index]"
            :cy="getYPosition(total)"
            :r="selectedMonth === index ? 8 : 5"
            :fill="selectedMonth === index ? '#0056A3' : '#007AB8'"
            :stroke="selectedMonth === index ? '#003D75' : 'none'"
            :stroke-width="selectedMonth === index ? 2 : 0"
            class="cursor-pointer transition-all duration-200 hover:r-7"
            style="cursor: pointer;"
            @click="selectMonth(index)"
          />

          <!-- Área clicável maior (invisível) para facilitar o click -->
          <circle
            v-for="(total, index) in monthlyData"
            :key="'hitbox-' + index"
            :cx="monthXPositions[index]"
            :cy="getYPosition(total)"
            r="15"
            fill="transparent"
            style="cursor: pointer;"
            @click="selectMonth(index)"
          />

          <!-- Tooltip do mês selecionado -->
          <template v-if="selectedMonth !== null && monthlyData[selectedMonth] !== undefined">
            <rect
              :x="monthXPositions[selectedMonth] - 25"
              :y="getYPosition(monthlyData[selectedMonth]) - 55"
              width="50"
              height="35"
              fill="#1F2937"
              opacity="0.95"
              rx="4"
            />
            <text
              :x="monthXPositions[selectedMonth]"
              :y="getYPosition(monthlyData[selectedMonth]) - 39"
              text-anchor="middle"
              fill="white"
              font-size="11"
              font-weight="600"
            >
              {{ monthNames[selectedMonth] }}
            </text>
            <text
              :x="monthXPositions[selectedMonth]"
              :y="getYPosition(monthlyData[selectedMonth]) - 39"
              text-anchor="middle"
              fill="white"
              font-size="13"
              font-weight="bold"
              dy="14"
            >
              {{ monthlyData[selectedMonth] }}
            </text>
          </template>

          <!-- Labels dos meses no eixo X -->
          <text
            v-for="(month, index) in monthNames"
            :key="'month-' + index"
            :x="monthXPositions[index]"
            y="240"
            text-anchor="middle"
            :fill="selectedMonth === index ? '#007AB8' : '#6B7280'"
            :font-weight="selectedMonth === index ? 'bold' : 'normal'"
            font-size="11"
          >
            {{ month }}
          </text>

          <!-- Labels do eixo Y (dinâmicos) -->
          <text x="30" y="225" text-anchor="end" fill="#6B7280" font-size="11">{{ yAxisLabels[0] }}</text>
          <text x="30" y="170" text-anchor="end" fill="#6B7280" font-size="11">{{ yAxisLabels[1] }}</text>
          <text x="30" y="115" text-anchor="end" fill="#6B7280" font-size="11">{{ yAxisLabels[2] }}</text>
          <text x="30" y="60" text-anchor="end" fill="#6B7280" font-size="11">{{ yAxisLabels[3] }}</text>
        </svg>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { relatoriosService, parlamentaresService } from '@/services/api'

const loading = ref(false)
const selectedMonth = ref(null)
const selectedCategory = ref(null)
const isInitialLoad = ref(true)

const filters = ref({
  date_start: '2026-01-01',
  date_end: '2026-12-31',
  author_id: 'todos'
})

const dataReport = ref({
  total: 0,
  average_per_author: 0,
  most_sent_category: { total: 0, name: '' },
  least_sent_category: { total: 0, name: '' },
  top_authors: [],
  per_month: [],
  per_category: []
})

const todosParlamentares = ref([])

const isParlamentarSelecionado = computed(() => {
  return filters.value.author_id !== 'todos'
})

const textoTotalDocumentos = computed(() => {
  return isParlamentarSelecionado.value
    ? 'Total de documentos enviados por este parlamentar'
    : 'Total de documentos'
})

const textoMedia = computed(() => {
  return isParlamentarSelecionado.value
    ? 'Média de documentos criados por este parlamentar'
    : 'Média de documentos criados por parlamentar'
})

const tituloRanking = computed(() => {
  return isParlamentarSelecionado.value
    ? 'Sua colocação no ranking'
    : `Ranking Top ${dataReport.value.top_authors?.length || 0}`
})

const subtituloRanking = computed(() => {
  return isParlamentarSelecionado.value
    ? 'Posição do parlamentar entre todos'
    : 'Parlamentares que mais produziram documentos'
})

const maxRankingValue = computed(() => {
  if (!dataReport.value.top_authors || dataReport.value.top_authors.length === 0) {
    return 1
  }
  return Math.max(...dataReport.value.top_authors.map(item => item.total))
})

const categoryData = computed(() => {
  const categories = dataReport.value.per_category || []
  return categories
    .sort((a, b) => b.total - a.total)
    .slice(0, 8)
})

const maxCategoryValue = computed(() => {
  if (categoryData.value.length === 0) return 100
  return Math.max(...categoryData.value.map(cat => cat.total))
})

const getCategoryX = (index) => {
  const spacing = 60
  return 60 + (index * spacing)
}

const getCategoryHeight = (total) => {
  const maxHeight = 210
  return (total / maxCategoryValue.value) * maxHeight
}

const getCategoryY = (total) => {
  return 280 - getCategoryHeight(total)
}

const calculateWidth = (total) => {
  return (total / maxRankingValue.value) * 100
}

const monthlyData = computed(() => {
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthData = dataReport.value.per_month?.find(m => m.month === i + 1)
    return monthData ? monthData.total : 0
  })
  return months
})

const maxMonthlyValue = computed(() => {
  const max = Math.max(...monthlyData.value)
  return max > 0 ? max : 30
})

watch(monthlyData, (newData) => {
  if (newData.length > 0 && selectedMonth.value === null) {
    const maxIndex = newData.indexOf(Math.max(...newData))
    selectedMonth.value = maxIndex
  }
}, { immediate: true })

watch(categoryData, (newData) => {
  if (newData.length > 0) {

    if (selectedCategory.value === null || selectedCategory.value >= newData.length) {
      selectedCategory.value = 0
    }
  } else {

    selectedCategory.value = null
  }
}, { immediate: true })

watch(() => filters.value.author_id, () => {

  if (isInitialLoad.value) {
    return
  }
  handleSearch()
})

const getYPosition = (total) => {
  const graphHeight = 165
  const percentage = total / maxMonthlyValue.value
  return 220 - (percentage * graphHeight)
}

const monthXPositions = [60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720]

const evolutionPoints = computed(() => {
  return monthlyData.value
    .map((total, index) => `${monthXPositions[index]},${getYPosition(total)}`)
    .join(' ')
})

const yAxisLabels = computed(() => {
  const max = maxMonthlyValue.value
  return [
    0,
    Math.round(max / 3),
    Math.round((max * 2) / 3),
    max
  ]
})

const selectMonth = (index) => {
  selectedMonth.value = index
}

const selectCategory = (index) => {
  selectedCategory.value = index
}

const monthNames = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

onMounted(() => {
  getRelatorios()
  getParlamentares()
  setTimeout(() => {
    isInitialLoad.value = false
  }, 100)
})

const getParlamentares = async () => {
  try {
    const response = await parlamentaresService.get()
    todosParlamentares.value = response.users.filter(user => {
      const status = user.status_user
      return status === 1
    })
  } catch (error) {
    console.error('Erro ao buscar parlamentares:', error)
  }
}

const getRelatorios = async (params = {}) => {
  loading.value = true
  try {
    const response = await relatoriosService.get(params)
    console.log('Relatórios obtidos:', response.data)
    dataReport.value = response.data
  } catch (error) {
    console.error('Erro ao buscar relatórios:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  const params = {
    date_start: filters.value.date_start,
    date_end: filters.value.date_end
  }

  if (filters.value.author_id !== 'todos') {
    params.author_id = filters.value.author_id
  }

  console.log('Buscando relatórios com parâmetros:', params)
  getRelatorios(params)
}

const clearFilters = () => {
  const currentYear = new Date().getFullYear()
  filters.value = {
    date_start: `2025-01-01`,
    date_end: `${currentYear}-12-31`,
    author_id: 'todos'
  }

  handleSearch()
  getRelatorios()
}
</script>
