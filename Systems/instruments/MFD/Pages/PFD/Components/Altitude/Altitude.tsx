import React, { type FC } from 'react'

type T_AltitudeProps = {
  altitude: number
  selectedAltitude: number
}

export const Altitude: FC<T_AltitudeProps> = (props: T_AltitudeProps): JSX.Element => {
  return (
    <g>
      <rect x={600} y={100} width={200} height={560} fill="yellow" opacity={0.4} />
    </g>
  )
}
