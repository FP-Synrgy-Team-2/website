import { axios } from '@/axios';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { snakeToCamelCase } from '@/utils/formatter';
import { BankAccount, Session, User } from '@/types';
import { useAuthContext } from '@/hooks';

interface ProtectedProps {
  children: ReactNode;
}

function Protected({ children }: ProtectedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const session = sessionStorage.getItem('session');
  const { setUser, setBankAccount } = useAuthContext();

  useEffect(() => {
    const fetchMe = async () => {
      if (!session) return navigate('/login');

      const { userId } = JSON.parse(session) as Session;
      const resUser = await axios.get(`/users/${userId}`);
      setUser(snakeToCamelCase<User>(resUser.data.data));
      const resBankAccount = await axios.get(`/bank-accounts/user/${userId}`);
      setBankAccount(snakeToCamelCase<BankAccount>(resBankAccount.data.data));
    };

    const intervalId = setInterval(() => {
      fetchMe();
    }, 1000 * 9999);

    fetchMe()
      .then(() => setIsLoading(false))
      .catch((err) => console.error(err));

    return () => clearInterval(intervalId);
  }, [navigate, session, setBankAccount, setUser]);

  return isLoading ? <></> : children;
}

export default Protected;
