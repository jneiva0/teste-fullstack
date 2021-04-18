import { Button } from '@chakra-ui/react'
import React from 'react'
import { useUsuario } from '../hooks/useUsuario'

export const LogoutButton = () => {
  const { logout } = useUsuario()
  return <Button onClick={logout}>Logout</Button>
}
