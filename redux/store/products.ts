import { products } from '@prisma/client'
import { ProductType } from 'redux/action/type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface initialType {
  products: ProductType[]
}

const initialState: initialType = {
  products: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<products[]>) => {
      state.products = action.payload
    },
  },
})

export default productsSlice.reducer
export const { getProducts } = productsSlice.actions
