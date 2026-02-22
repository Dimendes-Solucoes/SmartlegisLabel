/**
 * Utilitários para gerenciamento de token de autenticação
 */

const TOKEN_KEY = 'auth_token'

/**
 * Salva o token no localStorage
 * @param {string} token - Token JWT
 */
export function saveToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

/**
 * Obtém o token do localStorage
 * @returns {string|null} Token ou null se não existir
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Remove o token do localStorage
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Verifica se existe um token válido
 * @returns {boolean}
 */
export function hasToken() {
  return !!getToken()
}

/**
 * Decodifica o payload do token JWT (sem validar assinatura)
 * @param {string} token - Token JWT
 * @returns {Object|null} Payload decodificado ou null se inválido
 */
export function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Erro ao decodificar token:', error)
    return null
  }
}

/**
 * Verifica se o token está expirado
 * @param {string} token - Token JWT
 * @returns {boolean}
 */
export function isTokenExpired(token) {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) {
    return true
  }
  
  const currentTime = Date.now() / 1000
  return decoded.exp < currentTime
}

/**
 * Obtém informações do usuário do token
 * @returns {Object|null}
 */
export function getUserFromToken() {
  const token = getToken()
  if (!token) return null
  
  return decodeToken(token)
}
