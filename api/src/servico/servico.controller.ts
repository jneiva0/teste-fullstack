import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateServicoInput } from 'src/servico/input/create.input'
import { ServicoService } from 'src/servico/servico.service'

@Controller('servico')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Get('all')
  getAll() {
    return this.servicoService.getAll()
  }

  @Post('create')
  create(@Body() data: CreateServicoInput) {
    return this.servicoService.create(data)
  }
}
