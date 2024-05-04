import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.push({
          id: uuidv4(),
          title: action.payload.title,
          description: action.payload.description,
          dueDate: action.payload.dueDate,
          priority: action.payload.priority,
          completed: false,
        });
      },
      prepare: (title, description, dueDate, priority) => ({
        payload: {
          title,
          description,
          dueDate,
          priority,
        },
      }),
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    },
  },
});

export const { addTask, deleteTask, toggleTask } = tasksSlice.actions;

export default tasksSlice.reducer;
