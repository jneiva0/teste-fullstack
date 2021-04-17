import React, { FC } from 'react'
import { useUsuario } from '../hooks/useUsuario'
import { Center, Spinner } from '@chakra-ui/react'
import { AuthForm } from './AuthForm'

export const CheckUser: FC = ({ children }) => {
  const { loading, user, login, register } = useUsuario()

  if (loading)
    return (
      <Center h='100vh'>
        <Spinner />
      </Center>
    )

  if (user) return <>{children}</>

  return <AuthForm onLogin={login} onRegister={register} />
}
