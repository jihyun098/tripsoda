import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { TAKE } from 'constants/products'

interface initialType {
  total: number
}

const initialState: initialType = {
  total: 0,
}

const totalSlice = createSlice({
  name: 'setTotal',
  initialState,
  reducers: {
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = Math.ceil(action.payload / TAKE)
    },
  },
})

export default totalSlice.reducer
export const { setTotal } = totalSlice.actions
