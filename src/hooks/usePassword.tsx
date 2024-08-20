import { PasswordContext } from '@/contexts/PasswordProvider';
import { useContext } from 'react';

const usePassword = () => {
  const context = useContext(PasswordContext);
  if (!context) {
    throw new Error('usePassword must be used within a PasswordProvider');
  }
  return { ...context };
};

export default usePassword;
