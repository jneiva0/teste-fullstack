import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useServicos } from '../hooks/useServicos'
import { Servico } from '../lib/types'
import { ServicoCard } from './ServicoCard'

type Props = {
  onSelect: (servico: Servico) => void
}

export const ServicoPicker = (props: Props) => {
  const { servicos, error } = useServicos()

  if (error)
    return (
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle mr={2}>Erro</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )

  if (!servicos) return <Spinner />

  return (
    <VStack>
      {servicos.map(servico => (
        <ServicoCard
          key={servico.id}
          servico={servico}
          onClick={() => props.onSelect(servico)}
        />
      ))}
    </VStack>
  )
}
