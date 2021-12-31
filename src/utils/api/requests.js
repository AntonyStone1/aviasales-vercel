import apiClient from './apiClient'
import PATHS from './Path'

// Auth
// export const login = (data) => apiClient.post(PATHS.login, { data })
export const getKey = () => apiClient.get(PATHS.getKey)
export const resetPassword = (password) => {
  const { data, token } = password
  return apiClient.post(`${PATHS.resetPassword}?token=${token}`, { data })
}
export const forgotPassword = (data) => apiClient.post(PATHS.forgotPassword, { data })
export const changePassword = (data) => apiClient.post(PATHS.changePassword, { data })
export const getReturnConfirm = (token) => apiClient.get(PATHS.getReturnConfirm, { token })
export const returnConfirm = (data) => {
  const { id, ...params } = data
  return apiClient.put(PATHS.returnConfirm + id, params)
}
