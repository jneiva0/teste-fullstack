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
import {
  apiFinishAtendimento,
  apiGetAtendimento,
  apiStartAtendimento,
} from '../lib/api/atendimento'

export const ManageAtendimentoPage = () => {
  const { id } = useParams()

  // TODO: lidar com status de loading ou erro
  const { data, mutate, error } = useSWR([`atendimento/${id}`, id], (_, id) =>
    apiGetAtendimento(id)
  )

  const atendimento = data?.data

  //TODO: lidar com o caso de não existir um id valido. Ex: entrar na rota com um id não numerico
  //      Ex: /atendente/atendimento/abc

  // mutate é uma função que revalida a query, se chamada sem argumentos ela faz a query novamente
  // se passado uma promise ela atualiza os dados com o resultado da promise.
  // Como a chamada na API retorna o atendimento no sucesso, esse retorno é aproveitado para evitar uma chamada adicional na API
  const startAtendimento = async () => mutate(apiStartAtendimento(parseInt(id)))

  const finishAtendimento = async () =>
    mutate(apiFinishAtendimento(parseInt(id)))

  if (error) return <div>erro: {error.message}</div>

  if (!atendimento) return <div>loading...</div>

  // Atualmente a duraçao não atualiza a não ser que algo force o rerender do componente
  // ou a pagina seja atualizada, acredito que a maneira ideal seria usar uma ref para atualizar o elemento diretamente
  // mas existem alguns truques que tambem resolveriam, como um setInterval atualizando a duraçao através do hook useState

  const duracaoAtual =
    atendimento.startTime &&
    dayjs(new Date()).diff(atendimento.startTime, 'minutes')

  const duracaoTotal =
    atendimento.finishTime && atendimento.startTime
      ? dayjs(atendimento.finishTime).diff(atendimento.startTime, 'minutes')
      : duracaoAtual

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
        <Box>
          <Button isFullWidth isDisabled={!canStart} onClick={startAtendimento}>
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
      </Stack>
    </Container>
  )
}
