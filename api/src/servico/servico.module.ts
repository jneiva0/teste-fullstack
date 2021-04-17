import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServicoService } from './servico.service'
import { Servico } from './servico.entity'
import { ServicoController } from './servico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Servico])],
  providers: [ServicoService],
  exports: [ServicoService],
  controllers: [ServicoController],
})
export class ServicoModule {}
