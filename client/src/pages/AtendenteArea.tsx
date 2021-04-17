import { Box } from '@chakra-ui/layout'
import React from 'react'
import { CadastrarServicoButton } from '../components/CadastrarServicoButton'
import { apiCreateServico } from '../lib/api'

export const AtendenteArea = () => {
  return (
    <Box p={4}>
      <CadastrarServicoButton onCriar={apiCreateServico} />
    </Box>
  )
}
