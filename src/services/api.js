import api from '@/config/axios'
import { saveToken, removeToken } from '@/utils/auth-token'

/**
 * Service para gerenciar Matérias Legislativas
 */
export class MateriasService {
  /**
   * Lista todas as matérias com filtros opcionais
   * @param {Object} filtros - Filtros de busca
   * @returns {Promise<Array>}
   */
  async get(filtros = {}) {
    return await api.get('/external/documents', { params: filtros })
  }

  async getTypes() {
    return await api.get('/external/documents-categories')
  }

  /**
   * Busca matéria por ID
   * @param {number|string} id - ID da matéria
   * @returns {Promise<Object>}
   */
  async buscarPorId(id) {
    return await api.get(`/external/documents/${id}`)
  }

  /**
   * Busca com paginação
   * @param {Object} params - Parâmetros de paginação e filtros
   * @returns {Promise<Object>}
   */
  async buscarPaginado({ page = 1, limit = 10, search = '', tipo = '' }) {
    return await api.get('/external/documents', {
      params: { page, limit, search, tipo }
    })
  }

}

/**
 * Service para gerenciar Legislaturas
 */
export class LegislaturasService {
  async get() {
    return await api.get('/external/legislatures')
  }

}

/**
 * Service para gerenciar Parlamentares
 */
export class ParlamentaresService {
  async get(filtros = {}) {
    return await api.get('/external/users', { params: filtros })
  }

  async buscarPorId(id) {
    return await api.get(`/external/users/${id}`)
  }
}

/**
 * Service para gerenciar Partidos
 */
export class PartidosService {
  async get() {
    return await api.get('/external/category-parties')
  }
}

/**
 * Service para gerenciar Sessões Plenárias
 */
export class SessoesService {
  async get(filtros = {}) {
    return await api.get('/external/sessions', { params: filtros })
  }

  async buscarPorId(id) {
    return await api.get(`/external/sessions/${id}`)
  }

  async buscarPauta(sessaoId) {
    return await api.get(`/external/sessoes/${sessaoId}/pauta`)
  }

}

/**
 * Service para gerenciar Comissões
 */
export class ComissoesService {
  async listar() {
    return await api.get('/comissoes')
  }

  async buscarPorId(id) {
    return await api.get(`/comissoes/${id}`)
  }

  async criar(dados) {
    return await api.post('/comissoes', dados)
  }

  async atualizar(id, dados) {
    return await api.put(`/comissoes/${id}`, dados)
  }

  async deletar(id) {
    return await api.delete(`/comissoes/${id}`)
  }

  async adicionarMembro(comissaoId, parlamentarId, cargo) {
    return await api.post(`/comissoes/${comissaoId}/membros`, {
      parlamentarId,
      cargo
    })
  }

  async removerMembro(comissaoId, parlamentarId) {
    return await api.delete(`/comissoes/${comissaoId}/membros/${parlamentarId}`)
  }
}

/**
 * Service para gerenciar Mesa Diretora
 */
export class MesaDiretoraService {
  async buscar() {
    return await api.get('/mesa-diretora')
  }

  async atualizar(dados) {
    return await api.put('/mesa-diretora', dados)
  }

  async adicionarMembro(parlamentarId, cargo) {
    return await api.post('/mesa-diretora/membros', {
      parlamentarId,
      cargo
    })
  }

  async removerMembro(parlamentarId) {
    return await api.delete(`/mesa-diretora/membros/${parlamentarId}`)
  }
}

/**
 * Service para gerenciar Normas Jurídicas
 */
export class NormasService {
  async listar(filtros = {}) {
    return await api.get('/normas', { params: filtros })
  }

  async buscarPorId(id) {
    return await api.get(`/normas/${id}`)
  }

  async criar(dados) {
    return await api.post('/normas', dados)
  }

  async atualizar(id, dados) {
    return await api.put(`/normas/${id}`, dados)
  }

  async deletar(id) {
    return await api.delete(`/normas/${id}`)
  }

  async publicar(id) {
    return await api.post(`/normas/${id}/publicar`)
  }
}

/**
 * Service para gerenciar Relatórios
 */
export class RelatoriosService {
  async get(filtros = {}) {
    return await api.get('/external/documents/statistics', { params: filtros })
  }
}

/**
 * Service para Autenticação
 */
export class AuthService {
  /**
   * Obtém token de acesso externo
   * Deve ser chamado ao inicializar a aplicação
   */
  async getExternalAccess() {
    try {
      const response = await api.post('/external/access')
      
      // Salvar token no localStorage
      if (response.token) {
        saveToken(response.token)
        
        // Configurar token no Axios para próximas requisições
        api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`
      }
      
      return response
    } catch (error) {
      console.error('Erro ao obter token de acesso externo:', error)
      throw error
    }
  }

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    
    // Salvar token se retornado
    if (response.token) {
      saveToken(response.token)
    }
    
    return response
  }

  async logout() {
    await api.post('/auth/logout')
    removeToken()
  }

  async me() {
    return await api.get('/auth/me')
  }

  async refreshToken() {
    const response = await api.post('/auth/refresh')
    
    if (response.token) {
      saveToken(response.token)
    }
    
    return response
  }

  async forgotPassword(email) {
    return await api.post('/auth/forgot-password', { email })
  }

  async resetPassword(token, password, passwordConfirmation) {
    return await api.post('/auth/reset-password', {
      token,
      password,
      password_confirmation: passwordConfirmation
    })
  }
}

// Exportar instâncias dos services (singleton)
export const materiasService = new MateriasService()
export const parlamentaresService = new ParlamentaresService()
export const legislaturasService = new LegislaturasService()
export const partidosService = new PartidosService()
export const sessoesService = new SessoesService()
export const comissoesService = new ComissoesService()
export const mesaDiretoraService = new MesaDiretoraService()
export const normasService = new NormasService()
export const relatoriosService = new RelatoriosService()
export const authService = new AuthService()

// Exportar também como default para uso alternativo
export default {
  materias: materiasService,
  parlamentares: parlamentaresService,
  legislaturas: legislaturasService,
  partidos: partidosService,
  sessoes: sessoesService,
  comissoes: comissoesService,
  mesaDiretora: mesaDiretoraService,
  normas: normasService,
  relatorios: relatoriosService,
  auth: authService,
}
