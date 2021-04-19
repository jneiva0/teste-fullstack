import { ServicoToAtendimento } from './types'

export const calculaValorTotalServicos = (servicos: ServicoToAtendimento[]) =>
  servicos.reduce((total, item) => total + item.servico.valor, 0)
