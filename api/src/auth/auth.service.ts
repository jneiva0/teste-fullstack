import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validarUser(email: string, senha: string): Promise<any> {
    const usuario = await this.usersService.findOne(email)
    if (usuario && usuario.senha === senha) {
      const { senha, ...result } = usuario
      return result
    }
    return null
  }
}
