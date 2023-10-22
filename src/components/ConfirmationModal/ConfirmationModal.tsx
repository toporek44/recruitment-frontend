import { ReactNode } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './ConfirmationModal.module.scss';

interface ConfirmationModalProps {
  onSubmit: () => void;
  title: string;
  openButton: ReactNode;
}

const ConfirmationModal = ({
  onSubmit,
  title,
  openButton,
}: ConfirmationModalProps) => {
  const handleSubmit = (closeModal: () => void) => () => {
    onSubmit();
    closeModal();
  };

  return (
    <Modal
      content={(closeModal) => (
        <div className={styles.buttons}>
          <Button error onClick={closeModal}>
            no
          </Button>
          <Button success onClick={handleSubmit(closeModal)}>
            yes
          </Button>
        </div>
      )}
      title={title}
      openButton={openButton}
    />
  );
};

export default ConfirmationModal;
