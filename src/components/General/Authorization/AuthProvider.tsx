import { createContext } from 'react';
import { AuthContextType } from '@/contexts/AuthProvider';

export const AuthContext = createContext<AuthContextType | null>(null);
