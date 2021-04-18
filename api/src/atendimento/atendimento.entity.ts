import { ServicoToAtendimento } from 'src/atendimento/servicoToAtendimento.entity'
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Atendimento {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(
    () => ServicoToAtendimento,
    servicoToAtendimento => servicoToAtendimento.atendimento,
    { cascade: true }
  )
  servicosToAtendimento: ServicoToAtendimento[]
}
