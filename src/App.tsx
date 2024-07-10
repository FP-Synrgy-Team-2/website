// routing here ?

import SavedAccountCard from "./components/SavedAccountCard"
import transferSVG from './assets/arrow-up-down.svg'
import ServiceCard from "./components/ServiceCard"

// import { useState } from 'react'

function App() {
  return (
    <>  
      <SavedAccountCard name='Max' image=""/>
      <ServiceCard serviceName="Transfer" image={transferSVG} />
    </>
  )
}

export default App
