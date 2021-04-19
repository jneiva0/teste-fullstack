import { Button } from '@chakra-ui/button'
import {
  ButtonProps,
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
} & ButtonProps

export const CadastrarServicoButton = ({ onCriar, ...rest }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register, formState, setValue } = useForm()
  const onEnviar = async (data: CreateServicoInput) => {
    console.log(data)
    const comissao = data.comissao ? data.comissao / 100 : 0
    await onCriar({ ...data, comissao })
    onClose()
  }

  return (
    <>
      <Button {...rest} onClick={onOpen}>
        Cadastrar Serviço
      </Button>
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
                {/* TODO: Configurar o Input para trabalhar com virgula nas casas decimais, como é o padrão brasileiro */}
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
              <FormControl mt={4}>
                <FormLabel>Comissao (%)</FormLabel>
                <NumberInput
                  precision={0}
                  min={0}
                  {...register('comissao', {
                    valueAsNumber: true,
                  })}
                  onChange={(_, valorNumber) =>
                    setValue('comissao', valorNumber)
                  }
                >
                  <NumberInputField name='comissao' />
                </NumberInput>
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
