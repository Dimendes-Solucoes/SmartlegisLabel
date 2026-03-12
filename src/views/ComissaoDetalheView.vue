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
          <router-link to="/comissoes" class="hover:text-brand-blue">
            Comissões
          </router-link>
        </li>
        <li>›</li>
        <li class="text-gray-900 font-medium">{{ comissao?.comission_name || 'Comissão' }}</li>
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
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ comissao?.comission_name }}</h1>
          <span
            v-if="comissao"
            class="inline-flex mt-2 px-3 py-1 rounded-full text-xs font-medium text-white"
            :style="comissao.is_active ? 'background-color: #10B981;' : 'background-color: #E5E7EB; color: #374151;'"
          >
            {{ comissao.is_active ? 'Ativa' : 'Inativa' }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-4">
        <div class="w-10 h-10 border-4 border-gray-200 border-t-brand-blue rounded-full animate-spin"></div>
        <p class="text-gray-600 text-sm font-medium">Carregando parlamentares...</p>
      </div>
    </div>

    <template v-else>
      <div v-if="parlamentares.length === 0" class="text-center py-12 text-gray-500">
        Nenhum parlamentar encontrado para esta comissão.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="parlamentar in parlamentares"
          :key="parlamentar.id"
          class="rounded-lg shadow-sm p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
          style="background-color: #EFEFEF;"
          @click="goToParlamentar(parlamentar.id)"
        >
          <div class="flex-shrink-0">
            <img
              :src="parlamentar.path_image ? S3_HOST + parlamentar.path_image : '/images/member-placeholder.jpg'"
              :alt="parlamentar.nickname"
              class="w-20 h-20 rounded-full object-cover"
            />
          </div>

          <div class="flex-1">
            <h3 class="text-base font-semibold text-gray-800 mb-2">
              {{ parlamentar.nickname }}
            </h3>
            <span class="px-3 py-1 text-xs font-medium rounded-full inline-block" style="background-color: rgba(0, 122, 184, 0.15); color: #007AB8;">
              {{ parlamentar?.category_party?.name_party || 'Partido não informado' }}
            </span>
          </div>

          <div class="flex-shrink-0">
            <img
              v-if="parlamentar?.category_party?.logo"
              :src="S3_HOST + parlamentar.category_party.logo"
              :alt="`Logo ${parlamentar.category_party?.name_party}`"
              class="h-12 object-contain"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { comissoesService } from '@/services/api'

const router = useRouter()
const route = useRoute()
const S3_HOST = import.meta.env.VITE_S3_HOST

const comissao = ref(null)
const loading = ref(true)

const parlamentares = computed(() => comissao.value?.users ?? [])

const getComissao = async () => {
  loading.value = true
  try {
    const response = await comissoesService.get()
    const id = parseInt(route.params.id)
    comissao.value = response.data.find(c => c.id === id) ?? null
  } catch (error) {
    console.error('Erro ao buscar comissão:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getComissao()
})

const goToParlamentar = (id) => {
  router.push({ name: 'parlamentar-detalhe', params: { id } })
}
</script>
