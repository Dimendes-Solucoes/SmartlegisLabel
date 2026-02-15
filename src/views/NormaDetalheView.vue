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
          <router-link to="/normas-juridicas" class="hover:text-brand-blue">
            Normas jurídicas
          </router-link>
        </li>
        <li>›</li>
        <li class="text-gray-900 font-medium">Detalhar norma jurídica</li>
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
        <h1 class="text-3xl font-bold text-gray-900">Detalhar norma jurídica</h1>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">
        Ato da Mesa Diretora
      </h2>

      <p class="text-sm text-gray-700 mb-6 leading-relaxed">
        DISPÕE SOBRE A NOMEAÇÃO DOS VEREADORES MEMBROS DA COMISSÃO REPRESENTATIVA PARA FUNCIONAMENTO DURANTE O RECESSO PARLAMENTAR.
      </p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div>
          <p class="text-xs text-gray-500 mb-1">Número</p>
          <p class="text-sm font-medium text-gray-900">29/2025</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Data de publicação</p>
          <p class="text-sm font-medium text-gray-900">22/01/2022</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Assunto</p>
          <p class="text-sm font-medium text-gray-900">Comissões Parlamentares</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Situação</p>
          <span class="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white" style="background-color: #10B981;">
            em vigor
          </span>
        </div>
      </div>

      <button class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style="background-color: #007AB8;">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Norma em PDF
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const normaId = route.params.id
</script>
