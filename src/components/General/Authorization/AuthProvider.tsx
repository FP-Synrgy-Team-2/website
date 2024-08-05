import React from 'react';
import { AuthContextType } from '@/contexts/AuthProvider';

export const AuthContext = React.createContext<AuthContextType | null>(null);
