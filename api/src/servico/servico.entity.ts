import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

  // Usando 20% de comissao como padrão para facilitar
  // Eu não faria isso em um projeto real a não ser que realmente fosse decidido
  // que ter esse valor padrão definido dentro do código é a melhor alternativa
  @Column({ default: 0.2, type: 'float' })
  comissao: number
}
