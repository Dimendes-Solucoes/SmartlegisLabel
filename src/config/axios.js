import axios from 'axios'
import { useTenantStore } from '@/stores/tenant'
import { convertToS3Url } from '@/utils/image-url'

const api = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    try {
      const tenantStore = useTenantStore()

      config.baseURL = tenantStore.apiBaseUrl

      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

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

function convertImageUrls(data, imageFields = ['foto', 'imagem', 'image', 'brasao', 'url_foto', 'avatar', 'thumbnail', 'banner']) {
  if (!data) return data

  if (Array.isArray(data)) {
    return data.map(item => convertImageUrls(item, imageFields))
  }

  if (typeof data === 'object') {
    const converted = {}

    for (const [key, value] of Object.entries(data)) {

      if (imageFields.includes(key) && typeof value === 'string') {
        const originalUrl = value
        const convertedUrl = convertToS3Url(value)

        if (import.meta.env.DEV && originalUrl !== convertedUrl) {
          console.log(`🔄 Campo '${key}' convertido:`, {
            de: originalUrl,
            para: convertedUrl
          })
        }

        converted[key] = convertedUrl
      }

      else if (typeof value === 'object' && value !== null) {
        converted[key] = convertImageUrls(value, imageFields)
      }

      else {
        converted[key] = value
      }
    }

    return converted
  }

  return data
}

api.interceptors.response.use(
  (response) => {

    if (import.meta.env.DEV) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      })
    }

    const convertedData = convertImageUrls(response.data)

    if (import.meta.env.DEV && convertedData !== response.data) {
      console.log('🔄 URLs de imagens convertidas para S3')
    }

    return convertedData
  },
  (error) => {

    if (error.response) {
      const status = error.response.status
      const url = error.config?.url || 'URL desconhecida'

      console.error(`❌ API Error [${status}]:`, {
        url,
        message: error.message,
        data: error.response.data,
      })

      switch (status) {
        case 401:

          localStorage.removeItem('auth_token')

          console.warn('Sessão expirada. Faça login novamente.')
          break

        case 403:

          console.error('Você não tem permissão para acessar este recurso.')
          break

        case 404:

          console.error('Recurso não encontrado:', url)
          break

        case 422:

          console.error('Erro de validação:', error.response.data)
          break

        case 429:

          console.error('Muitas requisições. Tente novamente mais tarde.')
          break

        case 500:
        case 502:
        case 503:
        case 504:

          console.error('Erro no servidor. Tente novamente mais tarde.')
          break

        default:
          console.error('Erro na requisição:', error.message)
      }

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

      console.error('❌ Sem resposta do servidor:', error.message)

      const customError = new Error('Servidor não respondeu. Verifique sua conexão.')
      customError.originalError = error
      return Promise.reject(customError)
    } else {

      console.error('❌ Erro na configuração da requisição:', error.message)
      return Promise.reject(error)
    }
  }
)

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('auth_token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem('auth_token')
    delete api.defaults.headers.common['Authorization']
  }
}

export function clearAuthToken() {
  setAuthToken(null)
}

export function getAuthToken() {
  return localStorage.getItem('auth_token')
}

export default api
