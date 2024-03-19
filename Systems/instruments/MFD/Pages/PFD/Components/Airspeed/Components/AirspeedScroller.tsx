import React, { type FC } from 'react'

type T_AirspeedScrollerProps = {
  airspeed: number
}

export const AirspeedScroller: FC<T_AirspeedScrollerProps> = (props: T_AirspeedScrollerProps): JSX.Element => {
  return (
    <g>
      <path
        d="M 0,370 L 80 370 L 80 390 L 110 390 L 110 370 L 142 347 L 110 324 L 110 304 L 80 304 L 80 324 L 0 324"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </g>
  )
}
