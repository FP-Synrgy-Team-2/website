import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function DashboardLayouts() {
    return (
        <>
            <aside className="basis-1/6 container">
                <Sidebar />
            </aside>
            <div className="basis-5/6 container">
                <Outlet />
            </div>
        </>
    )
}

export default DashboardLayouts;