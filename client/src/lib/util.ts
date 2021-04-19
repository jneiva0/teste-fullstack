import { Servico } from './types'

export const calculaValorTotalServicos = (servicos: Servico[]) =>
  servicos.reduce((total, item) => total + item.valor, 0)
