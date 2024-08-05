import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components';

function DashboardLayouts() {
  return (
    <div className="flex w-screen">
      <aside className="container h-screen basis-1/6 px-3 pt-5">
        <Sidebar />
      </aside>
      <main className="container min-h-screen basis-5/6 bg-body-white ps-12 pt-8 text-md-body">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayouts;
