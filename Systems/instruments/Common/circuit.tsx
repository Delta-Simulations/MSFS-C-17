import React, { FC, ReactNode } from 'react'
import { useSimVar } from '../Hooks/simVars'

interface ElectricityProps {
  circuit: string | number
  children: ReactNode
}

export const Electricity: FC<ElectricityProps> = ({ circuit, children }) => {
  const [circuitOn] = useSimVar(`A:CIRCUIT ON:${circuit}`, 'Bool')
  if (!circuitOn) return null
  else return <div>{children}</div>
}

interface EfbPowerProps {
  localVar: string
  children: ReactNode
}

export const EfbPower: FC<EfbPowerProps> = ({ localVar, children }) => {
  const [isOn] = useSimVar(`L:${localVar}`, 'bool')

  if (isOn) return null
  else return <div>{children}</div>
}

interface HUDPowerProps {
  localVar: string
  children: ReactNode
}
export const HUDPower: FC<HUDPowerProps> = ({ localVar, children }) => {
  const [isOn] = useSimVar(`L:${localVar}`, 'bool')
  const [isMode] = useSimVar(`L:C17_HUD_CNTRL`, 'enum')

  if (isOn || isMode === 0) return null
  else return <div>{children}</div>
}

interface AuralPowerProps {
  children: ReactNode
}

export const AuralPower: FC<AuralPowerProps> = ({ children }) => {
  const [isMode] = useSimVar(`L:C17_WAP_Debug`, 'enum')

  if (isMode === 1) return null
  else return <div>{children}</div>
}
