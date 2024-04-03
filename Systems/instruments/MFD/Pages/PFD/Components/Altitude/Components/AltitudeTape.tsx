import React, { type FC, useEffect, useState } from 'react'
import { SelectedAltitudeBug } from './SelectedAltitude'
import { createArray } from '../../../../../../Common/util/CreateArray'

type T_AltitudeTapeProps = {
  altitude: number
  selectedAltitude: number
  drawEnhanced: boolean
}

const spacing: number = 2.0
const offset: number = -0
const enhancedSpacing: number = 9.9
const additionalEnhancedOffset: number = 290

// need to adjust the offset of the non enhanced markings dynamically based off the length of the selected altitude
const SmallTick = (y: number, enhanced: boolean, selectedAltitude: number): JSX.Element => {
  let correctedY = enhanced ? y * enhancedSpacing + offset : y / spacing + offset
  const topOfEnhanced = getScopeOfEnhancedRes(selectedAltitude)
  let correctedOffset =
    (selectedAltitude === 0 ? 5001 : topOfEnhanced) * enhancedSpacing + offset + additionalEnhancedOffset
  let nonEnhancedY = y * spacing + correctedOffset / 1.285
  if (!enhanced) {
    return (
      <path d={`M 648, ${-nonEnhancedY} L 663 ${-nonEnhancedY}`} stroke="white" strokeWidth={3} strokeLinecap="round" />
    )
  } else {
    return (
      <path d={`M 648, ${-correctedY} L 663 ${-correctedY}`} stroke="white" strokeWidth={3} strokeLinecap="round" />
    )
  }
}
const largeTickWithNumber = (y: number, enhanced: boolean, selectedAltitude: number): JSX.Element => {
  let correctedY = enhanced ? y * enhancedSpacing + offset : y / spacing + offset
  const topOfEnhanced = getScopeOfEnhancedRes(selectedAltitude)
  let correctedOffset =
    (selectedAltitude === 0 ? 5001 : topOfEnhanced) * enhancedSpacing + offset + additionalEnhancedOffset
  let nonEnhancedY = y * spacing + correctedOffset / 1.285

  if (!enhanced) {
    return (
      <g>
        <path
          d={`M 648, ${-nonEnhancedY} L 675 ${-nonEnhancedY}`}
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <text x={782} letterSpacing={3} fill="white" y={-nonEnhancedY + 10} fontSize={25} textAnchor="end">
          {y * 10}
        </text>
      </g>
    )
  } else {
    return (
      <g>
        <path d={`M 648, ${-correctedY} L 675 ${-correctedY}`} stroke="white" strokeWidth={3} strokeLinecap="round" />
        <text x={782} letterSpacing={3} fill="white" y={-correctedY + 10} fontSize={25} textAnchor="end">
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
    const enhancedRes = selectedAlt + 255
    const roundedRes = Math.ceil(enhancedRes / 50) * 50 // only simple solution i could come up with to fix the blending issue with odd multiples (blending a 200 the next number being a 500)
    return roundedRes
  }
}

const drawTick = (
  shouldDrawEnhanced: boolean,
  selectedAltitude: number,
  cvalue: number,
  skipNormalRange: boolean
): JSX.Element => {
  let value = cvalue - 50

  let topOfEnhanced: number = getScopeOfEnhancedRes(selectedAltitude)
  console.log(topOfEnhanced)

  if (shouldDrawEnhanced && value < topOfEnhanced) {
    if (value % 10 === 0) {
      return largeTickWithNumber(value, true, selectedAltitude)
    } else if (value % 2 === 0) {
      return SmallTick(value, true, selectedAltitude)
    } else return <></>
  } else if (!skipNormalRange) {
    if (value % 50 === 0) {
      return largeTickWithNumber(value, false, selectedAltitude)
    } else if (value % 10 === 0) {
      return SmallTick(value, false, selectedAltitude)
    }
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
      const skipNonEnhanced: boolean = getScopeOfEnhancedRes(props.selectedAltitude) === 5001

      if (skipNonEnhanced) {
        return drawTick(props.drawEnhanced, props.selectedAltitude / 10, value, true)
      } else {
        return drawTick(props.drawEnhanced, props.selectedAltitude / 10, value, false)
      }
    })
    setTape(newTape)
  }, [props.selectedAltitude, props.drawEnhanced])

  // dealing with the translation: going to set a const var that gets the top of the enhanced tape, if we are above the enhanced we will do the math for the translation in the enhanced region and get the final translation value for the top, then we can just add that to our new translation formula as an offset
  const topOfEnhanced = getScopeOfEnhancedRes(props.selectedAltitude)
  const getTranslation = (altitude: number, topOfEnhanced: number): number => {
    let clampedAltitude = Math.min(altitude, 50010) // i fw ghetto ah solutions
    let offset = 350
    let enhancedFactor = 0.99
    let normalFactor = 0.2
    // translation in the enhanced region is literally almost 1 to 1 with the altitude
    if (clampedAltitude <= topOfEnhanced * 10) {
      return clampedAltitude * enhancedFactor + offset
    } else if (clampedAltitude > topOfEnhanced * 10) {
      let translationOffset = topOfEnhanced * enhancedFactor + offset
      return clampedAltitude * normalFactor + translationOffset
    } else {
      console.error('failed to calculate altitude transformation')
      return 0 // will just replace with failed altitude tape if this is returned
    }
  }

  // damn, it works

  return (
    <g>
      <defs>
        <clipPath id="AltitudeClip">
          <rect x={640} y={140} width={160} height={425} fill="cyan" opacity={0.3} />
        </clipPath>
      </defs>
      <g clipPath="url(#AltitudeClip)">
        <g transform={`translate(0,${getTranslation(props.altitude, topOfEnhanced)})`}>{tape}</g>
      </g>
    </g>
  )
}
