import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/task.js'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
})