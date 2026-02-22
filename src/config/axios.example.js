/**
 * CONFIGURAÇÃO AXIOS (OPCIONAL)
 * 
 * Se você preferir usar Axios ao invés do Fetch API nativo,
 * instale o Axios:
 * 
 * npm install axios
 * 
 * E use esta configuração:
 */

/*
import axios from 'axios'
import { useTenantStore } from '@/stores/tenant'

// Criar instância do Axios
export const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de requisição - adiciona a baseURL do tenant atual
api.interceptors.request.use(
  (config) => {
    const tenantStore = useTenantStore()
    
    // Define a baseURL dinamicamente baseado no tenant
    config.baseURL = tenantStore.apiBaseUrl
    
    // Adicionar token de autenticação se existir
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de resposta - tratamento de erros
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // Tratamento de erros comuns
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Não autorizado - redirecionar para login
          console.error('Não autorizado. Redirecionando para login...')
          // router.push('/login')
          break
        
        case 403:
          // Proibido
          console.error('Acesso proibido')
          break
        
        case 404:
          // Não encontrado
          console.error('Recurso não encontrado')
          break
        
        case 422:
          // Erro de validação
          console.error('Erro de validação:', error.response.data)
          break
        
        case 500:
          // Erro interno do servidor
          console.error('Erro interno do servidor')
          break
        
        default:
          console.error('Erro na requisição:', error.message)
      }
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      console.error('Sem resposta do servidor')
    } else {
      // Erro ao configurar a requisição
      console.error('Erro na configuração da requisição:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default api
*/

/**
 * EXEMPLOS DE USO COM AXIOS
 */

/*
import api from '@/config/axios'

// GET
const users = await api.get('/users')

// POST
const newUser = await api.post('/users', {
  name: 'João',
  email: 'joao@example.com'
})

// PUT
const updated = await api.put('/users/1', {
  name: 'João Silva'
})

// DELETE
await api.delete('/users/1')

// Upload de arquivo
const formData = new FormData()
formData.append('file', file)
await api.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
*/

/**
 * USO EM COMPOSABLE
 */

/*
import { ref } from 'vue'
import api from '@/config/axios'

export function useUsers() {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    
    try {
      users.value = await api.get('/users')
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const createUser = async (userData) => {
    loading.value = true
    error.value = null
    
    try {
      const newUser = await api.post('/users', userData)
      users.value.push(newUser)
      return newUser
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser
  }
}
*/
