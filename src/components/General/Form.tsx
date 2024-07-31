import React from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

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
        className={className}
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
