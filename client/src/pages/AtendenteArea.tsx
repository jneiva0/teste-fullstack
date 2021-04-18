import { Box } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CadastrarServicoButton } from '../components/CadastrarServicoButton'
import { apiCreateServico } from '../lib/api'

// A area do atendente não checa login, e é acessível para todos pela url
// obviamente em um cenário real essa área seria protegida, pensei em aproveitar
// a autenticação do cliente e separar por roles e usar as roles para fazer a autorização
// nas chamadas da API. Da forma atual qualquer um pode usar a funcionalidade do atendente.
// Foi uma questão de prioridades, outras features se enquadraram mais no escopo do teste
// do que fazer um sistema funcional de autenticação e autorização

export const AtendenteArea = () => {
  return (
    <Box p={4}>
      <CadastrarServicoButton mr={3} onCriar={apiCreateServico} />
      <Link to='atendimentos'>
        <Button>Gerenciar atendimentos</Button>
      </Link>
    </Box>
  )
}
