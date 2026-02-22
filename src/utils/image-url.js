const S3_HOST = import.meta.env.VITE_S3_HOST || 'https://smartlegis-production.s3.amazonaws.com'


export function convertToS3Url(url) {
  if (!url) return ''

  url = url.trim()

  if (url.includes('s3.amazonaws.com')) {
    return url
  }

  if (url.includes('smartlegis.net.br')) {
    try {
      const urlObj = new URL(url)
      const pathname = urlObj.pathname

      const pathWithoutStorage = pathname.replace(/^\/storage\//, '/')

      return `${S3_HOST}${pathWithoutStorage}`
    } catch (error) {
      console.warn('Erro ao converter URL para S3:', url, error)
      return url
    }
  }

  if (url.startsWith('/tenancy/') || url.startsWith('tenancy/')) {
    const cleanPath = url.startsWith('/') ? url : `/${url}`
    return `${S3_HOST}${cleanPath}`
  }

  if (url.startsWith('/storage/tenancy/')) {
    const pathWithoutStorage = url.replace(/^\/storage/, '')
    return `${S3_HOST}${pathWithoutStorage}`
  }

  if (url.startsWith('storage/tenancy/')) {
    const pathWithoutStorage = url.replace(/^storage/, '')
    return `${S3_HOST}${pathWithoutStorage}`
  }

  if (url.startsWith('/') && !url.startsWith('//')) {
    return `${S3_HOST}${url}`
  }

  return url
}

export function useImageUrl() {
  return {
    toS3: convertToS3Url,
  }
}

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
