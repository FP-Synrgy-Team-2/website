import { useAuth } from '@/axios';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
  children: ReactNode;
}

function Protected({ children }: ProtectedProps) {
  const session = sessionStorage.getItem('session');
  const [isLoading, setIsLoading] = useState(true);
  const axios = useAuth();
  const navigate = useNavigate();

  const fetchMe = async () => {
    if (!session) navigate('/login');

    const { userId } = JSON.parse(session!);
    await axios.get(`/users/${userId}`);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMe();
    }, 1000 * 60);

    fetchMe()
      .then(() => setIsLoading(false))
      .catch((err) => console.error(err));

    return () => clearInterval(intervalId);
  }, []);

  return isLoading ? <></> : children;
}

export default Protected;
