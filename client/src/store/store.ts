import { configureStore } from '@reduxjs/toolkit'
import { atendimentoReducer } from './atendimentoSlice'
import { clientReducer } from './clientSlice'

export const store = configureStore({
  reducer: {
    client: clientReducer,
    atendimento: atendimentoReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
