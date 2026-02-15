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
        <li class="text-gray-900 font-medium">Mesa diretora</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Mesa diretora</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Legislatura <span class="text-red-500">*</span>
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
          Período
        </label>
        <div class="relative">
          <input
            type="text"
            v-model="period"
            placeholder="DD / MM / AAAA a DD / MM / AAAA"
            class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent pr-10"
          />
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MemberCard
        v-for="member in members"
        :key="member.id"
        :member="member"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MemberCard from '@/components/MemberCard.vue'

const selectedLegislatura = ref('20')
const period = ref('')

const members = ref([
  {
    id: 1,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    position: 'Presidente',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 2,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    position: 'Presidente',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 3,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    position: 'Presidente',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 4,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    position: 'Presidente',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 5,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    position: 'Presidente',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 6,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    position: 'Presidente',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 7,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    position: 'Presidente',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  },
  {
    id: 8,
    name: 'Tiago Pereira Agnaldo Silvestre Soares',
    position: 'Presidente',
    party: 'MDB',
    photo: '/images/member-placeholder.jpg',
    partyLogo: '/images/party-mdb.png'
  }
])
</script>
