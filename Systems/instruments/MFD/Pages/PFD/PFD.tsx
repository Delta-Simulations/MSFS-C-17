import React from 'react'
import { PFDProvider } from './Components/PFDProvider.tsx/PFDProvider'
import { type T_PFDVars } from './Components/PFDProvider.tsx/PFDProvider'
import { useSimVar } from '../../../Hooks/simVars'

export const PFD = () => {
  const [airspeed] = useSimVar('AIRSPEED INDICATED', 'knots')
  const [selectedAirspeed] = useSimVar('L:C17_SELECTED_AIRSPEED', 'knots')

  const fillerData: T_PFDVars = {
    airspeed: airspeed,
    altitude: 0,
    heading: 0,
    pitch: 0,
    bank: 0,
    slipSkid: 0,
    selectedAirspeed: selectedAirspeed,
    selectedAltitude: 0,
    selectedHeading: 0
  }

  return <PFDProvider vars={fillerData} />
}
