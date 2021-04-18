import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetAtendimentos } from '../lib/api'
import { Atendimento } from '../lib/types'

// Aqui estou fazendo diferente e usando o redux para buscar os atendimentos, ao contrário do SWR
// como fiz para buscar os serviços, vou deixar dessa forma pelo tempo. O dilema é que o SWR
// faz um trabalho por trás das cenas que facilita bastante, mas como o app está usando o redux
// eu daria preferencia aos thunks para lidar com a parte assincrona e já integrar tudo usando o redux
// como o meio principal de comunicação

interface AtendimentosState {
  atendimentos: Atendimento[]
}

const initialState: AtendimentosState = {
  atendimentos: [],
}

export const fetchAtendimentos = createAsyncThunk(
  'atendimento/fetchAtendimentos',
  async () => {
    const response = await apiGetAtendimentos()
    return response.data
  }
)

export const atendimentoSlice = createSlice({
  name: 'atendimento',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAtendimentos.fulfilled, (state, action) => {
      state.atendimentos = action.payload
    })
  },
})

// export const {} = atendimentoSlice.actions

export const atendimentoReducer = atendimentoSlice.reducer
