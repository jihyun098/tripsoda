import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './category'
import setTotalReducer from './total'
import productsReducer from './products'
import pageReducer from './page'
import filterReducer from './filter'
export const store = configureStore({
  reducer: {
    category: categoriesReducer,
    setTotal: setTotalReducer,
    products: productsReducer,
    setPage: pageReducer,
    filter: filterReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
