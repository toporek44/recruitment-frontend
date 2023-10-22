import { ReactNode, useState } from 'react';
import { CloseIcon } from '../icons';
import styles from './Modal.module.scss';

export interface ModalProps {
  content: (closeModal: () => void) => ReactNode;
  title: string;
  openButton: ReactNode;
}

function Modal({ content, title, openButton }: ModalProps) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <div onClick={openModal}>{openButton}</div>
      {open ? (
        <>
          <div className={styles.modal}>
            <div className={styles.header}>
              {title}{' '}
              <CloseIcon
                className={styles.close}
                onClick={closeModal}
                data-testid="close-icon"
              />
            </div>
            <div className={styles.content}>{content(closeModal)}</div>
          </div>
          <div className={styles.backdrop} onClick={closeModal} />
        </>
      ) : null}
    </>
  );
}

export default Modal;
