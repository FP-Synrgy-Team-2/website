// routing here ?
// import { useState } from 'react'

import Banner from "./components/Banner"
import SavedAccounts from "./components/SavedAccounts"

function App() {
  return (
    <div className="h-screen w-screen">  
      <Banner title="Lakukan transaksi sekarang!" subtitle="Nikmati kemudahan transaksi menggunakan internet banking" />
      <SavedAccounts />
    </div>
  )
}

export default App
