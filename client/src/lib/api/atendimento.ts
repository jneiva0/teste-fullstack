import { Atendimento, CreateAtendimentoInput } from '../types'
import { api } from './api'

export const apiCreateAtendimento = async (body: CreateAtendimentoInput) =>
  api.post('atendimento/create', body)

export const apiGetAtendimentos = async () =>
  api.get<Atendimento[]>('atendimento/all')

export const apiGetAtendimento = async (id: number) =>
  api.get<Atendimento>('atendimento/get', { params: { id } })

export const apiStartAtendimento = async (id: number) =>
  api.post<Atendimento>('atendimento/start', { id })
