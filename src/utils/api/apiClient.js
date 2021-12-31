/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import axios from 'axios'

let baseEndpoint = ''

const getBaseHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})

export const setBaseEndpoint = (ep) => {
  baseEndpoint = ep
}

const callApi = async (url, { headers = {}, params = {}, data, ...restOptions }) => {
  const config = {
    url: `${baseEndpoint}${url}`,
    headers: { ...getBaseHeaders(), ...headers },
    params: { ...params },
    data,

    ...restOptions,
  }
  let hasError = false
  if (restOptions.method === 'POST' && !config.data) {
    config.data = {}
  }
  const request = async (conf) => {
    const responseData = await axios.request(config).catch(() => (hasError = true))
    if (responseData.status === 200) {
      hasError = false
    }
    if (!hasError) {
      return responseData
    }
    return request(conf)
  }
  const responseData = request()
  return responseData
}

export default {
  get: (url, options) => callApi(url, { ...options, method: 'GET' }),
  post: (url, options) => callApi(url, { ...options, method: 'POST' }),
  put: (url, options) => callApi(url, { ...options, method: 'PUT' }),
  delete: (url, options) => callApi(url, { ...options, method: 'DELETE' }),
}
