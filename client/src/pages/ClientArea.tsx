import { Box, Container, Divider, Heading, VStack } from '@chakra-ui/layout'
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stat,
  StatLabel,
  StatNumber,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React from 'react'
import { CheckUser } from '../components/CheckUser'
import { ServicoCard } from '../components/ServicoCard'
import { ServicoPicker } from '../components/ServicoPicker'
import { Servico } from '../lib/types'
import {
  adicionarServico,
  createAtendimento,
  totalMinutosSelector,
  totalValorSelector,
} from '../store/clientSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { LogoutButton } from '../components/LogoutButton'

export const ClientArea = () => {
  const { onClose, onOpen, isOpen } = useDisclosure()

  const toast = useToast()

  //TODO: Mover a lógica para um hook e deixar o componente lidar apenas com a UI
  const dispatch = useAppDispatch()

  const servicosToAtendimento = useAppSelector(
    state => state.client.servicosToAtendimento
  )

  const totalMinutos = useAppSelector(totalMinutosSelector)
  const totalValor = useAppSelector(totalValorSelector)

  const onAddServico = (servico: Servico) => {
    dispatch(adicionarServico({ servico }))
    onClose()
  }

  const createAtendimentoAction = async () => {
    await dispatch(
      createAtendimento({ servicosToAtendimento, maxTime: totalMinutos })
    )
    toast({ status: 'success', title: 'Seu atendimento foi criado!' })
  }

  //TODO: Isolar algumas partes em componentes separados para facilitar reutilização da UI

  return (
    <CheckUser>
      <Container pt={4} h='full'>
        <Heading>Novo Atendimento</Heading>
        <Button isFullWidth my={4} onClick={onOpen}>
          Adicionar Serviço
        </Button>
        <VStack>
          {/* Normalmente eu usaria o id do item como key, mas assumindo que o usuario  */}
          {/* possa pedir o mesmo servico mais de uma vez resolvi usar o indice mesmo */}
          {/* Usar o indice não é recomendado, principalmente se a ordem dos itens pode mudar  */}
          {servicosToAtendimento.map((servicoToAtendimento, i) => (
            <ServicoCard key={i} servico={servicoToAtendimento.servico} />
          ))}
        </VStack>
        <Divider my={4} />
        <HStack>
          <Stat>
            <StatLabel>Tempo total</StatLabel>
            <StatNumber>{totalMinutos} Minutos</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Valor total</StatLabel>
            {/* TODO: Talvez mover a formatação de moeda para uma função de utilidade */}
            <StatNumber>
              {totalValor.toLocaleString('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              })}
            </StatNumber>
          </Stat>
        </HStack>
        <Divider my={4} />
        <Button
          colorScheme='blue'
          isDisabled={servicosToAtendimento.length === 0}
          isFullWidth
          onClick={createAtendimentoAction}
        >
          Confirmar pedido
        </Button>
      </Container>
      <Box pos='absolute' bottom={3} right={3}>
        <LogoutButton />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Escolher Serviço</ModalHeader>
          <ModalBody>
            <ServicoPicker onSelect={onAddServico} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </CheckUser>
  )
}
