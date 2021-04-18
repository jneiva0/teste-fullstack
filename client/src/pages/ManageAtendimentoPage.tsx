import { Heading, Text } from '@chakra-ui/layout'
import {
  Box,
  Button,
  Container,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { apiGetAtendimento } from '../lib/api/atendimento'
import { timestampToDate } from '../lib/util'

export const ManageAtendimentoPage = () => {
  const { id } = useParams()

  const { data } = useSWR([`atendimento/${id}`, id], id =>
    apiGetAtendimento(id)
  )

  const atendimento = data?.data

  if (!atendimento) return <div>loading...</div>

  return (
    <Container pt={8}>
      <Stack spacing={5}>
        <Heading size='lg'>Atendimento #{atendimento.id}</Heading>
        <Stat>
          <StatLabel>Duração Máxima</StatLabel>
          <StatNumber>{atendimento.maxTime} minutos</StatNumber>
        </Stat>
        <Text>
          Hora de Inicio:{' '}
          {atendimento.startTime
            ? timestampToDate(atendimento.startTime)
            : 'Nao iniciado'}
        </Text>
        <Box>
          <Button isFullWidth isDisabled={!!atendimento.startTime}>
            Iniciar atendimento
          </Button>

          <Button mt={3} isFullWidth isDisabled={!!atendimento.finishTime}>
            Finalizar atendimento
          </Button>
        </Box>
      </Stack>
    </Container>
  )
}
