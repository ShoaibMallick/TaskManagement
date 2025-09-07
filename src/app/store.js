import { configureStore } from '@reduxjs/toolkit'
import projectReducer from '../features/task.js'

export const store = configureStore({
  reducer: {
    project: projectReducer
  },
})