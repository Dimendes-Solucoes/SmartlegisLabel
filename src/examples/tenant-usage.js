import { createApp } from 'vue'
import { useTenantStore } from '@/stores/tenant'

/**
 * EXEMPLO 1: Uso básico da store de tenant em um componente
 */
export function Example1_BasicUsage() {
  const tenantStore = useTenantStore()
  
  // Acessar informações do tenant
  console.log('Tenant atual:', tenantStore.name)
  console.log('API URL:', tenantStore.apiUrl)
  console.log('Tema:', tenantStore.theme)
  
  // Verificar se uma feature está habilitada
  if (tenantStore.isFeatureEnabled('analytics')) {
    console.log('Analytics está habilitado para este tenant')
  }
}

/**
 * EXEMPLO 2: Fazer requisição para a API do tenant
 */
export async function Example2_ApiRequest() {
  const tenantStore = useTenantStore()
  
  try {
    // Montar URL completa da API
    const url = tenantStore.buildApiUrl('/users')
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro na requisição:', error)
  }
}

/**
 * EXEMPLO 3: Aplicar tema do tenant dinamicamente
 */
export function Example3_ApplyTheme() {
  const tenantStore = useTenantStore()
  
  // Aplicar cor primária do tenant
  document.documentElement.style.setProperty(
    '--primary-color', 
    tenantStore.theme.primaryColor
  )
}

/**
 * EXEMPLO 4: Usar em um componente Vue (Options API)
 */
export const Example4_ComponentOptions = {
  name: 'MyComponent',
  computed: {
    tenantStore() {
      return useTenantStore()
    },
    apiUrl() {
      return this.tenantStore.apiUrl
    },
    tenantName() {
      return this.tenantStore.name
    }
  },
  methods: {
    async loadData() {
      const url = this.tenantStore.buildApiUrl('/data')
      // fazer fetch...
    }
  }
}

/**
 * EXEMPLO 5: Usar em um componente Vue (Composition API)
 */
export function Example5_ComponentComposition() {
  const tenantStore = useTenantStore()
  
  const loadData = async () => {
    const url = tenantStore.buildApiUrl('/data')
    const response = await fetch(url)
    return response.json()
  }
  
  return {
    tenantStore,
    tenantName: tenantStore.name,
    loadData
  }
}

/**
 * EXEMPLO 6: Renderização condicional baseada em features
 */
export const Example6_ConditionalRendering = {
  template: `
    <div>
      <h1>{{ tenantStore.name }}</h1>
      
      <!-- Mostrar apenas se analytics estiver habilitado -->
      <AnalyticsWidget v-if="tenantStore.isFeatureEnabled('analytics')" />
      
      <!-- Mostrar apenas se advancedReports estiver habilitado -->
      <ReportsPanel v-if="tenantStore.isFeatureEnabled('advancedReports')" />
    </div>
  `,
  setup() {
    const tenantStore = useTenantStore()
    return { tenantStore }
  }
}

/**
 * EXEMPLO 7: Plugin Axios com URL dinâmica
 */
export function Example7_AxiosSetup() {
  // import axios from 'axios'
  // import { useTenantStore } from '@/stores/tenant'
  
  // const tenantStore = useTenantStore()
  
  // const api = axios.create({
  //   baseURL: tenantStore.apiBaseUrl,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // })
  
  // return api
  
  console.log('Veja src/config/axios.js para configuração completa do Axios')
}

/**
 * EXEMPLO 8: Usar helpers diretamente (sem Pinia)
 */
export function Example8_DirectHelpers() {
  // import { getApiUrl, isFeatureEnabled, getTenantTheme } from '@/utils/tenant'
  
  // const apiUrl = getApiUrl()
  // const hasAnalytics = isFeatureEnabled('analytics')
  // const theme = getTenantTheme()
  
  // console.log({ apiUrl, hasAnalytics, theme })
  
  console.log('Veja src/utils/tenant.js para helpers disponíveis')
}
