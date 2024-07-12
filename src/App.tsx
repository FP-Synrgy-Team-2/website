import { Route, Routes } from "react-router-dom"
import DashboardLayouts from "./layouts/DashboardLayouts"
import {
  Dashboard, Login,
  Confirmation,
  New,
  Pin,
  Receipt,
  Saved,
  TransferPage,
} from "./pages"

function App() {
  return (
    <>
      <Routes>
        <Route index element={<DashboardLayouts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" />

        <Route path="" element={<DashboardLayouts />}>
          <Route path="dashboard" element={< Dashboard />} />

          <Route path="transfer">
            <Route index element={<TransferPage />} />
            <Route path="new" element={<New />} />
            <Route path="saved" element={<Saved />} />
            <Route path="confirm" element={<Confirmation />} />
            <Route path="pin" element={<Pin />} />
            <Route path="receipt" element={<Receipt />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
