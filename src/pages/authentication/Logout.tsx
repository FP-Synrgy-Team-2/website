import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    logout();
    navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default Logout;
