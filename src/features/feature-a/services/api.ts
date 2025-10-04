import axiosInstance from "@/plugins/axios"
import type { ApiResponse, CustomAxiosRequestConfig } from "@/shared/models/api"

import type { FeatureARequestPayload } from "../models"

export const FeatureARequest = async (payload: FeatureARequestPayload): Promise<ApiResponse> => {
  const configRequest: CustomAxiosRequestConfig<FeatureARequestPayload> = {
    url: "/feature-a/request",
    method: "POST",
    data: payload,
    meta: {
      requiresAuth: true,
    },
  }
  const { data } = await axiosInstance.request(configRequest)
  return data
}
