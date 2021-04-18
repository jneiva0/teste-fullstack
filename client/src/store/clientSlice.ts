import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Servico } from '../lib/types'
import { RootState } from './store'

interface NovoAtendimentoState {
  // Representa os servicos adicionados pelo cliente no atendimento
  servicos: Servico[]
}

const initialState: NovoAtendimentoState = {
  servicos: [],
}

// Contem a lógica e as funcionalidades do cliente, no momento apenas criar/pedir um atendimento
export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    adicionarServico: (state, action: PayloadAction<Servico>) => {
      state.servicos.push(action.payload)
    },
  },
})

//TODO: no futuro usar a funcao createSelector para compor os selectors

export const totalMinutosSelector = (state: RootState) =>
  state.client.servicos.reduce((total, item) => total + item.minutos, 0)

export const totalValorSelector = (state: RootState) =>
  state.client.servicos.reduce((total, item) => total + item.valor, 0)

export const { adicionarServico } = clientSlice.actions

export const clientReducer = clientSlice.reducer
