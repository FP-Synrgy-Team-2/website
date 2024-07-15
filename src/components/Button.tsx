import { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
}

const Button: FC<ButtonProps> = ({ color, className, children, ...rest }) => {
  return (
    <button className={`btn bg-${color} ${className} px-4 py-2`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
