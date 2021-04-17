import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ClientArea } from './pages/ClientArea'
import { AtendenteArea } from './pages/AtendenteArea'

function App() {
  return (
    <Routes>
      <Route path='/' element={<ClientArea />} />
      <Route path='/atendente' element={<AtendenteArea />} />
    </Routes>
  )
}

export default App
