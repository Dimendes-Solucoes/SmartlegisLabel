import { httpClient } from '@/utils/http-client'

/**
 * EXEMPLOS DE USO DO HTTP CLIENT
 * 
 * O httpClient já está configurado para usar automaticamente
 * a URL da API do tenant atual.
 */

/**
 * EXEMPLO 1: GET simples
 */
export async function getUsers() {
  try {
    const users = await httpClient.get('/users')
    return users
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw error
  }
}

/**
 * EXEMPLO 2: GET com query parameters
 */
export async function getUsersPaginated(page = 1, limit = 10) {
  try {
    const users = await httpClient.get(`/users?page=${page}&limit=${limit}`)
    return users
  } catch (error) {
    console.error('Erro ao buscar usuários paginados:', error)
    throw error
  }
}

/**
 * EXEMPLO 3: GET com headers customizados
 */
export async function getUsersWithAuth(token) {
  try {
    const users = await httpClient.get('/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return users
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw error
  }
}

/**
 * EXEMPLO 4: POST - Criar novo recurso
 */
export async function createUser(userData) {
  try {
    const newUser = await httpClient.post('/users', {
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
export async function updateUser(userId, userData) {
  try {
    const updated = await httpClient.put(`/users/${userId}`, userData)
    return updated
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    throw error
  }
}

/**
 * EXEMPLO 6: PATCH - Atualizar parcialmente
 */
export async function updateUserEmail(userId, newEmail) {
  try {
    const updated = await httpClient.patch(`/users/${userId}`, {
      email: newEmail
    })
    return updated
  } catch (error) {
    console.error('Erro ao atualizar email:', error)
    throw error
  }
}

/**
 * EXEMPLO 7: DELETE
 */
export async function deleteUser(userId) {
  try {
    await httpClient.delete(`/users/${userId}`)
    return true
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    throw error
  }
}

/**
 * EXEMPLO 8: Upload de arquivo
 */
export async function uploadAvatar(userId, file) {
  try {
    const result = await httpClient.upload(
      `/users/${userId}/avatar`,
      file,
      'avatar',  // nome do campo
      { userId } // dados adicionais
    )
    return result
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    throw error
  }
}

/**
 * EXEMPLO 9: Tratamento de erros detalhado
 */
export async function getUserWithErrorHandling(userId) {
  try {
    const user = await httpClient.get(`/users/${userId}`)
    return user
  } catch (error) {
    // Error possui status, response e data
    if (error.status === 404) {
      console.error('Usuário não encontrado')
    } else if (error.status === 401) {
      console.error('Não autorizado')
    } else if (error.status === 500) {
      console.error('Erro no servidor')
    }
    
    // error.data contém a resposta do servidor (se houver)
    console.error('Detalhes do erro:', error.data)
    throw error
  }
}

/**
 * EXEMPLO 10: Uso em componente Vue (Composition API)
 */
export function useUserService() {
  const fetchUsers = async () => {
    return await httpClient.get('/users')
  }

  const createUser = async (userData) => {
    return await httpClient.post('/users', userData)
  }

  const updateUser = async (userId, userData) => {
    return await httpClient.put(`/users/${userId}`, userData)
  }

  const deleteUser = async (userId) => {
    return await httpClient.delete(`/users/${userId}`)
  }

  return {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
}

/**
 * EXEMPLO COMPLETO: Service de Matérias Legislativas
 */
export class MateriasService {
  async listar(filtros = {}) {
    const params = new URLSearchParams(filtros).toString()
    return await httpClient.get(`/materias?${params}`)
  }

  async buscarPorId(id) {
    return await httpClient.get(`/materias/${id}`)
  }

  async criar(dados) {
    return await httpClient.post('/materias', dados)
  }

  async atualizar(id, dados) {
    return await httpClient.put(`/materias/${id}`, dados)
  }

  async deletar(id) {
    return await httpClient.delete(`/materias/${id}`)
  }

  async anexarDocumento(id, arquivo) {
    return await httpClient.upload(
      `/materias/${id}/documentos`,
      arquivo,
      'documento',
      { materiaId: id }
    )
  }
}

// Exportar instância do service
export const materiasService = new MateriasService()
