import React, { type FC } from 'react'
import './PFDProvider.scss'
import { Heading } from '../Heading/Heading'
import { Attitude } from '../Attitude/Attitude'
import { Altitude } from '../Altitude/Altitude'
import { Airspeed } from '../Airspeed/Airspeed'

export type T_PFDVars = {
  airspeed: number
  altitude: number
  heading: number
  pitch: number
  bank: number
  slipSkid: number
  selectedAirspeed: number
  selectedAltitude: number
  selectedHeading: number
  useEnhanced: boolean
}

type T_PFDProviderProps = {
  vars: T_PFDVars
}

export const PFDProvider: FC<T_PFDProviderProps> = (props: T_PFDProviderProps): JSX.Element => {
  return (
    <svg viewBox="0 0 800 800" className="pfd-provider-svg">
      <Heading heading={props.vars.heading} selectedHeading={props.vars.selectedHeading} />
      <Attitude pitch={props.vars.pitch} bank={props.vars.bank} />
      <Altitude
        altitude={props.vars.altitude}
        selectedAltitude={props.vars.selectedAltitude}
        drawEnhanced={props.vars.useEnhanced}
      />
      <Airspeed airspeed={props.vars.airspeed} selectedAirspeed={props.vars.selectedAirspeed} />
    </svg>
  )
}
