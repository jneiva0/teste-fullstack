import { Atendimento } from 'src/atendimento/atendimento.entity'
import { Servico } from 'src/servico/servico.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

// Criada uma entidade auxiliar para possibilitar definir um profissional em cada servico
// do atendimento
@Entity()
export class ServicoToAtendimento {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  servicoId: number

  @Column()
  atendimentoId: number

  @Column({ nullable: true })
  profissional?: string

  @ManyToOne(() => Servico, servico => servico.servicosToAtendimento)
  servico: Servico

  @ManyToOne(
    () => Atendimento,
    atendimento => atendimento.servicosToAtendimento
  )
  atendimento: Atendimento
}
