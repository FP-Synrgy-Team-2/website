import { AuthContext } from '@/contexts/Auth';
import { BankAccount, User } from '@/types';
import { FC, ReactNode, useState } from 'react';

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);

  return (
    <AuthContext.Provider
      value={{ user, setUser, bankAccount, setBankAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};
