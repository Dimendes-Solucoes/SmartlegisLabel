import { convertToS3Url } from '@/utils/image-url'

/**
 * Composable para conversão de URLs de imagens para S3
 * 
 * @returns {Object} Funções utilitárias para trabalhar com URLs de imagens
 * 
 * @example
 * <script setup>
 * import { useImageUrl } from '@/composables/useImageUrl'
 * 
 * const { toS3 } = useImageUrl()
 * 
 * // No template
 * // <img :src="toS3(user.foto)" />
 * </script>
 */
export function useImageUrl() {
  /**
   * Converte URL para S3
   */
  const toS3 = (url) => convertToS3Url(url)
  
  /**
   * Verifica se uma URL já é do S3
   */
  const isS3Url = (url) => {
    return url && url.includes('s3.amazonaws.com')
  }
  
  /**
   * Extrai o nome do arquivo de uma URL
   */
  const getFilename = (url) => {
    if (!url) return ''
    try {
      const urlObj = new URL(url)
      const parts = urlObj.pathname.split('/')
      return parts[parts.length - 1]
    } catch {
      return url.split('/').pop()
    }
  }
  
  return {
    toS3,
    isS3Url,
    getFilename,
  }
}
