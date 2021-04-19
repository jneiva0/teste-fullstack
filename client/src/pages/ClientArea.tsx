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
import { ValorStat } from '../components/ValorStat'

export const ClientArea = () => {
  const { onClose, onOpen, isOpen } = useDisclosure()

  const toast = useToast()

  //TODO: Mover a lógica para um hook e deixar o componente lidar apenas com a UI
  const dispatch = useAppDispatch()

  const servicos = useAppSelector(state => state.client.servicos)

  const totalMinutos = useAppSelector(totalMinutosSelector)
  const totalValor = useAppSelector(totalValorSelector)

  const onAddServico = (servico: Servico) => {
    // verificação basica para impedir de adicionar serviços duplicados.
    // Está bem longe do ideal, seria melhor mover toda a lógica pro redux
    // Também é apenas um quickfix, o certo seria nem mostrar no modal servicos que já foram adicionados
    const isDuplicate = servicos.map(s => s.id).includes(servico.id)
    if (!isDuplicate) dispatch(adicionarServico(servico))
    onClose()
  }

  const createAtendimentoAction = async () => {
    await dispatch(createAtendimento({ servicos, maxTime: totalMinutos }))
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
          <ValorStat valor={totalValor} />
        </HStack>
        <Divider my={4} />
        <Button
          colorScheme='blue'
          isDisabled={servicos.length === 0}
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
