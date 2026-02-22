import { TENANTS_CONFIG, DOMAIN_TO_TENANT } from '@/config/tenants.config'

/**
 * Detecta o tenant atual baseado na URL
 * @returns {string} O identificador do tenant
 */
export function detectTenant() {
  // Para SSR ou testes
  if (typeof window === 'undefined') {
    return 'default'
  }

  const hostname = window.location.hostname
  
  // Verifica mapeamento direto de domínio
  if (DOMAIN_TO_TENANT[hostname]) {
    return DOMAIN_TO_TENANT[hostname]
  }

  // Extrai o subdomínio (primeira parte do domínio)
  // Ex: jc.smartlegis.net.br -> jc
  const subdomain = hostname.split('.')[0]
  
  // Verifica se existe configuração para esse subdomínio
  if (TENANTS_CONFIG[subdomain]) {
    return subdomain
  }

  // Fallback para configuração padrão
  return 'default'
}

/**
 * Obtém a configuração do tenant atual
 * @returns {Object} Configuração do tenant
 */
export function getTenantConfig() {
  const tenantId = detectTenant()
  return TENANTS_CONFIG[tenantId] || TENANTS_CONFIG.default
}

/**
 * Obtém a URL base da API para o tenant atual
 * @returns {string} URL da API
 */
export function getApiUrl() {
  return getTenantConfig().apiUrl
}

/**
 * Obtém a URL base da API com /api para o tenant atual
 * @returns {string} URL base da API
 */
export function getApiBaseUrl() {
  return getTenantConfig().apiBaseUrl
}

/**
 * Verifica se uma feature está habilitada para o tenant atual
 * @param {string} featureName - Nome da feature
 * @returns {boolean}
 */
export function isFeatureEnabled(featureName) {
  const config = getTenantConfig()
  return config.features?.[featureName] ?? false
}

/**
 * Obtém o tema do tenant atual
 * @returns {Object} Configurações de tema
 */
export function getTenantTheme() {
  return getTenantConfig().theme
}
