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

    <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-4 border-gray-200 border-t-brand-blue rounded-full animate-spin"></div>
          <p class="text-gray-600 text-sm font-medium">Carregando comissões...</p>
        </div>
      </div>

      <template v-else>
        <div class="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200">
          <div class="col-span-8 text-sm font-medium text-gray-700">Comissão</div>
          <div class="col-span-3 text-sm font-medium text-gray-700">Situação</div>
          <div class="col-span-1"></div>
        </div>

        <div
          v-for="comissao in paginatedComissoes"
          :key="comissao.id"
          class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 items-center cursor-pointer transition-colors"
          @click="goToComissao(comissao.id)"
        >
        <div class="col-span-8 text-sm text-gray-900">{{ comissao.comission_name }}</div>
        <div class="col-span-3">
          <span
            v-if="comissao.is_active === true"
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
      </template>
    </div>

    <div v-if=!loading class="flex items-center justify-between">
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
const selectedis_active = ref('')
const showExtintas = ref(false)
const currentPage = ref(1)
const perPage = ref(10)
const loading = ref(true)

const getComissoes = async () => {
  loading.value = true
  try {
    const response = await comissoesService.get({
      search: searchQuery.value,
      is_active: selectedis_active.value,
      showExtintas: showExtintas.value
    })
    console.log(response);
    comissoes.value = response.data
  } catch (error) {
    console.error('Erro ao buscar comissões:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getComissoes()
})

const comissoes = ref([])

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
  router.push({ name: 'comissao-detalhe', params: { id } })
}
</script>
