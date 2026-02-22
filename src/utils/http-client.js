import { useTenantStore } from '@/stores/tenant'

/**
 * Configuração do cliente HTTP usando Fetch API
 * Automaticamente usa a URL base da API do tenant atual
 */

class HttpClient {
  constructor() {
    this.tenantStore = null
  }

  /**
   * Inicializa o cliente HTTP com a store do tenant
   * Deve ser chamado no setup da aplicação
   */
  init() {
    this.tenantStore = useTenantStore()
  }

  /**
   * Monta a URL completa para a requisição
   */
  _buildUrl(endpoint) {
    if (!this.tenantStore) {
      throw new Error('HttpClient não foi inicializado. Chame httpClient.init() no setup da aplicação.')
    }
    return this.tenantStore.buildApiUrl(endpoint)
  }

  /**
   * Monta as opções padrão da requisição
   */
  _buildOptions(options = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }
  }

  /**
   * Processa a resposta da requisição
   */
  async _handleResponse(response) {
    if (!response.ok) {
      const error = new Error(`HTTP Error ${response.status}`)
      error.status = response.status
      error.response = response
      
      try {
        error.data = await response.json()
      } catch {
        error.data = null
      }
      
      throw error
    }

    // Se não houver conteúdo, retorna null
    if (response.status === 204) {
      return null
    }

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    }

    return response.text()
  }

  /**
   * Requisição GET
   */
  async get(endpoint, options = {}) {
    const url = this._buildUrl(endpoint)
    const config = this._buildOptions({
      method: 'GET',
      ...options,
    })

    const response = await fetch(url, config)
    return this._handleResponse(response)
  }

  /**
   * Requisição POST
   */
  async post(endpoint, data, options = {}) {
    const url = this._buildUrl(endpoint)
    const config = this._buildOptions({
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    })

    const response = await fetch(url, config)
    return this._handleResponse(response)
  }

  /**
   * Requisição PUT
   */
  async put(endpoint, data, options = {}) {
    const url = this._buildUrl(endpoint)
    const config = this._buildOptions({
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    })

    const response = await fetch(url, config)
    return this._handleResponse(response)
  }

  /**
   * Requisição PATCH
   */
  async patch(endpoint, data, options = {}) {
    const url = this._buildUrl(endpoint)
    const config = this._buildOptions({
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options,
    })

    const response = await fetch(url, config)
    return this._handleResponse(response)
  }

  /**
   * Requisição DELETE
   */
  async delete(endpoint, options = {}) {
    const url = this._buildUrl(endpoint)
    const config = this._buildOptions({
      method: 'DELETE',
      ...options,
    })

    const response = await fetch(url, config)
    return this._handleResponse(response)
  }

  /**
   * Upload de arquivo
   */
  async upload(endpoint, file, fieldName = 'file', additionalData = {}) {
    const url = this._buildUrl(endpoint)
    const formData = new FormData()
    
    formData.append(fieldName, file)
    
    // Adicionar dados adicionais ao FormData
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key])
    })

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      // Não definir Content-Type, o browser define automaticamente com boundary
    })

    return this._handleResponse(response)
  }
}

// Exportar instância singleton
export const httpClient = new HttpClient()

// Exportar classe para casos onde seja necessário múltiplas instâncias
export { HttpClient }
