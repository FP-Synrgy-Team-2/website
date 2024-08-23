import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Protected } from '@/components';
import DashboardLayouts from '@/layouts/DashboardLayouts';
import ReceiptLayouts from '@/layouts/ReceiptLayouts';

import {
  Dashboard,
  Login,
  History,
  Confirmation,
  New,
  Receipt,
  Saved,
  DownloadInvoice,
  TransferPage,
  Error404,
  ForgotPassword,
  Logout,
} from './pages';
import PasswordProvider from './contexts/PasswordProvider';
import OtpCode from './pages/authentication/OtpCode';
import ResetPassword from './pages/authentication/ResetPassword';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route
          index
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<PasswordProvider />}>
          <Route index element={<ForgotPassword />} />
          <Route path="otp" element={<OtpCode />} />
          <Route path="reset" element={<ResetPassword />} />
        </Route>

        <Route
          path="/"
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
            <Route path="receipt/:id" element={<Receipt />} />
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

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
