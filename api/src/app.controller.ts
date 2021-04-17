import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { CreateUserInput } from 'src/users/input/create.input'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.signJwt(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/user')
  getUser(@Request() req) {
    return req.user
  }

  @Post('auth/register')
  register(@Body() body: CreateUserInput) {
    return this.authService.register(body)
  }
}
