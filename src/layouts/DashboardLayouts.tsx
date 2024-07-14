import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function DashboardLayouts() {
    return (
        <div className="flex">
            <aside className="basis-1/6 container flex flex-col h-screen px-3 pt-5 pb-16">
                <Sidebar />
            </aside>
            <main className="basis-5/6 container bg-body-white min-h-screen ps-8 pt-5">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayouts;