import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Servico {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string

  @Column()
  valor: number

  //TODO:  criar a entidade profissional para possibilitar um controle dos funcionarios
  @Column({ nullable: true })
  profissional?: string
}
