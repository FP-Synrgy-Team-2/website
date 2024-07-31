import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayouts from '@/layouts/DashboardLayouts';
import ReceiptLayouts from '@/layouts/ReceiptLayouts';

import { SwaggerUIComponent, Protected } from '@/components';

import {
  ApiCall,
  Dashboard,
  Login,
  History,
  Confirmation,
  New,
  Pin,
  Receipt,
  Saved,
  DownloadInvoice,
  TransferPage,
  Error404,
} from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" />

        <Route
          path=""
          element={
            <Protected>
              <DashboardLayouts />
            </Protected>
          }
        >
          <Route path="" element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transfer">
            <Route index element={<TransferPage />} />
            <Route path="new" element={<New />} />
            <Route path="saved" element={<Saved />} />
            <Route path="confirm" element={<Confirmation />} />
            <Route path="pin" element={<Pin />} />
            <Route path="receipt" element={<Receipt />} />
          </Route>
          <Route path="history" element={<History />} />
        </Route>

        <Route
          path="transfer/invoice"
          element={
            <Protected>
              <ReceiptLayouts />
            </Protected>
          }
        >
          <Route path=":id" element={<DownloadInvoice />} />
        </Route>

        <Route path="/api">
          <Route path="example" element={<ApiCall />}></Route>
          <Route path="docs" element={<SwaggerUIComponent />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
