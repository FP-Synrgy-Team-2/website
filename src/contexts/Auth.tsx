import { createContext, Dispatch, SetStateAction } from 'react';
import { BankAccount, User } from '@/types';

type AuthContext = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  bankAccount: BankAccount | null;
  setBankAccount: Dispatch<SetStateAction<BankAccount | null>>;
};

export const AuthContext = createContext<AuthContext | null>(null);
