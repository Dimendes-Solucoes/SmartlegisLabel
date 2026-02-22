import { convertToS3Url } from '@/utils/image-url'

export function useImageUrl() {

  const toS3 = (url) => convertToS3Url(url)

  const isS3Url = (url) => {
    return url && url.includes('s3.amazonaws.com')
  }

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
