import { createApp } from 'vue'
import { useTenantStore } from '@/stores/tenant'

export function Example1_BasicUsage() {
  const tenantStore = useTenantStore()

  console.log('Tenant atual:', tenantStore.name)
  console.log('API URL:', tenantStore.apiUrl)
  console.log('Tema:', tenantStore.theme)

  if (tenantStore.isFeatureEnabled('analytics')) {
    console.log('Analytics está habilitado para este tenant')
  }
}

export async function Example2_ApiRequest() {
  const tenantStore = useTenantStore()

  try {

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

export function Example3_ApplyTheme() {
  const tenantStore = useTenantStore()

  document.documentElement.style.setProperty(
    '--primary-color',
    tenantStore.theme.primaryColor
  )
}

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

    }
  }
}

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

export function Example7_AxiosSetup() {

  console.log('Veja src/config/axios.js para configuração completa do Axios')
}

export function Example8_DirectHelpers() {

  console.log('Veja src/utils/tenant.js para helpers disponíveis')
}
