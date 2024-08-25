import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Outlet } from 'react-router-dom';

export type PasswordContextType = {
  email: string | null;
  setEmail: Dispatch<SetStateAction<string | null>>;
  otp: string | null;
  setOtp: Dispatch<SetStateAction<string | null>>;
};

export const PasswordContext = createContext<PasswordContextType | null>(null);

const PasswordProvider = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  return (
    <PasswordContext.Provider value={{ email, setEmail, otp, setOtp }}>
      <Outlet />
    </PasswordContext.Provider>
  );
};

export default PasswordProvider;
