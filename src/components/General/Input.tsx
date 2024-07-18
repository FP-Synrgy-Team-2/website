import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validation?: RegisterOptions;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ validation, className, ...props }, ref) => {
    const { register } = useFormContext();
    return (
      <input
        {...register(props.name!, validation)}
        className={twMerge(
          'flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
