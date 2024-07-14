import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";

function DashboardLayouts() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) setIsLoggedIn(true);
        else setIsLoggedIn(false);
    })

    function handleLogout() {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <>
            <aside className="basis-1/6 container">
                <Sidebar />
            </aside>
            <div className="basis-5/6 container">
                <Outlet />
            </div>
            <button onClick={handleLogout}>
                Logout
            </button>
        </>
    )
}

export default DashboardLayouts;