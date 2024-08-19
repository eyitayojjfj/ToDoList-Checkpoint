import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask(state, action) {
      state.push(action.payload);
    },
    updateTask(state, action) {
      const { id, changes } = action.payload;
      const index = state.findIndex(task => task.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...changes };
      }
    },
    deleteTask(state, action) {
      return state.filter(task => task.id !== action.payload);
    },
    toggleTaskCompletion(state, action) {
      const id = action.payload;
      const index = state.findIndex(task => task.id === id);
      if (index !== -1) {
        state[index].completed = !state[index].completed;
      }
    },
    setTasks(state, action) {
      return action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  setTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
