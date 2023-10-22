import { useTask } from '../../hooks/useTask';
import Button from '../Button/Button';
import { PlusIcon } from '../icons';
import ManageTaskForm from '../ManageTaskForm/ManageTaskForm';
import Modal from '../Modal/Modal';
import Tasks from '../Tasks/Tasks';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { pendingTasks, completedTasks } = useTask();
  const taskNumberLabel = pendingTasks.length === 1 ? 'task' : 'tasks';

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles['header-title']}>
          You&apos;ve got&nbsp;
          <span className={styles.highlight}>
            {pendingTasks.length} {taskNumberLabel}
          </span>{' '}
          today
        </h1>
        <Modal
          content={(closeModal) => <ManageTaskForm closeModal={closeModal} />}
          title={'Add new task'}
          openButton={
            <Button>
              <PlusIcon /> Add new
            </Button>
          }
        />
      </div>
      <Tasks tasks={pendingTasks} label="On Hold" />
      <Tasks tasks={completedTasks} label="Completed" completed />
    </div>
  );
};

export default Dashboard;
