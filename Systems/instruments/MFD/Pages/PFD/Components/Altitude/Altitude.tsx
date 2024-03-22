import React, { type FC } from 'react'
import { AltitudeTape } from './Components/AltitudeTape'

type T_AltitudeProps = {
  altitude: number
  selectedAltitude: number
  drawEnhanced: boolean
}

export const Altitude: FC<T_AltitudeProps> = (props: T_AltitudeProps): JSX.Element => {
  return (
    <g>
      <AltitudeTape
        altitude={props.altitude}
        selectedAltitude={props.selectedAltitude}
        drawEnhanced={props.drawEnhanced}
      />
    </g>
  )
}
