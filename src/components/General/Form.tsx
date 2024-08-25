import { FormHTMLAttributes, ReactNode, forwardRef, Ref } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface FormProps<T extends FieldValues>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  methods: UseFormReturn<T>;
  className?: string;
  ariaLabel?: string;
}

const FormContent = <T extends FieldValues>(
  {
    onSubmit,
    children,
    className = '',
    methods,
    ariaLabel,
    ...props
  }: FormProps<T>,
  ref: Ref<HTMLFormElement>
) => {
  return (
    <FormProvider {...methods}>
      <form
        ref={ref}
        onSubmit={methods.handleSubmit(onSubmit)}
        className={twMerge('w-full', className)}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};

const Form = forwardRef(FormContent) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: Ref<HTMLFormElement> }
) => ReturnType<typeof FormContent>;

export default Form;
