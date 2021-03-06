import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Atendimento } from 'src/atendimento/atendimento.entity'
import { AtendimentoService } from './atendimento.service'
import { AtendimentoController } from './atendimento.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Atendimento])],
  providers: [AtendimentoService],
  exports: [AtendimentoService],
  controllers: [AtendimentoController],
})
export class AtendimentoModule {}
