import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MesaDiretoraView from '@/views/MesaDiretoraView.vue'
import ComissoesView from '@/views/ComissoesView.vue'
import ParlamentaresView from '@/views/ParlamentaresView.vue'
import PautasSessoesView from '@/views/PautasSessoesView.vue'
import PautaDetalheView from '@/views/PautaDetalheView.vue'
import SessaoPlenariaView from '@/views/SessaoPlenariaView.vue'
import SessaoDetalheView from '@/views/SessaoDetalheView.vue'
import MateriasLegislativasView from '@/views/MateriasLegislativasView.vue'
import MateriaDetalheView from '@/views/MateriaDetalheView.vue'
import NormasJuridicasView from '@/views/NormasJuridicasView.vue'
import NormaDetalheView from '@/views/NormaDetalheView.vue'
import RelatoriosView from '@/views/RelatoriosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mesa-diretora',
      name: 'mesa-diretora',
      component: MesaDiretoraView
    },
    {
      path: '/comissoes',
      name: 'comissoes',
      component: ComissoesView
    },
    {
      path: '/parlamentares',
      name: 'parlamentares',
      component: ParlamentaresView
    },
    {
      path: '/pautas-sessoes',
      name: 'pautas-sessoes',
      component: PautasSessoesView
    },
    {
      path: '/pautas-sessoes/:id',
      name: 'pauta-detalhe',
      component: PautaDetalheView
    },
    {
      path: '/sessao-plenaria',
      name: 'sessao-plenaria',
      component: SessaoPlenariaView
    },
    {
      path: '/sessao-plenaria/:id/votacao',
      name: 'sessao-votacao',
      component: SessaoDetalheView
    },
    {
      path: '/materias-legislativas',
      name: 'materias-legislativas',
      component: MateriasLegislativasView
    },
    {
      path: '/materias-legislativas/:id',
      name: 'materia-detalhe',
      component: MateriaDetalheView
    },
    {
      path: '/normas-juridicas',
      name: 'normas-juridicas',
      component: NormasJuridicasView
    },
    {
      path: '/normas-juridicas/:id',
      name: 'norma-detalhe',
      component: NormaDetalheView
    },
    {
      path: '/relatorios',
      name: 'relatorios',
      component: RelatoriosView
    }
  ],
})

export default router
