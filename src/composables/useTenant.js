import { computed } from 'vue'
import { useTenantStore } from '@/stores/tenant'

export function useTenant() {
  const tenantStore = useTenantStore()

  return {

    tenantId: computed(() => tenantStore.tenantId),
    tenantName: computed(() => tenantStore.name),
    tenantFullName: computed(() => tenantStore.fullName),
    subdomain: computed(() => tenantStore.subdomain),

    apiUrl: computed(() => tenantStore.apiUrl),
    apiBaseUrl: computed(() => tenantStore.apiBaseUrl),

    theme: computed(() => tenantStore.theme),
    primaryColor: computed(() => tenantStore.theme.primaryColor),
    logo: computed(() => tenantStore.theme.logo),
    brasao: computed(() => tenantStore.theme.brasao),

    features: computed(() => tenantStore.features),

    buildApiUrl: tenantStore.buildApiUrl,
    isFeatureEnabled: tenantStore.isFeatureEnabled,
    refreshTenant: tenantStore.refreshTenant,
  }
}

export function useTenantApi() {
  const tenantStore = useTenantStore()

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
