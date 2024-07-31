import { AuthContext } from '@/contexts/Auth';
import { useContext } from 'react';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuthContext must be used within AuthProvider');

  return context;
};
