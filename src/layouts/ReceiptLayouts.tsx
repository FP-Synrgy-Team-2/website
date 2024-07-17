/* eslint-disable prettier/prettier */
import { Outlet } from 'react-router-dom';

function ReceiptLayouts() {
    return (
        <main className="h-screen w-screen relative bg-body-blue" id="receipt">
            <Outlet />
        </main>
    );
}

export default ReceiptLayouts;
