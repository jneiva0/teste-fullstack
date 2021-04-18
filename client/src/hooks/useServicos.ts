import useSWR from 'swr'
import { apiGetServicos } from '../lib/api'

export const useServicos = () => {
  const { data, ...rest } = useSWR('servico/all', apiGetServicos)
  const servicos = data && data.data
  return { servicos, ...rest }
}
