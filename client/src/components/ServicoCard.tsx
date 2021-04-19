import { Box, BoxProps, Heading, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Servico } from '../lib/types'

type Props = {
  servico: Servico
} & BoxProps

export const ServicoCard = ({ servico, ...rest }: Props) => (
  <Box
    bg='ButtonFace'
    cursor='pointer'
    _hover={{
      bg: 'ButtonHighlight',
    }}
    rounded={8}
    p={2}
    w='full'
    {...rest}
  >
    <Box>
      <Heading as='h4' size='md' mb={1}>
        {servico.nome}
      </Heading>
      <HStack justify='space-between'>
        <Text>
          {servico.valor.toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          })}
        </Text>

        <Text>{servico.minutos} Minutos</Text>
      </HStack>
    </Box>
  </Box>
)
