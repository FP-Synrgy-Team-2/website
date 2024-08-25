import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '@/components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ButtonSecondary: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <Button
      className={`border-2 border-primary-dark-blue text-primary-dark-blue hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-300 ${className}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonSecondary;
