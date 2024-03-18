import React from 'react'
import { useSimVar } from '../../Hooks/simVars'

export const Clock = () => {
  const [AP_ALT] = useSimVar('A:Autopilot altitude lock var', 'feet')
  const [AP_SPD] = useSimVar('A:Autopilot airspeed hold var', 'knots')
  var [AP_HDG] = useSimVar('A:Autopilot heading lock dir', 'degrees')
  AP_HDG = Math.floor(AP_HDG)
  const [AP_VS] = useSimVar('A:Autopilot vertical hold var', 'ft/min')

  const [AP_HVR] = useSimVar('L:AP_STAB', 'bool')

  return (
    <g>
      <text x={50} y={385} fontSize={35} fill="#00EE00" className="readouts" textAnchor="start">
        GO
      </text>

      <text x={882} y={773} fontSize={30} fill="#00EE00" className="ESIS">
        60
      </text>
      <text x={962} y={793} fontSize={30} fill="#00EE00" className="ESIS">
        5
      </text>
      <text x={1018} y={846} fontSize={30} fill="#00EE00" className="ESIS">
        10
      </text>
      <text x={1046} y={936} fontSize={30} fill="#00EE00" className="ESIS">
        15
      </text>
      <text x={1026} y={1016} fontSize={30} fill="#00EE00" className="ESIS">
        20
      </text>
      <text x={970} y={1078} fontSize={30} fill="#00EE00" className="ESIS">
        25
      </text>
      <text x={882} y={1103} fontSize={30} fill="#00EE00" className="ESIS">
        30
      </text>
      <text x={788} y={1072} fontSize={30} fill="#00EE00" className="ESIS">
        35
      </text>
      <text x={748} y={1010} fontSize={30} fill="#00EE00" className="ESIS">
        40
      </text>
    </g>
  )
}
