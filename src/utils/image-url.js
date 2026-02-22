/**
 * Utilitários para manipulação de URLs de imagens
 * 
 * Converte URLs do backend Laravel para URLs diretas do S3
 */

// URL do S3 - usa variável de ambiente se disponível
const S3_HOST = import.meta.env.VITE_S3_HOST || 'https://smartlegis-production.s3.amazonaws.com'

/**
 * Converte URL do backend para URL do S3
 * 
 * @param {string} url - URL da imagem vinda da API
 * @returns {string} - URL convertida para S3
 * 
 * @example
 * // Entrada: /tenancy/tenantjc/app/public/imagens_user/foto.jpg
 * // Saída: https://smartlegis-production.s3.amazonaws.com/tenancy/tenantjc/app/public/imagens_user/foto.jpg
 * 
 * // Entrada: https://jcexterno.smartlegis.net.br/storage/tenancy/tenant1/public/fotos/user.jpg
 * // Saída: https://smartlegis-production.s3.amazonaws.com/tenancy/tenant1/public/fotos/user.jpg
 * 
 * // Entrada: https://jcapp.smartlegis.net.br/storage/tenancy/app/public/BrasaoCamara.png
 * // Saída: https://smartlegis-production.s3.amazonaws.com/tenancy/app/public/BrasaoCamara.png
 */
export function convertToS3Url(url) {
  if (!url) return ''
  
  // Remove espaços em branco
  url = url.trim()
  
  // Se já é uma URL do S3, retorna sem modificar
  if (url.includes('s3.amazonaws.com')) {
    return url
  }
  
  // Se é uma URL completa do backend (smartlegis.net.br)
  if (url.includes('smartlegis.net.br')) {
    try {
      const urlObj = new URL(url)
      const pathname = urlObj.pathname
      
      // Remove /storage/ do início do path se existir
      const pathWithoutStorage = pathname.replace(/^\/storage\//, '/')
      
      // Monta a URL do S3
      return `${S3_HOST}${pathWithoutStorage}`
    } catch (error) {
      console.warn('Erro ao converter URL para S3:', url, error)
      return url
    }
  }
  
  // Se é um path relativo começando com /tenancy/ ou tenancy/
  if (url.startsWith('/tenancy/') || url.startsWith('tenancy/')) {
    const cleanPath = url.startsWith('/') ? url : `/${url}`
    return `${S3_HOST}${cleanPath}`
  }
  
  // Se é um path relativo começando com /storage/tenancy/
  if (url.startsWith('/storage/tenancy/')) {
    const pathWithoutStorage = url.replace(/^\/storage/, '')
    return `${S3_HOST}${pathWithoutStorage}`
  }
  
  // Se é um path relativo começando com storage/tenancy/
  if (url.startsWith('storage/tenancy/')) {
    const pathWithoutStorage = url.replace(/^storage/, '')
    return `${S3_HOST}${pathWithoutStorage}`
  }
  
  // Se começa com /, assume que é um path do S3
  if (url.startsWith('/') && !url.startsWith('//')) {
    return `${S3_HOST}${url}`
  }
  
  // Retorna a URL original se não conseguir converter
  return url
}

/**
 * Composable para uso em componentes Vue
 * 
 * @returns {Object} - Objeto com funções utilitárias
 * 
 * @example
 * import { useImageUrl } from '@/utils/image-url'
 * 
 * const { toS3 } = useImageUrl()
 * const imageUrl = toS3(voto.foto)
 */
export function useImageUrl() {
  return {
    toS3: convertToS3Url,
  }
}

/**
 * Processa um objeto convertendo todas as propriedades de imagem para S3
 * 
 * @param {Object} obj - Objeto com propriedades de imagem
 * @param {Array<string>} imageFields - Array com nomes dos campos de imagem (padrão: ['foto', 'imagem', 'image', 'brasao'])
 * @returns {Object} - Objeto com URLs convertidas
 * 
 * @example
 * const parlamentar = { nome: 'João', foto: 'https://jcexterno.smartlegis.net.br/storage/...' }
 * const converted = convertObjectImages(parlamentar)
 * // converted.foto agora aponta para S3
 */
export function convertObjectImages(obj, imageFields = ['foto', 'imagem', 'image', 'brasao']) {
  if (!obj || typeof obj !== 'object') return obj
  
  const converted = { ...obj }
  
  imageFields.forEach(field => {
    if (converted[field]) {
      converted[field] = convertToS3Url(converted[field])
    }
  })
  
  return converted
}

/**
 * Processa um array de objetos convertendo URLs de imagens para S3
 * 
 * @param {Array<Object>} array - Array de objetos
 * @param {Array<string>} imageFields - Array com nomes dos campos de imagem
 * @returns {Array<Object>} - Array com URLs convertidas
 * 
 * @example
 * const parlamentares = [{ nome: 'João', foto: '...' }, { nome: 'Maria', foto: '...' }]
 * const converted = convertArrayImages(parlamentares)
 */
export function convertArrayImages(array, imageFields = ['foto', 'imagem', 'image', 'brasao']) {
  if (!Array.isArray(array)) return array
  
  return array.map(item => convertObjectImages(item, imageFields))
}

export default {
  convertToS3Url,
  convertObjectImages,
  convertArrayImages,
  useImageUrl,
}
