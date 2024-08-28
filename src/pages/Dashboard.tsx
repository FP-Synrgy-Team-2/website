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
  }, [token, api, userId]);

  return (
    <div
      id="dashboard-main"
      className="flex h-full flex-col gap-21.5 bg-contain bg-right-bottom bg-no-repeat sm:gap-5 sm:px-0"
      style={{ backgroundImage: `url('/images/icons/dashboard.svg')` }}
    >
      <div className="me-[3%] flex max-w-[61rem] justify-between gap-[3%] md:me-[5%] sm:w-screen sm:flex-col-reverse sm:items-center sm:gap-5 sm:px-5">
        {accountData && <CardSaldo accountData={accountData} />}
        <Banner />
      </div>
      <div className="me-[3%] flex max-w-[61rem] justify-between gap-[3%] md:me-[5%] sm:w-screen sm:flex-col-reverse sm:items-center sm:gap-5 sm:px-5">
        <TableMutasi />
        <SavedAccounts />
      </div>
    </div>
  );
}

export default Dashboard;
