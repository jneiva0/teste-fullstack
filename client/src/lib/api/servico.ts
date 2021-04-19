import { CreateServicoInput, Servico } from '../types'
import { api } from './api'

export const apiCreateServico = async (body: CreateServicoInput) =>
  api.post('servico/create', body)

export const apiGetServicos = async () => api.get<Servico[]>('servico/all')
