import { ref, computed, onMounted } from 'vue'
import { authService } from '@/services/api'
import {
  getToken,
  hasToken,
  removeToken,
  isTokenExpired,
  getUserFromToken
} from '@/utils/auth-token'

export function useAuth() {
  const token = ref(getToken())
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => {
    if (!token.value) return false
    return !isTokenExpired(token.value)
  })

  function loadUserFromToken() {
    const userData = getUserFromToken()
    if (userData) {
      user.value = userData
    }
  }

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

  async function logout() {
    loading.value = true
    error.value = null

    try {
      await authService.logout()
      token.value = null
      user.value = null
    } catch (err) {
      error.value = err

      removeToken()
      token.value = null
      user.value = null
    } finally {
      loading.value = false
    }
  }

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

  onMounted(() => {
    if (isAuthenticated.value) {
      loadUserFromToken()
    }
  })

  return {

    token: computed(() => token.value),
    user: computed(() => user.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    isAuthenticated,

    login,
    logout,
    fetchUser,
    refreshToken,
  }
}
