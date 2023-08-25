import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const localStorageSlice = createSlice({
  name: 'localStorage',
  initialState: {
    items: Object.values(localStorage) as string[]
  },
  reducers: {
    push: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload)
      localStorage.setItem(btoa(new Date().getTime().toString()), action.payload)
    }
  }
})

export const { push } = localStorageSlice.actions
export default localStorageSlice.reducer
