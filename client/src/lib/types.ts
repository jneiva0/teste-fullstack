export type LoginInput = { email: string; senha: string }

export type RegisterInput = { email: string; senha: string }

export type CreateServicoInput = {
  nome: string
  valor: number
  minutos: number
  profissional?: string
}

// em um projeto serio eu importaria os tipos da API, da forma atual o código não está limpo
// cada alteração na API me faria ter que alterar os tipos aqui também
export type Servico = {
  id: number
  nome: string
  valor: number
  minutos: number
  profissional?: string
}

export type ServicoToAtendimento = {
  servico: Servico
  profissional?: string
}

export type CreateAtendimentoInput = {
  servicosToAtendimento: ServicoToAtendimento[]
}
