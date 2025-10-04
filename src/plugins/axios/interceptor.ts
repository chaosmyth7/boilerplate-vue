import type { CustomAxiosRequestConfig } from '@/shared/models/api'
import type { AxiosInstance } from 'axios'

export function setupInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const customConfig = config as CustomAxiosRequestConfig
      const shouldAttachToken = customConfig.meta?.requiresAuth !== false

      const token = localStorage.getItem('token')

      if (shouldAttachToken && token) {
        config.headers?.set?.('Authorization', `Bearer ${token}`)
      }

      return config
    },
    (error) => Promise.reject(error),
  )

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // handle global errors here
      return Promise.reject(error)
    },
  )
}
