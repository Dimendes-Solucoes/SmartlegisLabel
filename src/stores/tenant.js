import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { detectTenant, getTenantConfig } from '@/utils/tenant'

export const useTenantStore = defineStore('tenant', () => {

  const tenantId = ref(detectTenant())
  const config = ref(getTenantConfig())

  const name = computed(() => config.value.name)
  const fullName = computed(() => config.value.fullName)
  const subdomain = computed(() => config.value.subdomain)
  const apiUrl = computed(() => config.value.apiUrl)
  const apiBaseUrl = computed(() => config.value.apiBaseUrl)
  const theme = computed(() => config.value.theme)
  const features = computed(() => config.value.features)

  function refreshTenant() {
    tenantId.value = detectTenant()
    config.value = getTenantConfig()
  }

  function isFeatureEnabled(featureName) {
    return features.value?.[featureName] ?? false
  }

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

    tenantId,
    config,

    name,
    fullName,
    subdomain,
    apiUrl,
    apiBaseUrl,
    theme,
    features,

    refreshTenant,
    isFeatureEnabled,
    buildApiUrl,
  }
})
