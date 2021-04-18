import { Container, Divider, Heading, VStack } from '@chakra-ui/layout'
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
} from '@chakra-ui/react'
import React from 'react'
import { CheckUser } from '../components/CheckUser'
import { ServicoCard } from '../components/ServicoCard'
import { ServicoPicker } from '../components/ServicoPicker'
import { Servico } from '../lib/types'
import {
  adicionarServico,
  totalMinutosSelector,
  totalValorSelector,
} from '../store/clientSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

//TODO: Mover a lógica para um hook e deixar o componente lidar apenas com a UI
export const ClientArea = () => {
  const { onClose, onOpen, isOpen } = useDisclosure()

  const dispatch = useAppDispatch()

  const onAddServico = (servico: Servico) => {
    dispatch(adicionarServico(servico))
    onClose()
  }

  const servicos = useAppSelector(state => state.client.servicos)
  const totalMinutos = useAppSelector(totalMinutosSelector)
  const totalValor = useAppSelector(totalValorSelector)

  //TODO: Isolar algumas partes em componentes separados para facilitar reutilização da UI

  return (
    <CheckUser>
      <Container mt={4}>
        <Heading>Novo Atendimento</Heading>
        <Button isFullWidth my={4} onClick={onOpen}>
          Adicionar Serviço
        </Button>
        <VStack>
          {/* Normalmente eu usaria o id do item como key, mas assumindo que o usuario  */}
          {/* possa pedir o mesmo servico mais de uma vez resolvi usar o indice mesmo */}
          {/* Usar o indice não é recomendado, principalmente se a ordem dos itens pode mudar  */}
          {servicos.map((servico, i) => (
            <ServicoCard key={i} servico={servico} />
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
          isDisabled={servicos.length === 0}
          isFullWidth
        >
          Confirmar pedido
        </Button>
      </Container>
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
