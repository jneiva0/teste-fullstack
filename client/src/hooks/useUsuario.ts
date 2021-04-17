import useSWR from 'swr'
import { apiGetUser, apiLogin, apiRegister } from '../lib/api'
import { LoginInput, RegisterInput } from '../lib/types'

export const useUsuario = () => {
  const { data, error, mutate } = useSWR('user', apiGetUser, {
    shouldRetryOnError: false,
  })

  const user = data?.data
  const loading = !data && !error

  const login = async (body: LoginInput) => {
    const res = await apiLogin(body)
    if (res.data) {
      console.log(res.data)
      localStorage.setItem('token', res.data.access_token)
      // call mutate para revalidar a query do usuario agora que temos o token JWT
      await mutate()
    }
  }

  const register = async (body: RegisterInput) => {
    return apiRegister(body)
  }

  const logout = async () => {
    console.log('logout')
    localStorage.removeItem('token')
    await mutate()
  }

  return { user, loading, error, logout, login, register }
}
