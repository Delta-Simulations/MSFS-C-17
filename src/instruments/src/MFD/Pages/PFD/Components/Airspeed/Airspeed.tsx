import React, { type FC } from 'react'
import { AirspeedScroller } from './Components/AirspeedScroller'
import { AirspeedTape } from './Components/AirspeedTape'

type T_AirspeedProps = {
  airspeed: number
  selectedAirspeed: number
}

export const Airspeed: FC<T_AirspeedProps> = (props: T_AirspeedProps): JSX.Element => {
  return (
    <g>
      <AirspeedTape airspeed={props.airspeed} selectedAirspeed={props.selectedAirspeed} />
      <AirspeedScroller airspeed={props.airspeed} />
    </g>
  )
}
