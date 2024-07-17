/* eslint-disable prettier/prettier */
import { Outlet } from 'react-router-dom';

function ReceiptLayouts() {
    return (
        <main className="h-screen w-screen bg-body-blue">
            <Outlet />
        </main>
    );
}

export default ReceiptLayouts;
