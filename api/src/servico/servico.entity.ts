import { ServicoToAtendimento } from 'src/atendimento/servicoToAtendimento.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Servico {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string

  @Column({ type: 'float' })
  valor: number

  @Column({ type: 'int' })
  minutos: number

  //TODO:  criar a entidade profissional para possibilitar um controle dos funcionarios
  @Column({ nullable: true })
  profissional?: string

  @OneToMany(
    () => ServicoToAtendimento,
    servicoToAtendimento => servicoToAtendimento.servico
  )
  servicosToAtendimento: ServicoToAtendimento[]
}
