import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ClientArea } from './pages/ClientArea'
import { AtendenteArea } from './pages/AtendenteArea'
import { AtendimentosPage } from './pages/AtendimentosPage'

// Já que está sendo usado o react-router, eu aproveitaria para criar rotas aninhadas para aproveitar
// partes do layout onde é relevante. Por exemplo: uma sidebar com um menu de ações na AtendenteArea,
// as rotas especificas como a página de gerenciamento de atendimentos ficariam dentro dessa rota.

// A outra opção seria ter um componente de Layout e importar ele onde necessário, geralmente eu analiso
// as funcionalidades do app, numero de rotas, navegação etc.. para ver qual estratégia se encaixa melhor.

function App() {
  return (
    <Routes>
      <Route path='/' element={<ClientArea />} />
      <Route path='/atendente' element={<AtendenteArea />} />
      <Route path='/atendente/atendimentos' element={<AtendimentosPage />} />
    </Routes>
  )
}

export default App
