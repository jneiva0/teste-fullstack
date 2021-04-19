import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Atendimento } from 'src/atendimento/atendimento.entity'
import { CreateAtendimentoInput } from 'src/atendimento/input/create.input'
import { Repository } from 'typeorm'
import dayjs from 'dayjs'

@Injectable()
export class AtendimentoService {
  constructor(
    @InjectRepository(Atendimento)
    private atendimentoRepository: Repository<Atendimento>
  ) {}

  async create(data: CreateAtendimentoInput): Promise<Atendimento> {
    const atendimento = this.atendimentoRepository.create(data)
    return this.atendimentoRepository.save(atendimento)
  }

  getAll(): Promise<Atendimento[]> {
    return this.atendimentoRepository.find()
  }

  getOne(id: number): Promise<Atendimento> {
    return this.atendimentoRepository.findOne(id)
  }

  // Deveria ser feito um tratamento adequado de erros para retornar uma mensagem para
  // notificar o frontend da falha. Ex: Caso nao exista um atendimento com esse id, caso já tenha sido iniciado etc..
  async startAtendimento(id: number): Promise<Atendimento> {
    const atendimento = await this.atendimentoRepository.findOne(id)
    // Não sei a uma ForbiddenException é o correto para esse caso, se der tempo eu volto e verifico
    if (atendimento.startTime)
      throw new ForbiddenException('Atendimento ja iniciado!')
    atendimento.startTime = new Date()
    return this.atendimentoRepository.save(atendimento)
  }

  async finishAtendimento(id: number): Promise<Atendimento> {
    const atendimento = await this.atendimentoRepository.findOne(id)

    if (!atendimento.startTime || atendimento.finishTime)
      throw new ForbiddenException('Atendimento ja iniciado ou finalizado!')

    // Adiciona a duração maxima à data de inicio para achar a data limite
    const dataLimite = dayjs(atendimento.startTime).add(
      atendimento.maxTime,
      'minutes'
    )

    // Se já tiver passado da data limite de finalização do atendimento então
    // a data de término é considerada a data limite, ou seja, o atendimento terá a duração máxima
    // Considerei essa uma alternativa melhor do que impedir o atendimento de ser finalizado
    // Como os serviços são medidos em minutos o cálculo aqui usa a precisão de minutos
    if (dayjs().isBefore(dataLimite, 'minutes')) {
      atendimento.finishTime = new Date()
    } else {
      atendimento.finishTime = dataLimite.toDate()
    }
    return this.atendimentoRepository.save(atendimento)
  }
}
