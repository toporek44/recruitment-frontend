import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/taskSlice';

const store = configureStore({
  reducer: {
    tasks: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
