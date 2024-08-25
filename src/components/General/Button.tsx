import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        `btn rounded-xl px-4 py-2 text-center text-md-body font-semibold focus:outline-none focus:ring-2`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
