import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '@/components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ButtonPrimary: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <Button
      className={`bg-primary-blue text-white hover:bg-primary-dark-blue focus:bg-primary-dark-blue active:bg-primary-dark-blue ${className}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
