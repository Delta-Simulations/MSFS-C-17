import React, { type FC } from 'react'

type T_SelectedAltitudeBugProps = {
  x: number
  y: number
  single?: boolean
}

export const SelectedAltitudeBug: FC<T_SelectedAltitudeBugProps> = (props: T_SelectedAltitudeBugProps): JSX.Element => {
  return (
    <g transform={`translate(${props.x},${props.y}) rotate(180, 15, 15)`}>
      <path
        d={`M 20, 0 L 2 15 L 20 30 ${!props.single && 'M 30,0 L 12 15 L 30 30'}`}
        stroke="cyan"
        fill="transparent"
        strokeLinecap="round"
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </g>
  )
}
