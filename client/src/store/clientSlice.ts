import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiCreateAtendimento } from '../lib/api'
import { CreateAtendimentoInput, ServicoToAtendimento } from '../lib/types'
import { RootState } from './store'

interface NovoAtendimentoState {
  // Representa os servicos adicionados pelo cliente no atendimento
  servicosToAtendimento: ServicoToAtendimento[]
}

const initialState: NovoAtendimentoState = {
  servicosToAtendimento: [],
}

export const createAtendimento = createAsyncThunk(
  'client/createAtendimentoStatus',
  async (data: CreateAtendimentoInput, thunkAPI) => {
    const response = await apiCreateAtendimento(data)
    return response.data
  }
)

// Contem a lógica e as funcionalidades do cliente, no momento apenas criar/pedir um atendimento
export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    adicionarServico: (state, action: PayloadAction<ServicoToAtendimento>) => {
      state.servicosToAtendimento.push(action.payload)
    },
  },
  extraReducers: builder => {
    // Resetando o estado após a conclusão do pedido para permitir fazer outro.
    builder.addCase(createAtendimento.fulfilled, (state, action) => {
      state.servicosToAtendimento = []
    })
  },
})

//TODO: no futuro usar a funcao createSelector para compor os selectors

export const totalMinutosSelector = (state: RootState) =>
  state.client.servicosToAtendimento.reduce(
    (total, item) => total + item.servico.minutos,
    0
  )

export const totalValorSelector = (state: RootState) =>
  state.client.servicosToAtendimento.reduce(
    (total, item) => total + item.servico.valor,
    0
  )

export const { adicionarServico } = clientSlice.actions

export const clientReducer = clientSlice.reducer
