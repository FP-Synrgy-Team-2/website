import { NavbarLogo } from '@/components';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="container relative mx-auto flex h-screen justify-between"
      id="login-page"
    >
      <NavbarLogo className="absolute left-[68px] top-[25px] flex flex-col items-end" />
      <div className="flex h-full w-1/2 items-center justify-center lg:w-3/4 md:w-full">
        {children}
      </div>
      <div aria-label="banner login" className="h-full w-1/2 lg:w-1/4 md:w-0">
        <img
          src="images/login/login_image.webp"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
