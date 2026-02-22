import api from '@/config/axios'

export async function getUsers() {
  try {
    const users = await api.get('/users')
    return users
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw error
  }
}

export async function getUsersPaginated(page = 1, limit = 10) {
  try {
    const data = await api.get('/users', {
      params: { page, limit }
    })
    return data
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw error
  }
}

export async function getUserById(id) {
  try {
    const user = await api.get(`/users/${id}`)
    return user
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    throw error
  }
}

export async function createUser(userData) {
  try {
    const newUser = await api.post('/users', {
      name: userData.name,
      email: userData.email,
      role: userData.role
    })
    return newUser
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    throw error
  }
}

export async function updateUser(id, userData) {
  try {
    const updated = await api.put(`/users/${id}`, userData)
    return updated
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    throw error
  }
}

export async function patchUser(id, partialData) {
  try {
    const updated = await api.patch(`/users/${id}`, partialData)
    return updated
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    throw error
  }
}

export async function deleteUser(id) {
  try {
    await api.delete(`/users/${id}`)
    return true
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    throw error
  }
}

export async function uploadAvatar(userId, file) {
  try {
    const formData = new FormData()
    formData.append('avatar', file)
    formData.append('userId', userId)

    const result = await api.post(`/users/${userId}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return result
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    throw error
  }
}

export async function uploadDocuments(files, onProgress) {
  try {
    const formData = new FormData()

    files.forEach((file, index) => {
      formData.append(`documents[${index}]`, file)
    })

    const result = await api.post('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onProgress?.(percentCompleted)
      }
    })

    return result
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    throw error
  }
}

export async function downloadFile(fileId, filename) {
  try {
    const response = await api.get(`/files/${fileId}/download`, {
      responseType: 'blob'
    })

    const url = window.URL.createObjectURL(new Blob([response]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error('Erro ao baixar arquivo:', error)
    throw error
  }
}

export async function getLargeReport(reportId) {
  try {
    const report = await api.get(`/reports/${reportId}`, {
      timeout: 60000
    })
    return report
  } catch (error) {
    console.error('Erro ao buscar relatório:', error)
    throw error
  }
}

export async function exportData(format = 'csv') {
  try {
    const data = await api.get('/export', {
      params: { format },
      headers: {
        'Accept': `application/${format}`
      }
    })
    return data
  } catch (error) {
    console.error('Erro ao exportar dados:', error)
    throw error
  }
}

export async function getCriticalData() {
  try {
    const data = await api.get('/critical-data', {
      retry: 3,
      retryDelay: 1000,
    })
    return data
  } catch (error) {
    console.error('Erro ao buscar dados críticos:', error)
    throw error
  }
}

export function useUsers() {
  const { ref } = require('vue')

  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      users.value = await api.get('/users')
    } catch (err) {
      error.value = err.message
      throw err
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
      error.value = err.message
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

export class MateriasService {

  async listar(filtros = {}) {
    return await api.get('/materias', { params: filtros })
  }

  async buscarPorId(id) {
    return await api.get(`/materias/${id}`)
  }

  async criar(dados) {
    return await api.post('/materias', dados)
  }

  async atualizar(id, dados) {
    return await api.put(`/materias/${id}`, dados)
  }

  async deletar(id) {
    return await api.delete(`/materias/${id}`)
  }

  async buscarPaginado({ page = 1, limit = 10, search = '', tipo = '' }) {
    return await api.get('/materias', {
      params: {
        page,
        limit,
        search,
        tipo
      }
    })
  }

  async anexarDocumento(materiaId, arquivo, descricao = '') {
    const formData = new FormData()
    formData.append('documento', arquivo)
    formData.append('descricao', descricao)

    return await api.post(
      `/materias/${materiaId}/documentos`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
  }

  async listarDocumentos(materiaId) {
    return await api.get(`/materias/${materiaId}/documentos`)
  }

  async baixarDocumento(materiaId, documentoId, nomeArquivo) {
    const response = await api.get(
      `/materias/${materiaId}/documentos/${documentoId}/download`,
      { responseType: 'blob' }
    )

    const url = window.URL.createObjectURL(new Blob([response]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', nomeArquivo)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }
}

export class ParlamentaresService {
  async listar() {
    return await api.get('/parlamentares')
  }

  async buscarPorId(id) {
    return await api.get(`/parlamentares/${id}`)
  }

  async criar(dados) {
    return await api.post('/parlamentares', dados)
  }

  async atualizar(id, dados) {
    return await api.put(`/parlamentares/${id}`, dados)
  }

  async deletar(id) {
    return await api.delete(`/parlamentares/${id}`)
  }

  async uploadFoto(id, foto) {
    const formData = new FormData()
    formData.append('foto', foto)

    return await api.post(
      `/parlamentares/${id}/foto`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
  }
}

export class SessoesService {
  async listar(filtros = {}) {
    return await api.get('/sessoes', { params: filtros })
  }

  async buscarPorId(id) {
    return await api.get(`/sessoes/${id}`)
  }

  async criar(dados) {
    return await api.post('/sessoes', dados)
  }

  async atualizar(id, dados) {
    return await api.put(`/sessoes/${id}`, dados)
  }

  async deletar(id) {
    return await api.delete(`/sessoes/${id}`)
  }

  async buscarPauta(sessaoId) {
    return await api.get(`/sessoes/${sessaoId}/pauta`)
  }

  async adicionarMateriaAPauta(sessaoId, materiaId, ordem) {
    return await api.post(`/sessoes/${sessaoId}/pauta`, {
      materiaId,
      ordem
    })
  }

  async removerMateriaDaPauta(sessaoId, materiaId) {
    return await api.delete(`/sessoes/${sessaoId}/pauta/${materiaId}`)
  }
}

export const materiasService = new MateriasService()
export const parlamentaresService = new ParlamentaresService()
export const sessoesService = new SessoesService()
