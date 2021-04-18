import axios, { AxiosError } from 'axios'

// TODO: usar uma environment variable em vez de uma string no codigo
const apiEndpoint = 'http://localhost:4000'

const api = axios.create({
  baseURL: apiEndpoint,
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

export { api }

//TODO: usar uma biblioteca para gerar as definições de tipos a partir da api
