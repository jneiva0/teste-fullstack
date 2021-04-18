import { LoginInput, RegisterInput } from '../types'
import { api } from './api'

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
