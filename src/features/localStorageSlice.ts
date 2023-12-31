import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const localStorageSlice = createSlice({
  name: 'localStorage',
  initialState: {
    items: JSON.parse(localStorage.getItem('images') || '[]') as string[]
  },
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload)
    }
  }
})

export const { addItem } = localStorageSlice.actions
export default localStorageSlice.reducer
