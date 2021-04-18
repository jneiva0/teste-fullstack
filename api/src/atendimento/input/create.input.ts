import { Atendimento } from 'src/atendimento/atendimento.entity'
import { ServicoToAtendimento } from 'src/atendimento/servicoToAtendimento.entity'

export class CreateAtendimentoInput implements Partial<Atendimento> {
  servicosToAtendimento: ServicoToAtendimento[]
}
