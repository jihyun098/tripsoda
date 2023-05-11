import { CategoryType } from '../action/types'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
interface initialType {
  categories: CategoryType[]
  selectedCategory: string | string
  error: string | undefined
}

const initialState: initialType = {
  categories: [],
  selectedCategory: '-1',
  error: '',
}

// export const fetchCategory = {
//   getEmployees: createAsyncThunk('GET/EMPLOYEES', async () => {
//     return axios.get('api/get-categories').then((response) => response.data)
//   }),
// }

export const getCategories = createAsyncThunk('GET/CATEGORY', async () => {
  try {
    const result = await axios.get('/api/get-categories')
    return result.data.items
  } catch (err) {
    console.error(err)
  }
})

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.categories = []
    }),
      builder.addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      }),
      builder.addCase(
        getCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload.errorMessage
        }
      )
  },
})

export default categorySlice.reducer
export const { setCategory } = categorySlice.actions
