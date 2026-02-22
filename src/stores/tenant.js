import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { detectTenant, getTenantConfig } from '@/utils/tenant'

/**
 * Store para gerenciar configurações do tenant atual
 */
export const useTenantStore = defineStore('tenant', () => {
  // State
  const tenantId = ref(detectTenant())
  const config = ref(getTenantConfig())

  // Getters
  const name = computed(() => config.value.name)
  const fullName = computed(() => config.value.fullName)
  const subdomain = computed(() => config.value.subdomain)
  const apiUrl = computed(() => config.value.apiUrl)
  const apiBaseUrl = computed(() => config.value.apiBaseUrl)
  const theme = computed(() => config.value.theme)
  const features = computed(() => config.value.features)

  // Actions
  
  /**
   * Força a redetecção do tenant (útil após mudanças de URL)
   */
  function refreshTenant() {
    tenantId.value = detectTenant()
    config.value = getTenantConfig()
  }

  /**
   * Verifica se uma feature está habilitada
   * @param {string} featureName
   * @returns {boolean}
   */
  function isFeatureEnabled(featureName) {
    return features.value?.[featureName] ?? false
  }

  /**
   * Monta URL completa da API concatenando com endpoint
   * @param {string} endpoint - Endpoint da API (ex: '/users')
   * @returns {string} URL completa
   */
  function buildApiUrl(endpoint) {
    const base = apiBaseUrl.value.endsWith('/') 
      ? apiBaseUrl.value.slice(0, -1) 
      : apiBaseUrl.value
    
    const path = endpoint.startsWith('/') 
      ? endpoint 
      : `/${endpoint}`
    
    return `${base}${path}`
  }

  return {
    // State
    tenantId,
    config,
    
    // Getters
    name,
    fullName,
    subdomain,
    apiUrl,
    apiBaseUrl,
    theme,
    features,
    
    // Actions
    refreshTenant,
    isFeatureEnabled,
    buildApiUrl,
  }
})
