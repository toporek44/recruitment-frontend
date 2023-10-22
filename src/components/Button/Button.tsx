import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  full?: boolean;
  icon?: boolean;
  success?: boolean;
  error?: boolean;
  type?: HTMLButtonElement['type'];
  className?: string;
}

const Button = ({
  className,
  children,
  full,
  disabled,
  icon,
  success,
  error,
  ...props
}: ButtonProps) => (
  <button
    className={clsx(className, styles.button, {
      [styles.full]: full,
      [styles.disabled]: disabled,
      [styles.icon]: icon,
      [styles.success]: success,
      [styles.error]: error,
    })}
    {...props}
  >
    {children}
  </button>
);

export default Button;
