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
        <li class="text-gray-900 font-medium">Parlamentares</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Parlamentares</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div>
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
              placeholder="Busque pelo nome do parlamentar..."
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
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Legislatura
        </label>
        <div class="relative">
          <select
            v-model="selectedLegislatura"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="20">20º (0000 a 0000) - Atual</option>
            <option value="19">19º (0000 a 0000)</option>
            <option value="18">18º (0000 a 0000)</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Partido
        </label>
        <div class="relative">
          <select
            v-model="selectedPartido"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          >
            <option value="">Selecione</option>
            <option value="MDB">MDB</option>
            <option value="PT">PT</option>
            <option value="PSDB">PSDB</option>
            <option value="PP">PP</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="parlamentar in parlamentares"
        :key="parlamentar.id"
        class="rounded-lg shadow-sm p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
        style="background-color: #EFEFEF;"
        @click="goToParlamentar(parlamentar.id)"
      >
        <div class="flex-shrink-0">
          <img
            :src="parlamentar.photo || '/images/member-placeholder.jpg'"
            :alt="parlamentar.name"
            class="w-20 h-20 rounded-full object-cover"
          />
        </div>

        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-800 mb-2">
            {{ parlamentar.name }}
          </h3>
          <span class="px-3 py-1 text-xs font-medium rounded-full inline-block" style="background-color: rgba(0, 122, 184, 0.15); color: #007AB8;">
            {{ parlamentar.party }}
          </span>
        </div>

        <div class="flex-shrink-0">
          <img
            :src="parlamentar.partyLogo || '/images/party-mdb.png'"
            :alt="`Logo ${parlamentar.party}`"
            class="h-12 object-contain"
          />
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
const selectedLegislatura = ref('20')
const selectedPartido = ref('')

const parlamentares = ref([
  {
    id: 1,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 2,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 3,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 4,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 5,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 6,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 7,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 8,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  }
])

const handleSearch = () => {
  console.log('Buscando:', searchQuery.value)
}

const goToParlamentar = (id) => {
  console.log('Detalhes do parlamentar:', id)
}
</script>
