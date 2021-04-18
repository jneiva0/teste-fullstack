import { Container, VStack } from '@chakra-ui/layout'
import { HStack } from '@chakra-ui/react'
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAtendimentos } from '../store/atendimentoSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export const AtendimentosPage = () => {
  const dispatch = useAppDispatch()

  const atendimentos = useAppSelector(state => state.atendimento.atendimentos)

  // O fetch é realizado somente durante o mount do componente,
  // é simples, mas acredito que irá servir para esse caso
  // em um cenário real deveria ser levado em consideração status de loading ou erro.
  useEffect(() => {
    dispatch(fetchAtendimentos())
    // Acredito que a funcao dispatch é estavel e não muda durante os re-renders
    // a não ser que a instancia da store mude. Por questão de compatibilidade com
    // o plugin para hooks do eslint a solução mais simples é simplesmente incluir
    // no array de dependencias
  }, [dispatch])

  return (
    <Container>
      <VStack pt={8} align='stretch' spacing={5}>
        {atendimentos.map(atendimento => (
          // TODO: Reutilizar os estilos definidos pelo ServicoCard
          // TODO: Abstrair em um componente proprio
          <Link
            key={atendimento.id}
            to={`/atendente/atendimento/${atendimento.id}`}
          >
            <HStack
              bg='ButtonFace'
              p={2}
              cursor='pointer'
              _hover={{
                bg: 'ButtonHighlight',
              }}
              rounded={8}
              w='full'
              justify='space-between'
            >
              <Stat>
                <StatLabel>Atendimento</StatLabel>
                <StatNumber>#{atendimento.id}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Criado em</StatLabel>
                <StatNumber whiteSpace='nowrap'>
                  {dayjs(atendimento.createdAt).format('DD/MM HH:mm')}
                </StatNumber>
              </Stat>
            </HStack>
          </Link>
        ))}
      </VStack>
    </Container>
  )
}
