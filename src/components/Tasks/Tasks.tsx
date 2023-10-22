import { Task as TaskType } from '../../store/slices/taskSlice';
import Task from '../Task/Task';
import styles from './Tasks.module.scss';

interface TasksProps {
  tasks: TaskType[];
  label: string;
  completed?: boolean;
}

const Tasks = ({ tasks, label, completed }: TasksProps) => {
  return (
    <div>
      <p className={styles.label}>{label}</p>
      <ul className={styles.wrapper}>
        {tasks.length
          ? tasks.map((task) => <Task key={task.id} task={task} />)
          : `There is no ${completed ? 'completed' : 'created'} tasks.`}
      </ul>
    </div>
  );
};

export default Tasks;
