import clsx from 'clsx';
import { useTask } from '../../hooks/useTask';
import { Task as TaskType } from '../../store/slices/taskSlice';
import Button from '../Button/Button';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { CheckCircleIcon, EditIcon, ReturnIcon, TrashIcon } from '../icons';
import ManageTaskForm from '../ManageTaskForm/ManageTaskForm';
import Modal from '../Modal/Modal';
import styles from './Task.module.scss';

interface TaskProps {
  task: TaskType;
}

const Task = ({ task }: TaskProps) => {
  const { title, description, status, id } = task;
  const { moveToCompleted, remove, recreate } = useTask();

  const isPending = status === 'pending';

  return (
    <li
      className={clsx(styles.wrapper, {
        [styles.completed]: !isPending,
      })}
    >
      <div className={styles.content}>
        <p className={styles.title}>Task: {title}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={clsx(styles.status, styles[status])}>{status}</div>

      <div className={styles.controls}>
        {isPending ? (
          <>
            <Button
              className={styles.success}
              icon
              onClick={moveToCompleted(id)}
            >
              <CheckCircleIcon />
            </Button>
            <ConfirmationModal
              openButton={
                <Button className={styles.error} icon>
                  <TrashIcon />
                </Button>
              }
              onSubmit={remove(id)}
              title="Are you sure to delete this task?"
            />
            <Modal
              content={(closeModal) => (
                <ManageTaskForm
                  closeModal={closeModal}
                  initialData={task}
                  edit
                />
              )}
              title={'Edit task'}
              openButton={
                <Button className={styles.info} icon>
                  <EditIcon />
                </Button>
              }
            />
          </>
        ) : null}

        {!isPending && (
          <Button className={styles.info} icon onClick={recreate(id)}>
            <ReturnIcon />
          </Button>
        )}
      </div>
    </li>
  );
};

export default Task;
