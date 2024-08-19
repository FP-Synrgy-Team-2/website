import Dashboard from './Dashboard';
import Login from './authentication/Login';
import ForgotPassword from './authentication/ForgotPassword';
import Logout from './authentication/Logout';
import {
  Confirmation,
  New,
  Pin,
  Receipt,
  Saved,
  TransferPage,
  DownloadInvoice,
} from './transfer';
import { History } from './history';
import Error404 from './error/404';

export {
  // Dashboard & Login
  Dashboard,
  Login,
  Logout,
  ForgotPassword,

  // History
  History,

  // Transfer
  Confirmation,
  New,
  Pin,
  Receipt,
  Saved,
  TransferPage,
  DownloadInvoice,

  // Error
  Error404,
};
