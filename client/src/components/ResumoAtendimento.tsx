import { Divider } from '@chakra-ui/layout'
import {
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import React from 'react'
import { Atendimento } from '../lib/types'
import { calculaValorTotalServicos } from '../lib/util'
import { ValorStat } from './ValorStat'

type Props = {
  atendimento: Atendimento
}

export const ResumoAtendimento = ({ atendimento }: Props) => {
  const valorTotal = calculaValorTotalServicos(atendimento.servicos)

  return (
    <Stack>
      <Divider />
      <ValorStat valor={valorTotal} />
      {atendimento.servicos.map(
        servico =>
          servico.profissional && (
            <Stat key={servico.id}>
              <StatLabel>{servico.profissional}</StatLabel>
              <StatNumber>
                {(servico.valor * servico.comissao).toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                })}
              </StatNumber>
              <StatHelpText>Comissao</StatHelpText>
            </Stat>
          )
      )}
    </Stack>
  )
}
