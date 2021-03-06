import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiCreateAtendimento } from '../lib/api/atendimento'
import { CreateAtendimentoInput, Servico } from '../lib/types'
import { calculaValorTotalServicos } from '../lib/util'
import { RootState } from './store'

// No inicio eu não estava usando Redux, apenas usando a lib SWR para data fetching e trabalhando com estado local aos componentes
// Introduzi o Redux tarde no processo (refleti que talvez fosse obrigatório no teste), com mais tempo eu refatoraria para usar o redux
// como "Single source of truth" como geralmente é feito. Da forma atual acho que acabei introduzindo mais confusão ao código junto com o redux,
// já que analisar e refatorar o resto do código vai exigir um tempo que talvez eu não tenho.

// Atualmente não há nenhuma validação para impedir o cliente de selecionar o mesmo serviço mais de uma vez
// Isso cria diversos problemas

interface NovoAtendimentoState {
  // Representa os servicos adicionados pelo cliente no atendimento
  servicos: Servico[]
}

const initialState: NovoAtendimentoState = {
  servicos: [],
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
    adicionarServico: (state, action: PayloadAction<Servico>) => {
      state.servicos.push(action.payload)
    },
  },
  extraReducers: builder => {
    // Resetando o estado após a conclusão do pedido para permitir fazer outro.
    builder.addCase(createAtendimento.fulfilled, (state, action) => {
      state.servicos = []
    })
  },
})

//TODO: no futuro usar a funcao createSelector para compor os selectors

export const totalMinutosSelector = (state: RootState) =>
  state.client.servicos.reduce((total, item) => total + item.minutos, 0)

export const totalValorSelector = (state: RootState) =>
  calculaValorTotalServicos(state.client.servicos)

export const { adicionarServico } = clientSlice.actions

export const clientReducer = clientSlice.reducer
