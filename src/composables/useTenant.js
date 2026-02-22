import { computed } from 'vue'
import { useTenantStore } from '@/stores/tenant'

/**
 * Composable para usar funcionalidades de tenant em componentes Vue
 * 
 * @example
 * ```js
 * import { useTenant } from '@/composables/useTenant'
 * 
 * const { tenantName, apiUrl, buildApiUrl, isFeatureEnabled } = useTenant()
 * ```
 */
export function useTenant() {
  const tenantStore = useTenantStore()

  return {
    // Dados do tenant
    tenantId: computed(() => tenantStore.tenantId),
    tenantName: computed(() => tenantStore.name),
    tenantFullName: computed(() => tenantStore.fullName),
    subdomain: computed(() => tenantStore.subdomain),
    
    // URLs
    apiUrl: computed(() => tenantStore.apiUrl),
    apiBaseUrl: computed(() => tenantStore.apiBaseUrl),
    
    // Tema
    theme: computed(() => tenantStore.theme),
    primaryColor: computed(() => tenantStore.theme.primaryColor),
    logo: computed(() => tenantStore.theme.logo),
    brasao: computed(() => tenantStore.theme.brasao),
    
    // Features
    features: computed(() => tenantStore.features),
    
    // Métodos
    buildApiUrl: tenantStore.buildApiUrl,
    isFeatureEnabled: tenantStore.isFeatureEnabled,
    refreshTenant: tenantStore.refreshTenant,
  }
}

/**
 * Composable para fazer requisições HTTP com a API do tenant
 * 
 * @example
 * ```js
 * const { get, post, put, delete: del } = useTenantApi()
 * const users = await get('/users')
 * ```
 */
export function useTenantApi() {
  const tenantStore = useTenantStore()

  /**
   * Faz requisição GET
   */
  async function get(endpoint, options = {}) {
    const url = tenantStore.buildApiUrl(endpoint)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  /**
   * Faz requisição POST
   */
  async function post(endpoint, data, options = {}) {
    const url = tenantStore.buildApiUrl(endpoint)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  /**
   * Faz requisição PUT
   */
  async function put(endpoint, data, options = {}) {
    const url = tenantStore.buildApiUrl(endpoint)
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  /**
   * Faz requisição DELETE
   */
  async function del(endpoint, options = {}) {
    const url = tenantStore.buildApiUrl(endpoint)
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  return {
    get,
    post,
    put,
    delete: del,
  }
}
