import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useTask } from '../../hooks/useTask';
import { Task } from '../../store/slices/taskSlice';
import Button from '../Button/Button';
import TextField from '../TextField/TextField';
import styles from './ManageTaskForm.module.scss';

interface FieldEntry {
  value: string;
  error: string;
  required: boolean;
}

const initFieldEntry = (
  required: boolean = false,
  value = '',
  error = '',
): FieldEntry => ({
  value,
  error,
  required,
});

interface FormState {
  title: FieldEntry;
  description: FieldEntry;
}

interface ManageTaskFormProps {
  closeModal: () => void;
  initialData?: Task;
  edit?: boolean;
}

const ManageTaskForm = ({
  closeModal,
  initialData,
  edit,
}: ManageTaskFormProps) => {
  const { title, description } = initialData || {};
  const { add, edit: editTask } = useTask();
  const initialFormData = {
    title: initFieldEntry(true, title ?? ''),
    description: initFieldEntry(false, description ?? ''),
  };

  const [submitDisable, setSubmitDisable] = useState(false);
  const [formState, setFormState] = useState<FormState>(initialFormData);

  const isFieldsEmpty = useCallback(() => {
    const emptyFields = Object.entries(formState).filter(
      ([, { required, value }]) => required && !value,
    );

    const isEmpty = Boolean(emptyFields.length);

    if (isEmpty) {
      setSubmitDisable(true);
    } else {
      setSubmitDisable(false);
    }

    return isEmpty;
  }, [formState]);

  useEffect(() => {
    isFieldsEmpty();
  }, [isFieldsEmpty, formState]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const { title, description } = formState;
    if (!isFieldsEmpty()) {
      if (edit && initialData) {
        editTask({
          id: initialData?.id,
          title: title.value,
          description: description.value,
        });
      } else {
        add({
          title: title.value,
          description: description.value,
        });
      }

      closeModal();
    }
  };

  return (
    <form onSubmit={submit}>
      <TextField
        isTextarea={false}
        label="Title"
        placeholder="Name of your task..."
        name="title"
        field={formState.title}
        setField={setFormState}
      />
      <TextField
        isTextarea={true}
        label="Description"
        placeholder="Describe your task..."
        name="description"
        field={formState.description}
        setField={setFormState}
      />
      <Button
        full
        type="submit"
        className={styles.submit}
        disabled={submitDisable}
      >
        Save
      </Button>
    </form>
  );
};

export default ManageTaskForm;
