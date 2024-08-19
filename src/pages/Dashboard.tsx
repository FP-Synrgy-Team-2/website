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
      className="gap-21.5 sm:gap-0"
      style={{ backgroundImage: `url('/images/icons/dashboard.svg')` }}
    >
      <div className="flex w-265 justify-between sm:w-screen sm:flex-col-reverse sm:items-center sm:gap-4">
        {accountData && <CardSaldo accountData={accountData} />}
        <Banner />
      </div>
      <div className="flex w-265 justify-between sm:w-screen sm:flex-col sm:items-center sm:gap-1">
        <TableMutasi />
        <div className="sm:item-start sm:order-first sm:flex sm:w-full sm:p-5">
          <SavedAccounts />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
