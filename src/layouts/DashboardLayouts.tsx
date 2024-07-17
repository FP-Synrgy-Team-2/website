import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components';

function DashboardLayouts() {
    return (
        <div className="flex">
            <aside className="container flex h-screen basis-1/6 flex-col px-3 pb-16 pt-5">
                <Sidebar />
            </aside>
            <main className="container min-h-screen basis-5/6 bg-body-white ps-8 pt-5">
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayouts;
