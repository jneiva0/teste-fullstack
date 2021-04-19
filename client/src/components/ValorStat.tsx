import { Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import React from 'react'

export const ValorStat = (props: { valor: number }) => {
  return (
    <Stat>
      <StatLabel>Valor total</StatLabel>
      <StatNumber>
        {props.valor.toLocaleString('pt-BR', {
          currency: 'BRL',
          style: 'currency',
        })}
      </StatNumber>
    </Stat>
  )
}
