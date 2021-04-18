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
import dayjs from 'dayjs'
import React from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { apiGetAtendimento, apiStartAtendimento } from '../lib/api/atendimento'

export const ManageAtendimentoPage = () => {
  const { id } = useParams()

  // TODO: lidar com status de loading ou erro
  const { data, mutate, error } = useSWR([`atendimento/${id}`, id], (_, id) =>
    apiGetAtendimento(id)
  )

  const atendimento = data?.data

  //TODO: lidar com o caso de não existir um id valido. Ex: entrar na rota com um id não numerico
  //      Ex: /atendente/atendimento/abc

  const startAtendimento = async () => {
    const updatedAtendimento = await apiStartAtendimento(parseInt(id))
    mutate(updatedAtendimento)
  }

  if (error) return <div>erro: {error.message}</div>

  if (!atendimento) return <div>loading...</div>

  const canStart = !atendimento.startTime
  const canFinish = !!atendimento.startTime && !atendimento.finishTime

  const duracao = atendimento.startTime
    ? dayjs(atendimento.startTime).fromNow(true)
    : 'Nao iniciado'

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
            ? dayjs(atendimento.startTime).format('HH:mm:ss')
            : 'Nao iniciado'}
        </Text>

        <Stat>
          <StatLabel>Duração Atual</StatLabel>
          <StatNumber>{duracao}</StatNumber>
        </Stat>
        <Box>
          <Button isFullWidth isDisabled={!canStart} onClick={startAtendimento}>
            Iniciar atendimento
          </Button>

          <Button mt={3} isFullWidth isDisabled={!canFinish}>
            Finalizar atendimento
          </Button>
        </Box>
      </Stack>
    </Container>
  )
}
