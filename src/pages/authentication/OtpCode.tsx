import { Form, Input } from '@/components';
// import useAuth from '@/hooks/useAuth';
// import usePassword from '@/hooks/usePassword';
import AuthLayout from '@/layouts/AuthLayout';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';

interface OtpCodeFormValues {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
}

const OtpCode = () => {
  const methods = useForm<OtpCodeFormValues>();
  // const { api } = useAuth();
  // const { email } = usePassword();
  // const navigate = useNavigate();

  const focusRef = React.useRef<number>(1);

  const handleOtpKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldIndex: number
  ) => {
    const isNumbericKey = /^[0-9]$/.test(e.key);
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (!isNumbericKey && e.key !== 'Backspace') {
      e.preventDefault();
    }

    if (
      value.length === 1 &&
      fieldIndex < 6 &&
      isNumbericKey &&
      e.key !== 'Backspace'
    ) {
      focusRef.current = fieldIndex + 1;
      methods.setValue(`otp${fieldIndex}` as keyof OtpCodeFormValues, value);
      methods.setFocus(`otp${fieldIndex + 1}` as keyof OtpCodeFormValues);
    } else if (value.length === 1 && e.key === 'Backspace' && fieldIndex > 1) {
      focusRef.current = fieldIndex - 1;
      methods.setValue(`otp${fieldIndex}` as keyof OtpCodeFormValues, '');
      methods.setFocus(`otp${fieldIndex - 1}` as keyof OtpCodeFormValues);
      e.preventDefault();
    }
  };

  const handleOtpKeyup = () => {
    const allValues = methods.getValues();
    if (Object.values(allValues).every((val) => val !== '')) {
      methods.handleSubmit(onSubmit)();
      methods.setFocus('otp1');
      focusRef.current = 1;
      methods.reset();
    }
  };

  const handleOtpFocus = (
    e: React.FocusEvent<HTMLInputElement>,
    fieldIndex: number
  ) => {
    if (fieldIndex !== focusRef.current) {
      e.target.blur();
    }
  };

  const onSubmit: SubmitHandler<OtpCodeFormValues> = async (data) => {
    console.log(Object.values(data).join(''));
  };

  return (
    <AuthLayout>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        className="mx-24 w-full md:mx-8"
      >
        <div>
          <h1
            className="text-md-display font-bold"
            aria-label="Atur ulang password"
          >
            Atur ulang password
          </h1>
          <p
            className="text-lg-body font-regular opacity-40"
            aria-label="Langkah dua dari tiga"
          >
            Step 2/3
          </p>
          <p
            className="text-lg-body font-regular opacity-40"
            aria-label="Langkah dua dari tiga"
          >
            Masukkan kode yang telah dikirimkan melalui e-mail
          </p>
        </div>
        <div className="flex w-full justify-center text-primary-blue">
          {[...Array(6)].map((_, index) => (
            <Input
              className="input-otp w-10 text-center text-2xl-display focus:ring-0 focus-visible:ring-0 active:ring-0"
              type="text"
              key={index}
              inputMode="numeric"
              maxLength={1}
              onPaste={(e) => e.preventDefault()}
              onKeyDown={(e) => handleOtpKeydown(e, index + 1)}
              onFocus={(e) => handleOtpFocus(e, index + 1)}
              onKeyUp={handleOtpKeyup}
              id={`otp${index + 1}`}
              name={`otp${index + 1}`}
              placeholder="•"
            />
          ))}
        </div>
      </Form>
    </AuthLayout>
  );
};

export default OtpCode;
