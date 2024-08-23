import { ButtonPrimary, Form, Input, Label } from '@/components';
import useAuth from '@/hooks/useAuth';
import usePassword from '@/hooks/usePassword';
import AuthLayout from '@/layouts/AuthLayout';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface ResetPasswordFormValues {
  new_password: string;
}

type ErrorResponse = {
  code: number;
  message: string;
  status: boolean;
};

const ResetPassword = () => {
  const [error, setError] = useState<ErrorResponse | null>(null);
  const navigate = useNavigate();
  const { email, otp } = usePassword();
  const { api } = useAuth();
  const methods = useForm<ResetPasswordFormValues>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    try {
      const res = await api.put('/api/auth/password', {
        email_address: email,
        otp: otp,
        new_password: data.new_password,
      });
      if (res.status === 200) {
        setError(null);
        navigate('/login', { replace: true });
      }
    } catch (error) {
      setError({
        code: ((error as AxiosError).response?.data as ErrorResponse).code,
        message: ((error as AxiosError).response?.data as ErrorResponse)
          .message,
        status: ((error as AxiosError).response?.data as ErrorResponse).status,
      });
    }
  };

  const validateLength = (value: string): boolean => {
    return value.length >= 8;
  };

  const validateNumber = (value: string): boolean => {
    return /[0-9]/.test(value);
  };

  const validateUpperCase = (value: string): boolean => {
    return /[A-Z]/.test(value);
  };

  const validateSpecialChar = (value: string) => {
    return /[@#!]/.test(value);
  };

  const validatePassword = (value: string): boolean | string => {
    if (!validateLength(value)) return 'Minimal 8 huruf';
    if (!validateNumber(value)) return 'Harus terdapat angka';
    if (!validateUpperCase(value)) return 'Harus terdapat huruf kapital';
    if (!validateSpecialChar(value)) return 'Harus terdapat karakter';
    return true;
  };

  useEffect(() => {
    methods.setFocus('new_password');
    if (!email && !otp) {
      navigate('/forgot-password', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const passwordValue = methods.watch('new_password') || '';

  return (
    <AuthLayout>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        className="mx-24 w-full md:mx-8"
      >
        <div>
          <div>
            <h1
              className="text-md-display font-bold"
              aria-label="Atur ulang password"
            >
              Atur ulang password
            </h1>
            <p
              className="text-lg-body font-regular opacity-40"
              aria-label="Langkah tiga dari tiga"
            >
              Step 3/3
            </p>
            <p
              className="text-lg-body font-regular opacity-40"
              aria-label="Lengkapi ketentuan password untuk keamanan optimal"
            >
              Lengkapi ketentuan password untuk keamanan optimal
            </p>
          </div>
          <div>
            <div className="mt-10 flex w-full flex-col">
              <Label
                className="text-xl-body"
                aria-label="password baru"
                htmlFor="new_password"
              >
                Password
              </Label>
              <span
                className={`relative mt-4 flex h-[55px] w-full items-center rounded-[5px] border text-lg-body placeholder:text-lg-body ${methods.formState.errors.new_password?.message ? 'border-danger text-danger' : 'border-black text-black'}`}
              >
                <Input
                  id="new_password"
                  name="new_password"
                  className="h-full w-full border-none px-4 py-3"
                  validation={{
                    required: 'Masukkan password yang valid',
                    validate: validatePassword,
                  }}
                  placeholder="Masukkan password anda"
                />
              </span>
              {/* {methods.formState.errors.new_password?.message && (
                <p className="mt-1 text-danger">
                  {methods.formState.errors.email?.message}
                </p>
              )} */}
            </div>
            <div className="mt-10">
              <span className="flex w-full gap-4">
                <input
                  type="checkbox"
                  readOnly
                  checked={validateLength(passwordValue)}
                  className="scale-150"
                />
                <p className="text-lg-body">Minimal 8 huruf</p>
              </span>
              <span className="flex w-full gap-4">
                <input
                  type="checkbox"
                  readOnly
                  checked={validateNumber(passwordValue)}
                  className="scale-150"
                />
                <p className="text-lg-body">Terdapat angka</p>
              </span>
              <span className="flex w-full gap-4">
                <input
                  type="checkbox"
                  readOnly
                  checked={validateUpperCase(passwordValue)}
                  className="scale-150"
                />
                <p className="text-lg-body">Terdapat huruf kapital</p>
              </span>
              <span className="flex w-full gap-4">
                <input
                  type="checkbox"
                  readOnly
                  checked={validateSpecialChar(passwordValue)}
                  className="scale-150"
                />
                <p className="text-lg-body">Terdapat karakter</p>
              </span>
            </div>
          </div>
        </div>
        {error && (
          <span className="mt-4 inline-block w-full rounded-md border border-danger bg-danger bg-opacity-20 px-4 py-3 text-danger">
            {error.message}
          </span>
        )}
        <ButtonPrimary
          disabled={
            !methods.formState.isValid
            // !methods.formState.isDirty ||
            // methods.formState.isSubmitting
          }
          className="mt-32 w-full rounded-[5px] p-3 disabled:bg-primary-light-blue"
        >
          Simpan
        </ButtonPrimary>
      </Form>
    </AuthLayout>
  );
};

export default ResetPassword;
