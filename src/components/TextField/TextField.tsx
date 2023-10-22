import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import styles from './TextField.module.scss';

interface TextFieldProps<T> {
  isTextarea: boolean;
  label: string;
  name: string;
  field: FieldEntry;
  placeholder?: string;
  setField: React.Dispatch<React.SetStateAction<T>>;
}

interface FieldEntry {
  value: string;
  error: string | null;
  required: boolean;
}
const TextField = <T,>({
  isTextarea,
  label,
  name,
  placeholder,
  field,
  setField,
}: TextFieldProps<T>) => {
  const setError = useCallback(
    (message: string | null) => {
      setField((prev) => ({
        ...prev,
        [name]: {
          ...prev[name as keyof T],
          error: message,
        },
      }));
    },
    [name, setField],
  );

  const setValue = useCallback(
    (value: string) => {
      setField((prev) => ({
        ...prev,
        [name]: {
          ...prev[name as keyof T],
          value: value,
        },
      }));
    },
    [name, setField],
  );

  const { error, required, value } = field;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (required && !inputValue) {
      setError('This field is required');
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    setValue(value);

    return () => {
      setError(null);
      setValue('');
    };
  }, [setError, setValue]);

  const commonProps = {
    placeholder,
    onBlur: handleInputChange,
    onChange: handleInputChange,
    value,
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      {isTextarea ? (
        <textarea
          {...commonProps}
          className={clsx(styles.field, styles.textarea)}
        />
      ) : (
        <input type="text" className={styles.field} {...commonProps} />
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TextField;
