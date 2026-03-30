// // reduxStore configureStore  RootState AppDispatch useSelector useDispatch

// import { configureStore, createSlice } from "@reduxjs/toolkit";

// const counterslice = createSlice({
//     name: 'counter',
//     initialState: {value:0},
//     reducers: {
//         increment: (state) =>
//         {state.value +=1},
//         decrement: (state) =>
//         {state.value -=1},
//     }
// })
// export const {increment ,decrement}
// =counterslice.actions

// export const store = configureStore({
//     reducer:{ counter:
//         counterslice.reducer},
//     })
//  export type RootState= ReturnType<typeof store.getState>
//  export type AppDispatch = typeof store.dispatch



// reduxStore configureStore RootState AppDispatch useSelector useDispatch createApi fetchBaseQuery useQuery useMutation
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { postsApi } from './apiSlice'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
  },
})

export const { increment, decrement } = counterSlice.actions

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch