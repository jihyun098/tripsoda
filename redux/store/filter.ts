import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FILTERS } from 'constants/products'

interface initialType {
  label: string
  value: string | null
}

const initialState: initialType = {
  label: FILTERS[0].label,
  value: FILTERS[0].value,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    selectedFilter: (state) => {
      state.value
    },
    setFilter: (state, action) => {
      state.value = action.payload
    },
  },
})

export default filterSlice.reducer
export const { selectedFilter, setFilter } = filterSlice.actions
