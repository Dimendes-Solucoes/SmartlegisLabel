import { ref, computed, onMounted } from 'vue'
import { authService } from '@/services/api'
import { 
  getToken, 
  hasToken, 
  removeToken, 
  isTokenExpired,
  getUserFromToken 
} from '@/utils/auth-token'

/**
 * Composable para gerenciar autenticação
 * 
 * @example
 * ```js
 * const { isAuthenticated, user, login, logout } = useAuth()
 * ```
 */
export function useAuth() {
  const token = ref(getToken())
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Verifica se está autenticado
  const isAuthenticated = computed(() => {
    if (!token.value) return false
    return !isTokenExpired(token.value)
  })

  /**
   * Carrega informações do usuário do token
   */
  function loadUserFromToken() {
    const userData = getUserFromToken()
    if (userData) {
      user.value = userData
    }
  }

  /**
   * Faz login
   */
  async function login(email, password) {
    loading.value = true
    error.value = null

    try {
      const response = await authService.login(email, password)
      token.value = getToken()
      loadUserFromToken()
      return response
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Faz logout
   */
  async function logout() {
    loading.value = true
    error.value = null

    try {
      await authService.logout()
      token.value = null
      user.value = null
    } catch (err) {
      error.value = err
      // Remove token localmente mesmo se falhar no servidor
      removeToken()
      token.value = null
      user.value = null
    } finally {
      loading.value = false
    }
  }

  /**
   * Busca informações do usuário autenticado
   */
  async function fetchUser() {
    if (!isAuthenticated.value) return null

    loading.value = true
    error.value = null

    try {
      const userData = await authService.me()
      user.value = userData
      return userData
    } catch (err) {
      error.value = err
      // Se falhar, pode ser que o token esteja inválido
      if (err.status === 401) {
        removeToken()
        token.value = null
        user.value = null
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Atualiza o token
   */
  async function refreshToken() {
    loading.value = true
    error.value = null

    try {
      const response = await authService.refreshToken()
      token.value = getToken()
      loadUserFromToken()
      return response
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Carregar usuário do token ao montar
  onMounted(() => {
    if (isAuthenticated.value) {
      loadUserFromToken()
    }
  })

  return {
    // Estado
    token: computed(() => token.value),
    user: computed(() => user.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    isAuthenticated,

    // Métodos
    login,
    logout,
    fetchUser,
    refreshToken,
  }
}
