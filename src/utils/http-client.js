import { useTenantStore } from '@/stores/tenant'

class HttpClient {
  constructor() {
    this.tenantStore = null
  }

  init() {
    this.tenantStore = useTenantStore()
  }

  _buildUrl(endpoint) {
    if (!this.tenantStore) {
      throw new Error('HttpClient não foi inicializado. Chame httpClient.init() no setup da aplicação.')
    }
    return this.tenantStore.buildApiUrl(endpoint)
  }

  _buildOptions(options = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }
  }

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

    if (response.status === 204) {
      return null
    }

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    }

    return response.text()
  }

  async get(endpoint, options = {}) {
    const url = this._buildUrl(endpoint)
    const config = this._buildOptions({
      method: 'GET',
      ...options,
    })

    const response = await fetch(url, config)
    return this._handleResponse(response)
  }

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

  async delete(endpoint, options = {}) {
    const url = this._buildUrl(endpoint)
    const config = this._buildOptions({
      method: 'DELETE',
      ...options,
    })

    const response = await fetch(url, config)
    return this._handleResponse(response)
  }

  async upload(endpoint, file, fieldName = 'file', additionalData = {}) {
    const url = this._buildUrl(endpoint)
    const formData = new FormData()

    formData.append(fieldName, file)

    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key])
    })

    const response = await fetch(url, {
      method: 'POST',
      body: formData,

    })

    return this._handleResponse(response)
  }
}

export const httpClient = new HttpClient()

export { HttpClient }
