<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <div class="mb-10">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">Processos legislativos</h2>
      <p class="text-gray-600">
        Aqui você encontra os principais documentos da sua câmara municipal.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProcessCard
        v-for="item in processItems"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :image="item.image"
        :route="item.route"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProcessCard from '@/components/ProcessCard.vue'

const processItems = ref([
  {
    id: 1,
    title: 'Mesa diretora',
    description: 'Órgão que conduz as sessões e administra os trabalhos legislativos e administrativos da Câmara.',
    image: new URL('@/assets/img/mesaDiretora.png', import.meta.url).href,
    route: '/mesa-diretora'
  },
  {
    id: 2,
    title: 'Comissões',
    description: 'Grupos de vereadores que analisam matérias e emitem pareceres antes da votação em plenário.',
    image: new URL('@/assets/img/comissoes.png', import.meta.url).href,
    route: '/comissoes'
  },
  {
    id: 3,
    title: 'Parlamentares',
    description: 'Vereadores eleitos que representam a população, propõem leis e fiscalizam o Executivo.',
    image: new URL('@/assets/img/parlamentar.png', import.meta.url).href,
    route: '/parlamentares'
  },
  {
    id: 4,
    title: 'Pautas das sessões',
    description: 'Relação das matérias que serão discutidas e votadas em cada sessão.',
    image: new URL('@/assets/img/pautasDasSessoes.png', import.meta.url).href,
    route: '/pautas-sessoes'
  },
  {
    id: 5,
    title: 'Sessão plenária',
    description: 'Reunião oficial onde os vereadores debatem e votam as proposições.',
    image: new URL('@/assets/img/sessoesPlenarias.png', import.meta.url).href,
    route: '/sessao-plenaria'
  },
  {
    id: 6,
    title: 'Matérias legislativas',
    description: 'Proposições apresentadas na Câmara, como projetos de lei e outras iniciativas.',
    image: new URL('@/assets/img/materiasLegislaticas.png', import.meta.url).href,
    route: '/materias-legislativas'
  },
  {
    id: 7,
    title: 'Normas jurídicas',
    description: 'Leis e atos normativos aprovados pelo Legislativo municipal.',
    image: new URL('@/assets/img/normasJuridicas.png', import.meta.url).href,
    route: '/normas-juridicas'
  },
  {
    id: 8,
    title: 'Relatórios',
    description: 'Documentos que apresentam dados e resultados das atividades legislativas.',
    image: new URL('@/assets/img/relatorios.png', import.meta.url).href,
    route: '/relatorios'
  }
])
</script>
