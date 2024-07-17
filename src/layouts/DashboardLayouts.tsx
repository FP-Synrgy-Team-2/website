import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import { Sidebar }  from "../components";
=======
import { Sidebar } from "../components";
>>>>>>> 766499f26c1570665bd731ba8b77f5c5e361007b

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
