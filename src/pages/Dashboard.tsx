import { Banner, SavedAccounts, CardSaldo, TableMutasi } from '@/components';
import dashboardSVG from '@/assets/dashboard.svg';

function Dashboard() {
  return (
    <main
      id="dashboard-main"
      className=""
      style={{ backgroundImage: `url(${dashboardSVG})` }}
    >
      <div className="flex w-265 justify-between">
        <CardSaldo />
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
