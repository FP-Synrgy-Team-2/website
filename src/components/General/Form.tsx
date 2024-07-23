import React from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface FormProps<T extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  methods: UseFormReturn<T>;
}

const FormContent = <T extends FieldValues>(
  { onSubmit, children, className, methods, ...props }: FormProps<T>,
  ref: React.Ref<HTMLFormElement>
) => {
  return (
    <FormProvider {...methods}>
      <form
        ref={ref}
        onSubmit={methods.handleSubmit(onSubmit)}
        className={twMerge('space-y-2', className)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};

const Form = React.forwardRef(FormContent) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.Ref<HTMLFormElement> }
) => ReturnType<typeof FormContent>;

export default Form;
