import { User } from 'src/users/user.entity'

export class CreateUserInput implements Partial<User> {
  email: string
  senha: string
}
