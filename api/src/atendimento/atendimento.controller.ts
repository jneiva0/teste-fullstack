import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { AtendimentoService } from 'src/atendimento/atendimento.service'
import { CreateAtendimentoInput } from 'src/atendimento/input/create.input'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('atendimento')
export class AtendimentoController {
  constructor(private readonly atendimentoService: AtendimentoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() data: CreateAtendimentoInput) {
    return this.atendimentoService.create(data)
  }

  @Get('all')
  getAll() {
    return this.atendimentoService.getAll()
  }

  @Get('get')
  getOne(@Query('id') id: number) {
    return this.atendimentoService.getOne(id)
  }

  @Post('start')
  startAtendimento(@Body('id') id: number) {
    return this.atendimentoService.startAtendimento(id)
  }

  @Post('finish')
  finishAtendimento(@Body('id') id: number) {
    return this.atendimentoService.finishAtendimento(id)
  }
}
