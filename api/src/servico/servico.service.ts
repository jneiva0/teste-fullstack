import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Servico } from 'src/servico/servico.entity'
import { Repository } from 'typeorm'
import { CreateServicoInput } from './input/create.input'

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(Servico) private servicoRepository: Repository<Servico>
  ) {}

  getAll(): Promise<Servico[]> {
    return this.servicoRepository.find()
  }

  create(data: CreateServicoInput): Promise<Servico> {
    const servico = this.servicoRepository.create(data)
    return this.servicoRepository.save(servico)
  }
}
