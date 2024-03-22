import React from 'react'
import { PFDProvider } from './Components/PFDProvider.tsx/PFDProvider'
import { type T_PFDVars } from './Components/PFDProvider.tsx/PFDProvider'
import { useSimVar } from '../../../Hooks/simVars'

export const PFD = () => {
  const [airspeed] = useSimVar('AIRSPEED INDICATED', 'knots')
  const [selectedAirspeed] = useSimVar('L:C17_SELECTED_AIRSPEED', 'knots')
  const [altitude] = useSimVar('INDICATED ALTITUDE', 'feet')
  const [selectedAltitude] = useSimVar('L:C17_SELECTED_ALTITUDE', 'feet')

  const fillerData: T_PFDVars = {
    airspeed: airspeed,
    altitude: altitude,
    heading: 0,
    pitch: 0,
    bank: 0,
    slipSkid: 0,
    selectedAirspeed: selectedAirspeed,
    selectedAltitude: selectedAltitude,
    selectedHeading: 0,
    useEnhanced: true
  }

  return <PFDProvider vars={fillerData} />
}
