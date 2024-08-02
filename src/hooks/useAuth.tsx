import React from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  const {
    login,
    logout,
    setLoading,
    authResErrors,
    setAuthResErrors,
    isAuthenticated,
    user_id,
    token,
    refreshToken,
  } = context;
  return {
    login,
    logout,
    setLoading,
    authResErrors,
    setAuthResErrors,
    isAuthenticated,
    user_id,
    token,
    refreshToken,
  };
};

export default useAuth;
