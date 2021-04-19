import { Servico } from 'src/servico/servico.entity'

export class CreateServicoInput implements Partial<Servico> {
  nome: string
  valor: number
  profissional?: string
}
