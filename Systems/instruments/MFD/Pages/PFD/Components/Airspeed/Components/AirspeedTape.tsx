import React, { type FC, useEffect, useState } from 'react'
import { SelectedAirspeedBug } from './SelectedAirspeedBug'
import { createArray } from '../../../../../../Common/util/CreateArray'

type T_AirspeedTapeProps = {
  airspeed: number
  selectedAirspeed: number
}

// 40 - 450 knots range
const spacing: number = 5 // spacing of tape, will fuck offset so they must be changed in unison
const offset: number = 348 // starting y offset of tape

const SmallTick = (y: number): JSX.Element => {
  let correctedYValue: number = y * spacing + offset
  if (y > 200) correctedYValue = (y / 2.5 + 120) * spacing + offset
  return (
    <path
      d={`M 125, ${correctedYValue} L 140 ${correctedYValue}`}
      stroke="white"
      strokeWidth={3}
      strokeLinecap="round"
    />
  )
}

const zeroTickMarker = () => {
  const correctedYValue: number = 20 * spacing + offset
  return (
    <g>
      <path
        d={`M 112, ${correctedYValue} L 140 ${correctedYValue}`}
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <text x={100} letterSpacing={3} fill="white" y={correctedYValue + 10} fontSize={34} textAnchor="end">
        0
      </text>
    </g>
  )
}

const largeTickWithNumber = (y: number): JSX.Element => {
  let correctedYValue: number = y * spacing + offset
  if (y > 200) correctedYValue = (y / 2.5 + 120) * spacing + offset

  return (
    <g>
      <path
        d={`M 112, ${correctedYValue} L 140 ${correctedYValue}`}
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <text x={100} letterSpacing={3} fill="white" y={correctedYValue + 10} fontSize={34} textAnchor="end">
        {y}
      </text>
    </g>
  )
}

const drawTick = (value: number): JSX.Element => {
  if (value < 40 || (value % 10 !== 0 && value % 20 !== 0)) {
    return <></>
  }

  if (value >= 200 && value % 50 === 0) {
    return largeTickWithNumber(value)
  } else if (value < 200 && value % 20 === 0) {
    // Large tick
    return largeTickWithNumber(value)
  } else if (value % 10 === 0) {
    // Small tick
    return SmallTick(value)
  }

  return <></>
}

export const AirspeedTape: FC<T_AirspeedTapeProps> = (props: T_AirspeedTapeProps): JSX.Element => {
  const speedArray: number[] = createArray(451)
  const zeroMarker = zeroTickMarker()
  const tape = speedArray.map((value: number) => {
    return drawTick(value)
  })

  const [translatedAirspeedValue, setTranslatedAirspeedValue] = useState<number>(0)
  const [selectedAirspeedY, setSelectedAirspeedY] = useState<number>(0)
  const [shouldTranslateBug, setShouldTranslateBug] = useState<boolean>(false)
  const [translateAbove200, setTranslateAbove200] = useState<boolean>(false)

  useEffect(() => {
    if (props.airspeed >= 200) {
      setTranslatedAirspeedValue(props.airspeed / 2.5 + 120)
      setTranslateAbove200(true)
    } else if (props.airspeed >= 30) {
      setTranslatedAirspeedValue(props.airspeed)
      setTranslateAbove200(false)
    } else {
      setTranslatedAirspeedValue(20)
      setTranslateAbove200(false)
    }
  }, [props.airspeed, translatedAirspeedValue])

  useEffect(() => {
    let selectedAirspeed = props.selectedAirspeed
    let above200Adjustment = 0
    let above200BelowAirspeedAdjustment = 0
    if (props.selectedAirspeed > 200) {
      above200BelowAirspeedAdjustment = (selectedAirspeed - 200) / 1.6
      above200Adjustment = (selectedAirspeed - 200) / 1.7
    }
    const difference = translatedAirspeedValue - props.selectedAirspeed

    if (difference >= 42 - above200BelowAirspeedAdjustment) {
      setSelectedAirspeedY(offset - 45 * 5)
      setShouldTranslateBug(false)
    } else if (difference <= -43 - above200Adjustment) {
      setSelectedAirspeedY(offset + 40 * 5)
      setShouldTranslateBug(false)
    } else {
      if (props.selectedAirspeed > 200) {
        setSelectedAirspeedY((props.selectedAirspeed / 2.5 + 120) * 5 + 333)
        setShouldTranslateBug(true)
      } else {
        setSelectedAirspeedY(props.selectedAirspeed * 5 + 333)
        setShouldTranslateBug(true)
      }
    }
  }, [props.selectedAirspeed, props.airspeed, selectedAirspeedY])
  // this shit was a massive pain in the ass to make ngl
  return (
    <g>
      <defs>
        <clipPath id="AirspeedClip">
          <rect x={20} y={140} width={160} height={425} fill="white" opacity={0.3} />
        </clipPath>
      </defs>

      <g clipPath="url(#AirspeedClip)">
        <g transform={`translate(0, ${-translatedAirspeedValue * 5})`}>
          {props.airspeed >= 30 && zeroMarker}
          {tape}
        </g>
      </g>
      {shouldTranslateBug ? (
        <g transform={`translate(0, ${-translatedAirspeedValue * 5})`}>
          <SelectedAirspeedBug single x={135} y={selectedAirspeedY} />
        </g>
      ) : (
        <SelectedAirspeedBug x={135} y={selectedAirspeedY} />
      )}
    </g>
  )
}
