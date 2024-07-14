import {FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color : string;
}

const Button: FC<ButtonProps> = ({color, className, children, ...rest}) => {
    return (
        <button className={`btn bg-${color} ${className} py-2 px-4`}{...rest}>
            {children}
        </button>
    )
}

export default Button