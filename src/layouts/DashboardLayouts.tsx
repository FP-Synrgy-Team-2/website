import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components';

function DashboardLayouts() {
  return (
    <div className="flex w-screen">
      <aside className="h-screen max-w-[200px] grow pt-5 md:max-w-[0px] md:px-0">
        <Sidebar />
      </aside>
      <main className="relative ms-[3%] min-h-[100dvh] grow bg-body-white pt-8 text-md-body md:ms-[5%] sm:ms-[0px]">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayouts;
