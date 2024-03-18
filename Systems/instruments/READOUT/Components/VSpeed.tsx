import React, { useEffect, useState } from 'react'
import { useSimVar } from '../../Hooks/simVars'
import '../style.scss'
import { VSpeed_2 } from './VSpeed_2'

export const VertSpeed = () => {
  var [vs_raw] = useSimVar('VERTICAL SPEED', 'feet per minute')

  let Vs_Scale: number = 1
  if (vs_raw <= 0) {
    Vs_Scale = 1
  } else {
    Vs_Scale = -1
  }

  let Vs_POS: number = 1
  vs_raw = Math.round(vs_raw * 10) / -10

  vs_raw = Math.abs(vs_raw)

  let indicator: number = 0

  if (vs_raw <= 1000) {
    indicator = 18.5
  } else if (1000 < vs_raw && vs_raw <= 2000) {
    indicator = 25
  } else if (2000 < vs_raw && vs_raw <= 3000) {
    indicator = 27.5
  } else {
    indicator = 20
  }
  if (vs_raw >= 3000) {
    Vs_POS = 109 * Vs_Scale
  } else {
    Vs_POS = (vs_raw / indicator) * Vs_Scale
  }

  return (
    <g>
      <VSpeed_2 />
      <g transform={`translate(0 ${Vs_POS})`}>
        <g transform={`translate(477 932)rotate(90,0, 0)`}>
          <polygon points="30,14 40,0 50,14" stroke="black" stroke-width="3" fill="white" />
        </g>
      </g>
    </g>
  )
}
