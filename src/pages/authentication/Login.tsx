import { ButtonPrimary, Form, Input, Label, NavbarLogo } from '@/components';
import useAuth from '@/hooks/useAuth';
import AuthLayout from '@/layouts/AuthLayout';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

interface LoginFormValues {
  username: string;
  password: string;
}

const EyeSvgShow = () => {
  return (
    <img
      src="/images/icons/eye_show.svg"
      className="img-black"
      alt="Tampilkan password"
    />
  );
};

const EyeSvgHidden = () => {
  return (
    <img
      src="/images/icons/eye_hide.svg"
      className="img-black"
      alt="Sembunyikan password"
    />
  );
};

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { isAuthenticated, login } = useAuth();
  const methods = useForm<LoginFormValues>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    login(data, '/dashboard', '/login');
  };

  const validateUsername = (value: string) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    if (!hasUpperCase || !hasNumber) {
      return 'Masukkan username yang valid';
    }
    return true;
  };

  const validatePassword = (value: string) => {
    const noWhitespace = /\s/.test(value);
    const hasSpecialChars = /[@#!]/.test(value);
    const validSpecialChars = /[^A-Za-z0-9@#!]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);

    if (
      noWhitespace ||
      validSpecialChars ||
      !hasUpperCase ||
      !hasSpecialChars
    ) {
      return 'Masukkan password yang valid';
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <AuthLayout>
          <NavbarLogo className="absolute left-[68px] top-[25px] flex flex-col items-end" />
          <Form
            methods={methods}
            onSubmit={onSubmit}
            className="mx-24 w-full md:mx-8"
          >
            <h1
              className="text-[36px] font-bold"
              aria-label="Masuk ke akun anda"
            >
              Masuk ke akun anda
            </h1>
            <p className="my-4 text-lg-body text-black text-opacity-40">
              Nikmati kemudahan mengelola keuangan Anda kapan saja
            </p>
            <div className="mt-10 flex w-full flex-col">
              <Label
                className="text-xl-body"
                aria-label="username"
                htmlFor="username"
              >
                Username
              </Label>
              <span
                className={`relative mt-4 flex h-[55px] w-full items-center rounded-[5px] border text-lg-body placeholder:text-lg-body ${methods.formState.errors.username?.message ? 'border-danger text-danger' : 'border-black text-black'}`}
              >
                <img
                  className="absolute mx-4"
                  src="/images/icons/user.svg"
                  alt=""
                />
                <Input
                  name="username"
                  className="h-full w-full border-none pl-14"
                  validation={{
                    required: 'Masukkan username yang valid',
                    validate: validateUsername,
                  }}
                  placeholder="Masukkan username anda"
                />
                {/* <p>
                  {methods.formState.errors.username?.message &&
                    'masukkan username yang valid'}
                </p> */}
              </span>
              {methods.formState.errors.username?.message && (
                <p className="mt-1 text-danger">
                  {methods.formState.errors.username?.message}
                </p>
              )}
            </div>
            <div className="mt-4 flex w-full flex-col">
              <Label
                className="text-xl-body"
                aria-label="password"
                htmlFor="password"
              >
                Password
              </Label>
              <span
                className={`relative mt-4 flex h-[55px] w-full items-center rounded-[5px] border text-lg-body placeholder:text-lg-body ${methods.formState.errors.password?.message ? 'border-danger text-danger' : 'border-black text-black'}`}
              >
                <img
                  src="/images/icons/lock.svg"
                  className="absolute mx-4"
                  alt=""
                />
                <Input
                  name="password"
                  type={!showPassword ? 'password' : 'text'}
                  className="h-full w-full border-none pl-14"
                  validation={{
                    minLength: {
                      value: 8,
                      message: 'Masukkan password yang valid',
                    },
                    required: 'Masukkan password yang valid',
                    validate: validatePassword,
                  }}
                  placeholder="Masukkan password anda"
                />
                <button
                  type="button"
                  className="absolute right-0 mx-4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSvgHidden /> : <EyeSvgShow />}
                </button>
              </span>
              {methods.formState.errors.password?.message && (
                <p className="mt-1 text-danger">
                  {methods.formState.errors.password?.message}
                </p>
              )}
            </div>
            <Link
              to={'/forgot-password'}
              className="my-4 inline-block text-xl-body text-primary-dark-blue underline underline-offset-8"
            >
              Lupa Password?
            </Link>
            <ButtonPrimary
              type="submit"
              className="my-4 w-full p-3 text-xl-body font-bold text-white"
            >
              Masuk
            </ButtonPrimary>
          </Form>
        </AuthLayout>
      ) : (
        <Navigate to="/dashboard" />
      )}
    </>
  );
};

export default Login;
