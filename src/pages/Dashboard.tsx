import { Banner, SavedAccounts, CardSaldo, TableMutasi } from '@/components';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';

type AccountData = {
  account_number: string;
  balance: number;
};

function Dashboard() {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const { token, userId, api } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/bank-accounts/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccountData(response.data.data);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <main
      id="dashboard-main"
      className=""
      style={{ backgroundImage: `url('/images/icons/dashboard.svg')` }}
    >
      <div className="flex w-265 justify-between">
        {accountData && <CardSaldo accountData={accountData} />}
        <Banner />
      </div>
      <div className="flex w-265 justify-between">
        <TableMutasi />
        <SavedAccounts />
      </div>
    </main>
  );
}

export default Dashboard;
