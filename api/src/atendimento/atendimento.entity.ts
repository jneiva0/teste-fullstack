import { Servico } from 'src/servico/servico.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  // Usando eager: true para retornar os servicos relacionados automaticamente
  // O motivo é que na maioria dos casos preciso das informações dos serviços tambem
  // Em um cenario real a decisão de usar eager ou lazy relations geralmente leva bastante ponderação
  @ManyToMany(() => Servico, { eager: true })
  @JoinTable()
  servicos: Servico[]
}
