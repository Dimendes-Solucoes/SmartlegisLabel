import { ref, computed } from 'vue'
import api from '@/config/axios'

export function useApi() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const execute = async (apiCall) => {
    loading.value = true
    error.value = null
    data.value = null

    try {
      const result = await apiCall()
      data.value = result
      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = null
    loading.value = false
    error.value = null
  }

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}

export function useFetch(url, options = {}) {
  const { immediate = true, ...fetchOptions } = options

  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const execute = async () => {
    loading.value = true
    error.value = null

    try {
      const result = await api.get(url, fetchOptions)
      data.value = result
      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  if (immediate) {
    execute()
  }

  return {
    data,
    loading,
    error,
    execute,
    refresh: execute,
  }
}

export function useCrud(baseUrl) {
  const items = ref([])
  const currentItem = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchAll = async (params = {}) => {
    loading.value = true
    error.value = null

    try {
      const result = await api.get(baseUrl, { params })
      items.value = result
      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchById = async (id) => {
    loading.value = true
    error.value = null

    try {
      const result = await api.get(`${baseUrl}/${id}`)
      currentItem.value = result
      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  const create = async (data) => {
    loading.value = true
    error.value = null

    try {
      const result = await api.post(baseUrl, data)
      items.value.push(result)
      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  const update = async (id, data) => {
    loading.value = true
    error.value = null

    try {
      const result = await api.put(`${baseUrl}/${id}`, data)

      const index = items.value.findIndex(item => item.id === id)
      if (index !== -1) {
        items.value[index] = result
      }

      if (currentItem.value?.id === id) {
        currentItem.value = result
      }

      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  const remove = async (id) => {
    loading.value = true
    error.value = null

    try {
      await api.delete(`${baseUrl}/${id}`)

      items.value = items.value.filter(item => item.id !== id)

      if (currentItem.value?.id === id) {
        currentItem.value = null
      }

      return true
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    currentItem,
    loading,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    delete: remove,
  }
}

export function usePagination(url, initialLimit = 10) {
  const data = ref([])
  const loading = ref(false)
  const error = ref(null)
  const page = ref(1)
  const limit = ref(initialLimit)
  const total = ref(0)
  const totalPages = computed(() => Math.ceil(total.value / limit.value))

  const fetchPage = async (pageNumber = page.value) => {
    loading.value = true
    error.value = null

    try {
      const result = await api.get(url, {
        params: {
          page: pageNumber,
          limit: limit.value
        }
      })

      if (result.data && result.total !== undefined) {
        data.value = result.data
        total.value = result.total
      } else if (Array.isArray(result)) {
        data.value = result
      } else {
        data.value = result
      }

      page.value = pageNumber
      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  const nextPage = async () => {
    if (page.value < totalPages.value) {
      return fetchPage(page.value + 1)
    }
  }

  const prevPage = async () => {
    if (page.value > 1) {
      return fetchPage(page.value - 1)
    }
  }

  const goToPage = async (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
      return fetchPage(pageNumber)
    }
  }

  fetchPage(1)

  return {
    data,
    loading,
    error,
    page,
    limit,
    total,
    totalPages,
    fetchPage,
    nextPage,
    prevPage,
    goToPage,
    refresh: () => fetchPage(page.value),
  }
}

export function useFileUpload() {
  const uploading = ref(false)
  const progress = ref(0)
  const error = ref(null)

  const upload = async (url, file, fieldName = 'file', additionalData = {}) => {
    uploading.value = true
    progress.value = 0
    error.value = null

    try {
      const formData = new FormData()
      formData.append(fieldName, file)

      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key])
      })

      const result = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          progress.value = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
        }
      })

      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      uploading.value = false
    }
  }

  const reset = () => {
    uploading.value = false
    progress.value = 0
    error.value = null
  }

  return {
    upload,
    uploading,
    progress,
    error,
    reset,
  }
}
