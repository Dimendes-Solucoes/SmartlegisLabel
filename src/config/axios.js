import axios from 'axios'
import { useTenantStore } from '@/stores/tenant'

/**
 * Instância configurada do Axios
 * Usa automaticamente a URL da API do tenant atual
 */

// Criar instância do Axios
const api = axios.create({
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

/**
 * Interceptor de Requisição
 * Adiciona a baseURL do tenant atual e token de autenticação
 */
api.interceptors.request.use(
  (config) => {
    try {
      const tenantStore = useTenantStore()
      
      // Define a baseURL dinamicamente baseado no tenant
      config.baseURL = tenantStore.apiBaseUrl
      
      // Adicionar token de autenticação se existir
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      
      // Log em modo de desenvolvimento
      if (import.meta.env.DEV) {
        console.log('🌐 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.baseURL + config.url,
          tenant: tenantStore.tenantId,
        })
      }
    } catch (error) {
      console.error('Erro ao configurar requisição:', error)
    }
    
    return config
  },
  (error) => {
    console.error('Erro no interceptor de requisição:', error)
    return Promise.reject(error)
  }
)

/**
 * Interceptor de Resposta
 * Trata erros comuns e extrai dados da resposta
 */
api.interceptors.response.use(
  (response) => {
    // Log em modo de desenvolvimento
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      })
    }
    
    // Retorna apenas os dados da resposta
    return response.data
  },
  (error) => {
    // Tratamento de erros baseado no status HTTP
    if (error.response) {
      const status = error.response.status
      const url = error.config?.url || 'URL desconhecida'
      
      // Log do erro
      console.error(`❌ API Error [${status}]:`, {
        url,
        message: error.message,
        data: error.response.data,
      })
      
      // Tratamentos específicos por status
      switch (status) {
        case 401:
          // Não autorizado - limpar token e redirecionar para login
          localStorage.removeItem('auth_token')
          // Se tiver Vue Router, descomentar:
          // router.push('/login')
          console.warn('Sessão expirada. Faça login novamente.')
          break
        
        case 403:
          // Acesso proibido
          console.error('Você não tem permissão para acessar este recurso.')
          break
        
        case 404:
          // Recurso não encontrado
          console.error('Recurso não encontrado:', url)
          break
        
        case 422:
          // Erro de validação
          console.error('Erro de validação:', error.response.data)
          break
        
        case 429:
          // Muitas requisições
          console.error('Muitas requisições. Tente novamente mais tarde.')
          break
        
        case 500:
        case 502:
        case 503:
        case 504:
          // Erros de servidor
          console.error('Erro no servidor. Tente novamente mais tarde.')
          break
        
        default:
          console.error('Erro na requisição:', error.message)
      }
      
      // Criar objeto de erro mais amigável
      const customError = new Error(
        error.response.data?.message || 
        error.response.data?.error || 
        `Erro HTTP ${status}`
      )
      customError.status = status
      customError.data = error.response.data
      customError.originalError = error
      
      return Promise.reject(customError)
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      console.error('❌ Sem resposta do servidor:', error.message)
      
      const customError = new Error('Servidor não respondeu. Verifique sua conexão.')
      customError.originalError = error
      return Promise.reject(customError)
    } else {
      // Erro ao configurar a requisição
      console.error('❌ Erro na configuração da requisição:', error.message)
      return Promise.reject(error)
    }
  }
)

/**
 * Métodos auxiliares para facilitar o uso
 */

/**
 * Define o token de autenticação
 * @param {string} token - Token JWT ou similar
 */
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('auth_token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem('auth_token')
    delete api.defaults.headers.common['Authorization']
  }
}

/**
 * Remove o token de autenticação
 */
export function clearAuthToken() {
  setAuthToken(null)
}

/**
 * Obtém o token de autenticação atual
 * @returns {string|null}
 */
export function getAuthToken() {
  return localStorage.getItem('auth_token')
}

// Exportar a instância configurada do Axios
export default api
