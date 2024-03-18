import React, { useState, useEffect } from 'react'
import { useSimVar } from '../../Hooks/simVars'

interface CautionMessage {
  id: number
  message: string
  condition: boolean
}

export const WACAP_Left = () => {
  let [WACAP_Test] = useSimVar('L:C17_WACAP_Test', 'bool')
  let [EnteranceDoor] = useSimVar('L:C17_Crew_Enterance', 'bool')
  let [IRU_1] = useSimVar('L:C17_IRU1', 'bool')
  let [IRU_2] = useSimVar('L:C17_IRU2', 'bool')
  let [AntiIceEng1] = useSimVar('A:ENG ANTI ICE:1', 'bool')
  let [AntiIceEng2] = useSimVar('A:ENG ANTI ICE:2', 'bool')
  let [OilPressEng1] = useSimVar('A:General Eng1 oil pressure', 'PSI')
  let [OilPressEng2] = useSimVar('A:General Eng2 oil pressure', 'PSI')
  let [MAIN_PWR] = useSimVar('L:C17_Cpit_Pacs', 'BOOL')
  let [Para_L] = useSimVar('L:C17_PARA_L', 'BOOL')
  let [Pitot_L] = useSimVar('L:C17_P_PITOT', 'BOOL')
  let [Scroll_L] = useSimVar('L:C17_WACAP_VIEW_L', 'enum')
  const [cautionMessages, setCautionMessages] = useState<CautionMessage[]>([])

  useEffect(() => {
    const messages: CautionMessage[] = [
      { id: 1, message: 'IRU INOP 1', condition: !IRU_1 && IRU_2 },
      { id: 2, message: 'IRU INOP 2', condition: !IRU_2 && IRU_1 },
      { id: 3, message: 'IRU INOP 1,2', condition: WACAP_Test || (!IRU_1 && !IRU_2) },
      { id: 4, message: 'ANTI ICE 1', condition: !AntiIceEng1 && AntiIceEng2 },
      { id: 5, message: 'ANTI ICE 2', condition: !AntiIceEng2 && AntiIceEng1 },
      { id: 6, message: 'ANTI ICE 1,2', condition: WACAP_Test || (!AntiIceEng1 && !AntiIceEng2) },
      { id: 7, message: 'ENG OIL PRESS 1', condition: OilPressEng1 < 70 && OilPressEng2 > 70 },
      { id: 8, message: 'ENG OIL PRESS 2', condition: OilPressEng2 < 70 && OilPressEng1 > 70 },
      { id: 9, message: 'ENG OIL PRESS 1,2', condition: WACAP_Test || (OilPressEng1 < 70 && OilPressEng2 < 70) },
      { id: 11, message: 'AURAL WARNING INOP', condition: WACAP_Test },
      { id: 10, message: 'ENTRY DOOR', condition: WACAP_Test || EnteranceDoor },
      { id: 12, message: 'GPWS FAIL', condition: WACAP_Test || !MAIN_PWR },
      { id: 13, message: 'L TROOP DOOR', condition: WACAP_Test || Para_L },
      { id: 14, message: 'A/R MODE INOP', condition: WACAP_Test || !MAIN_PWR },
      { id: 15, message: 'RADAR ALT 1', condition: WACAP_Test || !MAIN_PWR },
      { id: 16, message: 'PROBE HEATER', condition: WACAP_Test || !Pitot_L },
      { id: 17, message: 'P/S 1A, 1B HEAD HTR', condition: WACAP_Test || !MAIN_PWR }
      // Add more caution messages here...
    ]

    setCautionMessages(messages)
  }, [
    WACAP_Test,
    Pitot_L,
    MAIN_PWR,
    MAIN_PWR,
    MAIN_PWR,
    WACAP_Test,
    EnteranceDoor,
    IRU_1,
    IRU_2,
    AntiIceEng1,
    AntiIceEng2,
    OilPressEng1,
    OilPressEng2,
    Para_L
  ])

  const maxMessages = 14
  const visibleMessages = cautionMessages.filter((message) => message.condition)
  const remainingMessages = Math.max(0, visibleMessages.length - maxMessages)
  // Calculate the maximum value for Scroll_L
  const maxScroll = Math.max(0, remainingMessages)

  // Ensure that Scroll_L does not exceed maxScroll
  const clampedScroll_L = Math.min(Scroll_L, maxScroll)

  // Calculate the displayed messages based on clampedScroll_L
  const displayedMessages = visibleMessages.slice(clampedScroll_L, clampedScroll_L + maxMessages)

  return (
    <g>
      {/* LEFT */}
      {displayedMessages.map((message, index) => (
        <text
          key={message.id}
          x={455}
          y={609 + index * 13}
          fontSize={15}
          fill="#00EE00"
          className="WAPanel"
          textAnchor="middle"
        >
          {message.message}
        </text>
      ))}
      {remainingMessages > 0 && (
        <g className="scroll-symbols" transform={`translate(-290, 60) `}>
          <text x={650} y={615} fontSize={16} fill="#00EE00">
            ↑
          </text>
          <text x={650} y={638} fontSize={16} fill="#00EE00">
            ↓
          </text>
        </g>
      )}
    </g>
  )
}
