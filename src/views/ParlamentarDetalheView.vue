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
          <router-link to="/parlamentares" class="hover:text-brand-blue">
            Parlamentares
          </router-link>
        </li>
        <li>›</li>
        <li class="text-gray-900 font-medium">Parlamentar</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Parlamentar</h1>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-500">Carregando...</p>
    </div>

    <div v-else-if="parlamentar" class="rounded-lg shadow-sm p-8 mb-6">
      <div class="flex items-start gap-8 mb-8 bg-gray-100 p-6 rounded-xl">
        <!-- Coluna Esquerda: Foto e Informações -->
        <div class="flex gap-6">
          <div class="flex-shrink-0">
            <img
              :src="parlamentar.path_image ? S3_HOST + parlamentar.path_image : '/images/member-placeholder.jpg'"
              :alt="parlamentar.nickname"
              class="w-64 h-64 rounded-lg object-cover"
            />
          </div>

          <div class="flex flex-col justify-between py-2">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                {{ parlamentar.name }}
              </h2>

              <div class="space-y-3 mb-6">
                <div class="text-sm">
                  <span class="font-semibold text-gray-900">Data de nascimento:</span>
                  <span class="text-gray-700 ml-1">
                    {{ parlamentar.birthdate ? formatDate(parlamentar.birthdate) : 'Não informado' }}
                  </span>
                </div>

                <div class="text-sm">
                  <span class="font-semibold text-gray-900">Mandato atual:</span>
                  <span class="text-gray-700 ml-1">
                    {{ mandatoAtual }}
                  </span>
                </div>

                <div class="text-sm flex items-center gap-2">
                  <span class="font-semibold text-gray-900">Cargo:</span>
                  <span class="px-3 py-1 text-xs font-medium rounded-full text-white" style="background-color: #007AB8;">
                    {{ parlamentar.user_category?.name || 'Não informado' }}
                  </span>
                </div>

                <div class="text-sm">
                  <span class="font-semibold text-gray-900">Partido:</span>
                  <span class="text-gray-700 ml-1">
                    {{ parlamentar?.category_party?.name_party || 'Não informado' }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="parlamentar?.category_party?.logo" class="mt-2">
              <img
                :src="S3_HOST + parlamentar.category_party.logo"
                :alt="`Logo ${parlamentar.category_party.name_party}`"
                class="h-16 object-contain"
              />
            </div>
          </div>
        </div>

        <!-- Divider Vertical -->
        <div class="w-px bg-gray-300 self-stretch mx-4"></div>

        <!-- Coluna Direita: Resumo -->
        <div class="flex-1 py-2">
          <h3 class="text-sm font-semibold text-gray-900 mb-3">Resumo</h3>
          <p class="text-sm text-gray-700 leading-relaxed">
            {{ parlamentar?.summary || 'Não há resumo disponível para este parlamentar.' }}
          </p>
        </div>
      </div>

      <div class="border-b border-gray-200 mb-6">
        <div class="flex gap-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-brand-blue text-brand-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div v-if="activeTab === 'mandatos'">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Mandatos</h3>
        <div v-if="parlamentar.legislatures && parlamentar.legislatures.length > 0" class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Legislatura
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Nº Votos
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Titular?
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Início do mandato
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Fim do mandato
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Relatorias
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="legislatura in parlamentar.legislatures" :key="legislatura.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ legislatura.title || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  00/00/0000
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Sim
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  00/00/0000
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  00/00/0000
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  00/00/0000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          Nenhum mandato encontrado
        </div>
      </div>

      <div v-if="activeTab === 'mesa-diretora'">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Mesa diretora</h3>
        <div class="text-center py-8 text-gray-500">
          Nenhum registro encontrado
        </div>
      </div>

      <div v-if="activeTab === 'comissoes'">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Comissões</h3>
        <div class="text-center py-8 text-gray-500">
          Nenhuma comissão encontrada
        </div>
      </div>

      <div v-if="activeTab === 'proposicoes'">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Proposições</h3>
        <div class="text-center py-8 text-gray-500">
          Nenhuma proposição encontrada
        </div>
      </div>

      <div v-if="activeTab === 'relatorias'">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Relatorias</h3>
        <div class="text-center py-8 text-gray-500">
          Nenhuma relatoria encontrada
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500">Parlamentar não encontrado</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { parlamentaresService } from '@/services/api'

const route = useRoute()
const parlamentarId = route.params.id
const S3_HOST = import.meta.env.VITE_S3_HOST

const parlamentar = ref(null)
const loading = ref(true)
const activeTab = ref('mandatos')

const tabs = [
  { id: 'mandatos', label: 'Mandatos' },
  { id: 'mesa-diretora', label: 'Mesa diretora' },
  { id: 'comissoes', label: 'Comissões' },
  { id: 'proposicoes', label: 'Proposições' },
  { id: 'relatorias', label: 'Relatorias' }
]

const mandatoAtual = computed(() => {
  if (!parlamentar.value?.legislatures || parlamentar.value.legislatures.length === 0) {
    return 'Não informado'
  }

  const atual = parlamentar.value.legislatures[0]
  return atual.title || 'Não informado'
})

const formatDate = (dateString) => {
  if (!dateString) return 'Não informado'

  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const getParlamentar = async () => {
  try {
    loading.value = true
    const response = await parlamentaresService.buscarPorId(parlamentarId)
    console.log('Resposta do servidor:', response)
    parlamentar.value = response.user
  } catch (error) {
    console.error('Erro ao buscar parlamentar:', error)
    parlamentar.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getParlamentar()
})
</script>
