import api from '@/config/axios'

/**
 * EXEMPLOS DE USO DO AXIOS CONFIGURADO
 * 
 * O Axios já está configurado para:
 * - Usar automaticamente a URL da API do tenant atual
 * - Adicionar token de autenticação automaticamente
 * - Tratar erros comuns
 * - Retornar apenas os dados (sem o envelope do Axios)
 */

/**
 * ========================================
 * EXEMPLOS BÁSICOS
 * ========================================
 */

/**
 * EXEMPLO 1: GET simples
 */
export async function getUsers() {
  try {
    const users = await api.get('/users')
    return users
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw error
  }
}

/**
 * EXEMPLO 2: GET com parâmetros de query
 */
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

/**
 * EXEMPLO 3: GET por ID
 */
export async function getUserById(id) {
  try {
    const user = await api.get(`/users/${id}`)
    return user
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    throw error
  }
}

/**
 * EXEMPLO 4: POST - Criar recurso
 */
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

/**
 * EXEMPLO 5: PUT - Atualizar recurso completo
 */
export async function updateUser(id, userData) {
  try {
    const updated = await api.put(`/users/${id}`, userData)
    return updated
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    throw error
  }
}

/**
 * EXEMPLO 6: PATCH - Atualizar parcialmente
 */
export async function patchUser(id, partialData) {
  try {
    const updated = await api.patch(`/users/${id}`, partialData)
    return updated
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    throw error
  }
}

/**
 * EXEMPLO 7: DELETE
 */
export async function deleteUser(id) {
  try {
    await api.delete(`/users/${id}`)
    return true
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    throw error
  }
}

/**
 * ========================================
 * EXEMPLOS AVANÇADOS
 * ========================================
 */

/**
 * EXEMPLO 8: Upload de arquivo único
 */
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

/**
 * EXEMPLO 9: Upload múltiplo com progresso
 */
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

/**
 * EXEMPLO 10: Download de arquivo
 */
export async function downloadFile(fileId, filename) {
  try {
    const response = await api.get(`/files/${fileId}/download`, {
      responseType: 'blob'
    })
    
    // Criar link para download
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

/**
 * EXEMPLO 11: Requisição com timeout customizado
 */
export async function getLargeReport(reportId) {
  try {
    const report = await api.get(`/reports/${reportId}`, {
      timeout: 60000 // 60 segundos
    })
    return report
  } catch (error) {
    console.error('Erro ao buscar relatório:', error)
    throw error
  }
}

/**
 * EXEMPLO 12: Requisição com headers customizados
 */
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

/**
 * EXEMPLO 13: Requisição com retry automático (usando interceptor)
 */
export async function getCriticalData() {
  try {
    const data = await api.get('/critical-data', {
      retry: 3, // Tentar 3 vezes antes de falhar
      retryDelay: 1000, // Aguardar 1s entre tentativas
    })
    return data
  } catch (error) {
    console.error('Erro ao buscar dados críticos:', error)
    throw error
  }
}

/**
 * ========================================
 * COMPOSABLES PARA USO EM COMPONENTES VUE
 * ========================================
 */

/**
 * EXEMPLO 14: Composable com estado de loading e erro
 */
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

/**
 * ========================================
 * SERVICES (CLASSES)
 * ========================================
 */

/**
 * EXEMPLO 15: Service de Matérias Legislativas
 */
export class MateriasService {
  /**
   * Lista todas as matérias com filtros opcionais
   */
  async listar(filtros = {}) {
    return await api.get('/materias', { params: filtros })
  }

  /**
   * Busca matéria por ID
   */
  async buscarPorId(id) {
    return await api.get(`/materias/${id}`)
  }

  /**
   * Cria nova matéria
   */
  async criar(dados) {
    return await api.post('/materias', dados)
  }

  /**
   * Atualiza matéria existente
   */
  async atualizar(id, dados) {
    return await api.put(`/materias/${id}`, dados)
  }

  /**
   * Remove matéria
   */
  async deletar(id) {
    return await api.delete(`/materias/${id}`)
  }

  /**
   * Busca com paginação
   */
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

  /**
   * Anexar documento à matéria
   */
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

  /**
   * Listar documentos da matéria
   */
  async listarDocumentos(materiaId) {
    return await api.get(`/materias/${materiaId}/documentos`)
  }

  /**
   * Baixar documento
   */
  async baixarDocumento(materiaId, documentoId, nomeArquivo) {
    const response = await api.get(
      `/materias/${materiaId}/documentos/${documentoId}/download`,
      { responseType: 'blob' }
    )
    
    // Criar link para download
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

/**
 * EXEMPLO 16: Service de Parlamentares
 */
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

/**
 * EXEMPLO 17: Service de Sessões
 */
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

// Exportar instâncias dos services
export const materiasService = new MateriasService()
export const parlamentaresService = new ParlamentaresService()
export const sessoesService = new SessoesService()
