import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

export type AuthContext = {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  accountNumber: string;
  setAccountNumber: Dispatch<SetStateAction<string>>;
};

export const authContext = createContext<AuthContext | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <authContext.Provider
      value={{ accountNumber, setAccountNumber, userId, setUserId }}
    >
      {children}
    </authContext.Provider>
  );
};
