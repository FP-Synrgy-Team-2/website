import Banner from '../components/Banner';
import SavedAccounts from '../components/SavedAccounts';
import dashboardSVG from '../assets/dashboard.svg';

function Dashboard() {
  return (
    <main
      id="dashboard-main"
      className=""
      style={{ backgroundImage: `url(${dashboardSVG})` }}
    >
      <div className="flex w-265 justify-between">
        <div className="helper-box h-full w-96" />
        <Banner />
      </div>
      <div className="flex w-265 justify-between">
        <div className="helper-box w-182.5" />
        <SavedAccounts />
      </div>
    </main>
  );
}

export default Dashboard;
