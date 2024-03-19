import React, { type FC } from 'react'

type T_AttitudeProps = {
  pitch: number
  bank: number
}

export const Attitude: FC<T_AttitudeProps> = (props: T_AttitudeProps): JSX.Element => {
  return (
    <g>
      <rect x={150} y={74} width={495} height={590} fill="white" opacity={0.4} />
    </g>
  )
}
