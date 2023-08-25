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

export const connector = connect(mapStateToProps)
export type LocalStorageProps = ConnectedProps<typeof connector>
export default store
