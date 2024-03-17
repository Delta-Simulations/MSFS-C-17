import React from 'react'
import './style.scss'
import { render } from '../Hooks'
import { Home } from './Components/home/home'
import { MemoryRouter, Route, Routes } from 'react-router'
import { ButtonBar } from './Components/buttonBar/buttonBar'
import { Map } from './Components/map/map'
import { Aircraft } from './Components/Aircraft/aircraft'
import { Checklist } from './Components/Checklist/checklist'
import { Traditional } from './Components/Checklist/traditional/traditional'
import { Emergency } from './Components/Checklist/emergency/emergency'
import { BrowserRouter } from 'react-router-dom'
import { Browser } from './Components/browser/browser'
import { EfbPower } from '../Common/circuit'
import { Settings } from './Components/settings/settings'
import { MANUAL } from './Components/PDF/PDF'
import { Cargo } from './Components/Cargo/Cargo'
const C17EFB = () => {
  return (
    <MemoryRouter>
      {/* <EfbPower localVar="C17_EFB_PWR"> */}
      <g>
        <div className="EFBContainer">
          <Routes>
            <Route path="/" element={<Aircraft />} />
            <Route path="/Browser" element={<Browser />} />
            <Route path="/Cargo" element={<Cargo />} />
            <Route path="/PDF" element={<MANUAL />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
          <ButtonBar />
        </div>
      </g>
      {/* </EfbPower> */}
    </MemoryRouter>
  )
}
render(<C17EFB />)
