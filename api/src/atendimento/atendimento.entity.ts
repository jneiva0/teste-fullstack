import { ServicoToAtendimento } from 'src/atendimento/servicoToAtendimento.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Atendimento {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  // Tempo maximo em minutos, calculado a partir da soma do tempo dos servicos
  // da forma atual está sendo calculado pelo cliente e passado na criação do atendimento
  // para facilitar a validação. O melhor seria fazer esse calculo no servidor.
  @Column()
  maxTime: number

  @Column({ type: 'timestamp', nullable: true })
  startTime?: Date

  @Column({ type: 'timestamp', nullable: true })
  finishTime?: Date

  @OneToMany(
    () => ServicoToAtendimento,
    servicoToAtendimento => servicoToAtendimento.atendimento,
    { cascade: true }
  )
  servicosToAtendimento: ServicoToAtendimento[]
}
