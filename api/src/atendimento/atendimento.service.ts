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

  // Com mais tempo eu faria essa API de uma forma diferente, não me parece interessante confiar apenas no cascade
  // para inserir as informações relacionadas.
  // Talvez uma alternativa melhor seria o cliente fazer uma chamada para criar um atendimento,
  // e então ter uma pagina do atendimento no frontend onde a cada serviço adicionado é feita uma chamada na API
  // que criaria um ServicoToAtendimento e adicionaria ele no atendimento. Com essa maior granularidade nas ações
  // vem a vantagem de que o estado do cliente fica sincronizado no banco de dados durante a criação do atendimento.
  // o cliente poderia até fechar a aba e continuar com o pedido mais tarde, sem necessidade de tratamento adicional
  async create(data: CreateAtendimentoInput): Promise<Atendimento> {
    const atendimento = this.atendimentoRepository.create(data)
    return this.atendimentoRepository.save(atendimento)
  }

  getAll(): Promise<Atendimento[]> {
    return this.atendimentoRepository.find({
      relations: ['servicosToAtendimento'],
    })
  }

  getOne(id: number): Promise<Atendimento> {
    return this.atendimentoRepository.findOne(id, {
      relations: ['servicosToAtendimento'],
    })
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
