import React, { type FC, useEffect, useState } from 'react'
import { SelectedAltitudeBug } from './SelectedAltitude'
import { createArray } from '../../../../../../Common/util/CreateArray'

type T_AltitudeTapeProps = {
  altitude: number
  selectedAltitude: number
  drawEnhanced: boolean
}

const spacing: number = 2
const offset: number = -0
const enhancedSpacing: number = 9

// need to adjust the offset of the non enhanced markings dynamically based off the length of the selected altitude
const SmallTick = (y: number, enhanced: boolean, selectedAltitude: number): JSX.Element => {
  let correctedY = enhanced ? y * enhancedSpacing + offset : y / spacing + offset
  let correctedOffset = (selectedAltitude === 0 ? 5001 : selectedAltitude + 225) * enhancedSpacing + offset
  let nonEnhancedY = y * spacing + correctedOffset / 1.285
  if (!enhanced) {
    return (
      <path d={`M 650, ${-nonEnhancedY} L 680 ${-nonEnhancedY}`} stroke="white" strokeWidth={3} strokeLinecap="round" />
    )
  } else {
    return (
      <path d={`M 650, ${-correctedY} L 680 ${-correctedY}`} stroke="white" strokeWidth={3} strokeLinecap="round" />
    )
  }
}
const largeTickWithNumber = (y: number, enhanced: boolean, selectedAltitude: number): JSX.Element => {
  let correctedY = enhanced ? y * enhancedSpacing + offset : y / spacing + offset
  let correctedOffset = (selectedAltitude === 0 ? 5001 : selectedAltitude + 225) * enhancedSpacing + offset
  let nonEnhancedY = y * spacing + correctedOffset / 1.285

  if (!enhanced) {
    return (
      <g>
        <path
          d={`M 650, ${-nonEnhancedY} L 690 ${-nonEnhancedY}`}
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <text x={700} letterSpacing={3} fill="red" y={-nonEnhancedY + 10} fontSize={34} textAnchor="start">
          {y * 10}
        </text>
      </g>
    )
  } else {
    return (
      <g>
        <path d={`M 650, ${-correctedY} L 690 ${-correctedY}`} stroke="white" strokeWidth={3} strokeLinecap="round" />
        <text x={700} letterSpacing={3} fill="white" y={-correctedY + 10} fontSize={34} textAnchor="start">
          {y * 10}
        </text>
      </g>
    )
  }
}

const getScopeOfEnhancedRes = (selectedAlt: number): number => {
  if (selectedAlt === 0) {
    return 5001
  } else {
    return selectedAlt + 225
  }
}

const drawTick = (shouldDrawEnhanced: boolean, selectedAltitude: number, cvalue: number): JSX.Element => {
  let value = cvalue - 50

  let topOfEnhanced: number = getScopeOfEnhancedRes(selectedAltitude)
  console.log(topOfEnhanced)

  if (shouldDrawEnhanced && value < topOfEnhanced) {
    if (value % 10 === 0) {
      return largeTickWithNumber(value, true, selectedAltitude)
    } else if (value % 2 === 0) {
      return SmallTick(value, true, selectedAltitude)
    } else return <></>
  } else if (value % 50 === 0) {
    return largeTickWithNumber(value, false, selectedAltitude)
  } else if (value % 10 === 0) {
    return SmallTick(value, false, selectedAltitude)
  }
  return <></>
}

/*
 * -1,000 to 50,000
 * max resolution is 10 feet so we can only drop 1 zero off and do a 5101 long array 💀
 *
 * default resolution is ticks every 100 feet and numbers every 500 feet so %10 and %50 since we are only dropping one zero
 * enhanced resolution is ticks every 20 feet and numbers every 100 feet so %2 and %10, this contains all altitudes < 2,250 feet above selected altitudes, above this it will be normal scaling again
 * when alt === 0 THE ENTIRE TAPE is in high resolution
 * when in RA mode, we will replace negative values with the barber pole component (we cannot fly below the ground ig)
 *
 * POA: we will have to weight how much of the tape is in the high resolution scale, there is a liner difference between the two scaling formats, so we can just multiply the weight by the linear difference
 * the difference should be 3 and this will allow us to convert between the high resolution and normal resolution tapes properly with our transformations
 * I might just be very dumb so this needs to stay here till I can figure it out
 */
export const AltitudeTape: FC<T_AltitudeTapeProps> = (props: T_AltitudeTapeProps): JSX.Element => {
  const speedArray: number[] = createArray(5101)
  const [tape, setTape] = useState<JSX.Element[]>([])
  useEffect(() => {
    const newTape = speedArray.map((value: number) => {
      return drawTick(props.drawEnhanced, props.selectedAltitude / 10, value)
    })
    setTape(newTape)
  }, [props.selectedAltitude, props.drawEnhanced])

  return (
    <g>
      <defs>
        <clipPath id="AltitudeClip">
          <rect x={640} y={140} width={160} height={425} fill="cyan" opacity={0.3} />
        </clipPath>
      </defs>
      {/* <g clipPath="url(#AltitudeClip)"> */}
      <g>
        <g transform={`translate(0,${props.altitude})`}>{tape}</g>
      </g>
    </g>
  )
}
