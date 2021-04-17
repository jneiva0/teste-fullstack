import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload, Payload } from 'src/auth/auth.interface'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validarUser(email: string, senha: string): Promise<any> {
    const usuario = await this.usersService.findOne(email)
    if (usuario && usuario.senha === senha) {
      const { senha, ...result } = usuario
      return result
    }
    return null
  }

  signJwt(usuario: Payload): { access_token: string } {
    const payload: JwtPayload = { email: usuario.email, sub: usuario.userId }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
