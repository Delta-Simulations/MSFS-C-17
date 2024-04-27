import React, { type FC } from 'react'
import { Horizon } from './Components/Horizon'

type T_AttitudeProps = {
  pitch: number
  bank: number
}

export const Attitude: FC<T_AttitudeProps> = (props: T_AttitudeProps): JSX.Element => {
  return (
    <g>
      <defs>
        <clipPath id="AttitudeClip">
          <path
            d="M 203 213 L 203 480 C 300 620, 500 620 600 480 L 600 213 C 500 75 ,300 75, 203 213"
            stroke="red"
            fill="none"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#AttitudeClip)">
        <Horizon />
      </g>
    </g>
  )
}
