import React, { type FC } from 'react'

type T_AltitudeScrollerProps = {
  altitude: number
}

export const AltitudeScroller: FC<T_AltitudeScrollerProps> = (props: T_AltitudeScrollerProps): JSX.Element => {
  return (
    <g>
      <path
        d="M 800 304 L 740 304 L 740 324 L 670 324 L 646 348 L 670 372 L 740 372 L 740 392 L 800 392"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </g>
  )
}
