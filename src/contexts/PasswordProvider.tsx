import React from 'react';
import { Outlet } from 'react-router-dom';

export type PasswordContextType = {
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  otp: string | null;
  setOtp: React.Dispatch<React.SetStateAction<string | null>>;
};

export const PasswordContext = React.createContext<PasswordContextType | null>(
  null
);

const PasswordProvider = () => {
  const [email, setEmail] = React.useState<string | null>(null);
  const [otp, setOtp] = React.useState<string | null>(null);
  return (
    <PasswordContext.Provider value={{ email, setEmail, otp, setOtp }}>
      <Outlet />
    </PasswordContext.Provider>
  );
};

export default PasswordProvider;
