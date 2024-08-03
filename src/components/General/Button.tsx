import { FC, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
}

const Button: FC<ButtonProps> = ({ color, className, children, ...rest }) => {
  return (
    <button
      className={twMerge(`btn bg-${color} px-4 py-2`, className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
