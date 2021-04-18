import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginInput, RegisterInput } from '../lib/types'

type Props = {
  onLogin: (data: LoginInput) => Promise<any>
  onRegister: (data: RegisterInput) => Promise<any>
}

//TODO: Separar os componentes de Login e Registro
//TODO: adicionar um status de loading e erro

//TODO: usar o react-hook-form para validacao e para evitar os avisos do chromium sobre
//      ter um password field fora de um formulario

export const AuthForm = (props: Props) => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const toast = useToast()

  //TODO: fazer um tratamento adequado de erros
  const action = async () => {
    try {
      if (isLogin) await props.onLogin({ email, senha })
      else {
        await props.onRegister({ email, senha })
        toast({ status: 'success', title: 'Registrado!' })
      }
    } catch (err) {
      toast({ status: 'error', title: 'Erro', description: err.message })
    }
  }

  return (
    <Container>
      <VStack pt={24}>
        <FormControl id='email'>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type='email'
          />
        </FormControl>

        <FormControl id='senha'>
          <FormLabel>Senha</FormLabel>
          <Input
            value={senha}
            onChange={e => setSenha(e.target.value)}
            type='password'
          />
        </FormControl>
      </VStack>
      <Button onClick={action} mt={6} isFullWidth>
        {isLogin ? 'Entrar' : 'Criar Conta'}
      </Button>
      <Button
        isFullWidth
        variant='link'
        onClick={() => setIsLogin(!isLogin)}
        mt={5}
      >
        {isLogin ? 'Não tenho uma conta' : 'Já tenho uma conta'}
      </Button>
      <Link to='/atendente'>
        <Button mt={4} variant='link' isFullWidth>
          Area do atendente
        </Button>
      </Link>
    </Container>
  )
}
