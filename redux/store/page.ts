import { products } from '@prisma/client'
import { ProductType } from '../action/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface initialType {
  page: number
}

const initialState: initialType = {
  page: 1,
}

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state) => {
      state.page
    },
  },
})

export default pageSlice.reducer
export const { setPage } = pageSlice.actions
