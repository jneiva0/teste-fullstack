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
import { ResumoAtendimento } from '../components/ResumoAtendimento'
import { useAtendimento } from '../hooks/useAtendimento'

export const ManageAtendimentoPage = () => {
  const { id } = useParams()

  const {
    atendimento,
    error,
    finishAtendimento,
    startAtendimento,
    duracaoTotal,
  } = useAtendimento(id)

  if (error) return <div>erro: {error.message}</div>

  if (!atendimento) return <div>loading...</div>

  const canStart = !atendimento.startTime
  const canFinish = !!atendimento.startTime && !atendimento.finishTime

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
        <Text>
          Hora de Término:{' '}
          {atendimento.finishTime
            ? dayjs(atendimento.finishTime).format('HH:mm:ss')
            : 'Em progresso'}
        </Text>

        <Stat>
          <StatLabel>Duração</StatLabel>
          {duracaoTotal && <StatNumber>{duracaoTotal} minutos</StatNumber>}
        </Stat>
        {/* Se o atendimento estiver finalizado mostrar o resumo, caso contrario mostrar */}
        {/* os botoes para iniciar e finalizar */}

        {atendimento.finishTime ? (
          <ResumoAtendimento atendimento={atendimento} />
        ) : (
          <Box>
            <Button
              isFullWidth
              isDisabled={!canStart}
              onClick={startAtendimento}
            >
              Iniciar atendimento
            </Button>

            <Button
              mt={3}
              isFullWidth
              isDisabled={!canFinish}
              onClick={finishAtendimento}
            >
              Finalizar atendimento
            </Button>
          </Box>
        )}
      </Stack>
    </Container>
  )
}
