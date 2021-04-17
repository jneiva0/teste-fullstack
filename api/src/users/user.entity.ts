import { hash } from 'bcryptjs'
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  senha: string

  @BeforeInsert()
  async beforeInsert() {
    this.senha = await this.hashSenha(this.senha)
  }

  private async hashSenha(password: string) {
    return await hash(password, 10)
  }
}
