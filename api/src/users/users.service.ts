import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserInput } from 'src/users/input/create.input'
import { User } from 'src/users/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    })
  }

  async create(data: CreateUserInput): Promise<User> {
    const userExists = await this.findOne(data.email)
    if (userExists) throw new Error('Este email já está em uso!')

    const user = this.usersRepository.create(data)
    return this.usersRepository.save(user)
  }
}
