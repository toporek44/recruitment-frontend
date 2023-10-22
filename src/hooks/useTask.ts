import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  editTask,
  removeTask,
  setTaskStatus,
} from '../store/slices/taskSlice';
import { RootState } from '../store/store';

export const useTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const completedTasks = tasks.filter((task) => task.status === 'completed');
  const pendingTasks = tasks.filter((task) => task.status === 'pending');

  const add = (data: { title: string; description: string }) =>
    dispatch(addTask(data));

  const edit = (data: { id: string; title: string; description: string }) =>
    dispatch(editTask(data));

  const moveToCompleted = (id: string) => () =>
    dispatch(setTaskStatus({ id, status: 'completed' }));

  const remove = (id: string) => () => dispatch(removeTask(id));

  const recreate = (id: string) => () => {
    dispatch(setTaskStatus({ id, status: 'pending' }));
  };

  return {
    add,
    edit,
    remove,
    recreate,
    moveToCompleted,
    pendingTasks,
    completedTasks,
  };
};
