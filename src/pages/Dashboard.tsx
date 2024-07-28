import axios from 'axios';
import { Banner, SavedAccounts, CardSaldo, TableMutasi } from '@/components';
import dashboardSVG from '@/assets/dashboard.svg';
import { useEffect, useState } from 'react';

const URL = import.meta.env.VITE_API_URL;

type AccountData = {
  account_number: string;
  balance: number;
};

function Dashboard() {
  const [accountData, setAccountData] = useState<AccountData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = '312b09e3-3d69-483c-8db1-8da61a9b6f07';
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${URL}/bank-accounts/user/${user_id}`,
          config
        );
        setAccountData(response.data.data);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main
      id="dashboard-main"
      className=""
      style={{ backgroundImage: `url(${dashboardSVG})` }}
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
