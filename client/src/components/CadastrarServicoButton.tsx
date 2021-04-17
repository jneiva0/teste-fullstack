import { Button } from '@chakra-ui/button'
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { CreateServicoInput } from '../lib/types'

type Props = {
  onCriar: (data: CreateServicoInput) => Promise<any>
}

export const CadastrarServicoButton = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register, formState, setValue } = useForm()
  const onEnviar = async (data: CreateServicoInput) => {
    console.log(data)
    await props.onCriar(data)
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen}>Cadastrar Serviço</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onEnviar)}>
            <ModalHeader>Cadastrar Serviço</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel htmlFor='nome'>Nome</FormLabel>
                <Input {...register('nome', { required: true })} />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Valor</FormLabel>
                {/* O NumberInput precisa de um tratamento especial para não causar problemas com o react-hook-form, em um projeto sério eu abstrairía isso em um componente próprio */}
                <NumberInput
                  precision={2}
                  min={0}
                  {...register('valor', {
                    required: true,
                    valueAsNumber: true,
                  })}
                  onChange={(_, valorNumber) => setValue('valor', valorNumber)}
                >
                  <NumberInputField name='valor' />
                </NumberInput>
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Duracao (em minutos)</FormLabel>
                <NumberInput
                  precision={0}
                  min={0}
                  {...register('minutos', {
                    required: true,
                    valueAsNumber: true,
                  })}
                  onChange={(_, valorNumber) =>
                    setValue('minutos', valorNumber)
                  }
                >
                  <NumberInputField name='minutos' />
                </NumberInput>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Profissional</FormLabel>
                <Input {...register('profissional')} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme='blue'
                isLoading={formState.isSubmitting}
                mr={3}
                type='submit'
              >
                Criar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
