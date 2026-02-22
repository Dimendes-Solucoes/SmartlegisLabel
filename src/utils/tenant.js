import { TENANTS_CONFIG, DOMAIN_TO_TENANT } from '@/config/tenants.config'

export function detectTenant() {

  if (typeof window === 'undefined') {
    return 'default'
  }

  const hostname = window.location.hostname

  if (DOMAIN_TO_TENANT[hostname]) {
    return DOMAIN_TO_TENANT[hostname]
  }

  const subdomain = hostname.split('.')[0]

  if (TENANTS_CONFIG[subdomain]) {
    return subdomain
  }

  return 'default'
}

export function getTenantConfig() {
  const tenantId = detectTenant()
  return TENANTS_CONFIG[tenantId] || TENANTS_CONFIG.default
}

export function getApiUrl() {
  return getTenantConfig().apiUrl
}

export function getApiBaseUrl() {
  return getTenantConfig().apiBaseUrl
}

export function isFeatureEnabled(featureName) {
  const config = getTenantConfig()
  return config.features?.[featureName] ?? false
}

export function getTenantTheme() {
  return getTenantConfig().theme
}
