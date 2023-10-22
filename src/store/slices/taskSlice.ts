import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageTyped } from '../../utils/localStorageTyped';

type TaskStatus = 'completed' | 'pending';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
}

const { setItem: serializeTasks, getItem: getInitialTasks } =
  localStorageTyped<Task[]>('tasks');

const initialState: Task[] = getInitialTasks() || [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
      }>,
    ) => {
      const { title, description } = action.payload;
      const id = crypto.randomUUID();

      state.push({
        id,
        title,
        description,
        status: 'pending',
      });
      serializeTasks(state);
    },
    editTask: (
      state,
      action: PayloadAction<{ id: string; title: string; description: string }>,
    ) => {
      const { id, title, description } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        serializeTasks(state);
      }
    },
    setTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: TaskStatus }>,
    ) => {
      const { id, status } = action.payload;
      const task = state.find((task) => task.id === id);

      if (task) {
        task.status = status;
        serializeTasks(state);
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      const modifiedState = state.filter((todo) => todo.id !== action.payload);
      serializeTasks(modifiedState);

      return modifiedState;
    },
  },
});

export const { addTask, setTaskStatus, removeTask, editTask } =
  taskSlice.actions;
export default taskSlice.reducer;
