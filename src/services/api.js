import api from '@/config/axios'
import { saveToken, removeToken } from '@/utils/auth-token'

export class MateriasService {

  async get(filtros = {}) {
    // Remove parâmetros vazios, null ou undefined
    const cleanParams = Object.entries(filtros).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value
      }
      return acc
    }, {})
    
    // Serializa authors como JSON array
    if (cleanParams.authors && Array.isArray(cleanParams.authors)) {
      cleanParams.authors = JSON.stringify(cleanParams.authors)
    }
    
    console.log('📤 Parâmetros enviados para /external/documents:', cleanParams)
    
    return await api.get('/external/documents', { params: cleanParams })
  }

  async getTypes() {
    return await api.get('/external/documents-categories')
  }

  async buscarPorId(id) {
    return await api.get(`/external/documents/${id}`)
  }

  async buscarPaginado({ page = 1, limit = 10, search = '', tipo = '' }) {
    return await api.get('/external/documents', {
      params: { page, limit, search, tipo }
    })
  }

}

export class LegislaturasService {
  async get() {
    return await api.get('/external/legislatures')
  }

}

export class ParlamentaresService {
  async get(filtros = {}) {
    return await api.get('/external/users', { params: filtros })
  }

  async buscarPorId(id) {
    return await api.get(`/external/users/${id}`)
  }
}

export class PartidosService {
  async get() {
    return await api.get('/external/category-parties')
  }
}

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

export class ComissoesService {
  async get() {
    return await api.get('/external/comissions')
  }

}

export class MesaDiretoraService {
  async get() {
    return await api.get('/external/board-directors')
  }
}

export class NormasService {
  async get(filtros = {}) {
    const cleanParams = Object.entries(filtros).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value
      }
      return acc
    }, {})
    return await api.get('/external/legal-norms', { params: cleanParams })
  }

  async getTypes() {
    return await api.get('/external/norm-types')
  }

  async getSubjects() {
    return await api.get('/external/norm-subjects')
  }
}

export class RelatoriosService {
  async get(filtros = {}) {
    return await api.get('/external/documents/statistics', { params: filtros })
  }
}

export class AuthService {

  async getExternalAccess() {
    try {
      const response = await api.post('/external/access')

      if (response.token) {
        saveToken(response.token)

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
