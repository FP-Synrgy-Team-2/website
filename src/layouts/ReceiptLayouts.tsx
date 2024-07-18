import { Outlet } from 'react-router-dom';

function ReceiptLayouts() {
  return (
    <main className="relative h-screen w-screen bg-body-blue" id="receipt">
      <Outlet />
    </main>
  );
}

export default ReceiptLayouts;
