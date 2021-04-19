import { Atendimento } from 'src/atendimento/atendimento.entity'
import { Servico } from 'src/servico/servico.entity'

export class CreateAtendimentoInput implements Partial<Atendimento> {
  servicos: Servico[]
  maxTime: number
}
