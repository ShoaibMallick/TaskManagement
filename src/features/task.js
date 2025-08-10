import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state) => {
      state.value += 1
    },
    deleteTask: (state) => {
      state.value -= 1
    }
  },
})

export const { addTask, deleteTask} = counterSlice.actions

export default counterSlice.reducer