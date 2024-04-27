import React, { type FC } from 'react'

type T_HeadingProps = {
  heading: number
  selectedHeading: number
}

export const Heading: FC<T_HeadingProps> = (props: T_HeadingProps): JSX.Element => {
  return (
    <g>
      <rect x={200} y={690} opacity={0.5} height={100} width={400} fill="red" />
    </g>
  )
}
