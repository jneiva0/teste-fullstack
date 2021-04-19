export type LoginInput = { email: string; senha: string }

export type RegisterInput = { email: string; senha: string }

export type CreateServicoInput = {
  nome: string
  valor: number
  minutos: number
  profissional?: string
  comissao?: number
}

// em um projeto serio eu importaria os tipos da API, da forma atual o código não está limpo
// cada alteração na API me faria ter que alterar os tipos aqui também
export type Servico = {
  id: number
  nome: string
  valor: number
  minutos: number
  profissional?: string
  comissao: number
}

export type CreateAtendimentoInput = {
  servicos: Servico[]
  maxTime: number
}

export type Atendimento = {
  id: number
  createdAt: string
  maxTime: number
  startTime?: string
  finishTime?: string
  servicos: Servico[]
}
