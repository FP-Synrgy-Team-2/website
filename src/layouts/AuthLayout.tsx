import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  return (
    <div
      className="container relative mx-auto flex h-screen justify-between"
      id="login-page"
    >
      <div className="flex h-full w-1/2 items-center justify-center lg:w-3/4 md:w-full">
        {children}
      </div>
      <div aria-label="banner login" className="h-full w-1/2 lg:w-1/4 md:w-0">
        <img
          src={
            location.pathname.split('/')[1] !== 'forgot-password'
              ? 'images/login/login_image.webp'
              : '../images/login/login_image.webp'
          }
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
