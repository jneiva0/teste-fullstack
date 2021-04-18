import axios, { AxiosError } from 'axios'
import {
  CreateAtendimentoInput,
  CreateServicoInput,
  LoginInput,
  RegisterInput,
  Servico,
} from './types'

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

//TODO: usar uma biblioteca para gerar as definições de tipos a partir da api

export const apiLogin = async (body: LoginInput) => {
  return await api.post<{ access_token: string }>('auth/login', body)
}

export const apiRegister = async (body: RegisterInput) => {
  return await api.post('auth/register', body)
}

export const apiGetUser = async () => {
  try {
    const res = await api.get('auth/user')
    return res
  } catch (err) {
    if (err.response) return { data: null, error: err }
  }
}

export const apiCreateServico = async (body: CreateServicoInput) =>
  api.post('servico/create', body)

export const apiGetServicos = async () => api.get<Servico[]>('servico/all')

export const apiCreateAtendimento = async (body: CreateAtendimentoInput) =>
  api.post('atendimento/create', body)
