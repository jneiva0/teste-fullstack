export type LoginInput = { email: string; senha: string }

export type RegisterInput = { email: string; senha: string }

export type CreateServicoInput = {
  nome: string
  valor: number
  minutos: number
  profissional?: string
}
