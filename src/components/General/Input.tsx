import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validation?: RegisterOptions;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ validation, className, ...props }, ref) => {
    const { register } = useFormContext();
    const registration = register(props.name!, validation);

    return (
      <input
        {...registration}
        className={twMerge(
          'file:border-0 file:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={(e) => {
          registration.ref(e);
          if (ref) {
            if (typeof ref === 'function') {
              ref(e);
            } else {
              (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                e;
            }
          }
        }}
        {...props}
      />
    );
  }
);

export default Input;
