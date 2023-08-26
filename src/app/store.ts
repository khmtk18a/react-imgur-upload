import { configureStore } from '@reduxjs/toolkit'
import localStorageSlice from '../features/localStorageSlice'
import { ConnectedProps, connect } from 'react-redux';

const store = configureStore({
  reducer: {
    localStorage: localStorageSlice
  }
})

type RootState = ReturnType<typeof store.getState>;

const mapStateToProps = (state: RootState) => {
  return {
    localStorage: state.localStorage
  }
}

store.subscribe(() => {
  localStorage.setItem('images', JSON.stringify(store.getState().localStorage.items))
})

export type LocalStorageProps = ConnectedProps<typeof connector>
export const AppDispatch = store.dispatch
export const connector = connect(mapStateToProps)
export default store
