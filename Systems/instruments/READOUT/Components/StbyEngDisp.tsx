import React, { useEffect } from 'react'
import { useSimVar } from '../../Hooks/simVars'

export const StbyEngDisp = () => {
  let [AFCS_Color] = useSimVar('L:C17_CPIT_ILLUM_MODE', 'bool')
  let [DispMode] = useSimVar('L:C17_SED_MODE', 'enum')
  let [ModeSelect] = useSimVar('L:C17_THR_MODE', 'enum')
  let [RatingTHR] = useSimVar('L:C17_ENG_SET_EPR', 'number')
  RatingTHR = Math.floor(RatingTHR * 10) / 10

  let [EPREng1] = useSimVar('A:Turb Eng1 N1', 'percent')
  let [N2Eng1] = useSimVar('A:Turb Eng1 corrected N2', 'percent')
  let [EGTEng1] = useSimVar('A:General Eng1 exhaust gas temperature', 'celsius')
  let [N1Eng1] = useSimVar('A:Turb Eng1 corrected N1', 'percent')
  let [EPREng2] = useSimVar('A:Turb Eng2 N1', 'percent')
  let [N2Eng2] = useSimVar('A:Turb Eng2 corrected N2', 'percent')
  let [EGTEng2] = useSimVar('A:General Eng2 exhaust gas temperature', 'celsius')
  let [N1Eng2] = useSimVar('A:Turb Eng2 corrected N1', 'percent')
  let [EPREng3] = useSimVar('A:Turb Eng3 N1', 'percent')
  let [N2Eng3] = useSimVar('A:Turb Eng3 corrected N2', 'percent')
  let [EGTEng3] = useSimVar('A:General Eng3 exhaust gas temperature', 'celsius')
  let [N1Eng3] = useSimVar('A:Turb Eng3 corrected N1', 'percent')
  let [EPREng4] = useSimVar('A:Turb Eng4 N1', 'percent')
  let [N2Eng4] = useSimVar('A:Turb Eng4 corrected N2', 'percent')
  let [EGTEng4] = useSimVar('A:General Eng4 exhaust gas temperature', 'celsius')
  let [N1Eng4] = useSimVar('A:Turb Eng4 corrected N1', 'percent')
  let [FlapsIndex] = useSimVar('A:TRAILING EDGE FLAPS RIGHT PERCENT', 'percent')
  FlapsIndex = Math.floor(FlapsIndex)
  EPREng1 = Math.floor(EPREng1)
  N2Eng1 = Math.floor(N2Eng1)
  EGTEng1 = Math.floor(EGTEng1)
  N1Eng1 = Math.floor(N1Eng1)
  EPREng2 = Math.floor(EPREng2)
  N2Eng2 = Math.floor(N2Eng2)
  EGTEng2 = Math.floor(EGTEng2)
  N1Eng2 = Math.floor(N1Eng2)
  EPREng3 = Math.floor(EPREng3)
  N2Eng3 = Math.floor(N2Eng3)
  EGTEng3 = Math.floor(EGTEng3)
  N1Eng3 = Math.floor(N1Eng3)
  EPREng4 = Math.floor(EPREng4)
  N2Eng4 = Math.floor(N2Eng4)
  EGTEng4 = Math.floor(EGTEng4)
  N1Eng4 = Math.floor(N1Eng4)

  const [HUD_OVERLAY] = useSimVar('L:C17_HUDDEBUG', 'bool')

  let ThrustMode: string
  switch (ModeSelect) {
    case 0:
      ThrustMode = 'MAN'
      break
    case 1:
      ThrustMode = 'DRT'
      break
    case 2:
      ThrustMode = 'MCT'
      break
    case 3:
      ThrustMode = 'INT'
      break
    case 4:
      ThrustMode = 'MAX'
      break
    default:
      ThrustMode = '---'
      break
  }

  let ColorMode: string
  if (AFCS_Color === 0) {
    ColorMode = '#00EE00'
  } else {
    ColorMode = '#F6F6F6'
  }

  return (
    <g>
      <rect
        x={645}
        y={805}
        width={367}
        height={211}
        visibility={AFCS_Color === 0 ? 'visible' : 'hidden'}
        className="OHDispBackrnd"
        fill="none"
        stroke-width="2.5"
      />

      <rect
        x={545}
        y={872}
        width={95}
        height={55}
        visibility={AFCS_Color === 0 ? 'visible' : 'hidden'}
        className="OHDispBackrnd"
        fill="none"
        stroke-width="2.5"
      />

      <text x={627} y={915} fontSize={50} fill={ColorMode} className="FrontPNL" textAnchor="end">
        {FlapsIndex}
      </text>

      <text x={729} y={848} fontSize={19} fill={ColorMode} className="EngCNTRL" textAnchor="end">
        RTG
      </text>
      <text x={882} y={848} fontSize={19} fill={ColorMode} className="EngCNTRL" textAnchor="end">
        MODE
      </text>
      <text x={964} y={848} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
        {ThrustMode}
      </text>
      <text x={814} y={848} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
        {RatingTHR}0
      </text>
      <line x1="689" y1="852" x2="969" y2="852" stroke={ColorMode} stroke-width="1.7" />
      <line x1="829" y1="821" x2="829" y2="852" stroke={ColorMode} stroke-width="1.1" />

      <g visibility={DispMode ? 'visible' : 'hidden'}>
        <text x={825} y={873} fontSize={19} fill={ColorMode} className="EngCNTRL" textAnchor="middle">
          N2
        </text>
        <text x={724} y={896} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
          {DispMode === 1 ? N2Eng1 : EPREng1}
        </text>
        <text x={724} y={945} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
          {EGTEng1}
        </text>
        <text x={724} y={993} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
          {N1Eng1}
        </text>
        <text x={796} y={896} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
          {DispMode === 1 ? N2Eng2 : EPREng2}
        </text>
        <text x={796} y={945} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
          {EGTEng2}
        </text>
        <text x={796} y={993} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
          {N1Eng2}
        </text>
        <text x={916} y={896} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
          {DispMode === 1 ? N2Eng3 : EPREng3}
        </text>
        <text x={916} y={945} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
          {EGTEng3}
        </text>
        <text x={916} y={993} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
          {N1Eng3}
        </text>
        <text x={988} y={896} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
          {DispMode === 1 ? N2Eng4 : EPREng4}
        </text>
        <text x={988} y={945} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
          {EGTEng4}
        </text>
        <text x={988} y={993} fontSize={40} fill={ColorMode} className="FrontPNL" textAnchor="end">
          {N1Eng4}
        </text>

        <text x={825} y={896} fontSize={19} fill={ColorMode} className="EngCNTRL" textAnchor="middle">
          EPR
        </text>
        <text x={825} y={944} fontSize={19} fill={ColorMode} className="EngCNTRL" textAnchor="middle">
          EGT
        </text>
        <text x={825} y={994} fontSize={19} fill={ColorMode} className="EngCNTRL" textAnchor="middle">
          N1
        </text>
      </g>
    </g>
  )
}
