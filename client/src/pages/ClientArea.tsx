import React from 'react'
import { CheckUser } from '../components/CheckUser'
import { Outlet } from 'react-router-dom'

export const ClientArea = () => {
  return (
    <CheckUser>
      <Outlet />
    </CheckUser>
  )
}
