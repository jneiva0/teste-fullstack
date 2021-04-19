import { Divider } from '@chakra-ui/layout'
import { Stack } from '@chakra-ui/react'
import React from 'react'
import { Atendimento } from '../lib/types'
import { calculaValorTotalServicos } from '../lib/util'
import { ValorStat } from './ValorStat'

type Props = {
  atendimento: Atendimento
}

export const ResumoAtendimento = ({ atendimento }: Props) => {
  const valorTotal = calculaValorTotalServicos(
    atendimento.servicosToAtendimento
  )

  return (
    <Stack>
      <Divider />
      <ValorStat valor={valorTotal} />
    </Stack>
  )
}
