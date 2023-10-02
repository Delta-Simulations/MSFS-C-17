import React, { useState, useEffect } from 'react';
import { useSimVar } from '../../Hooks/simVars';

interface CautionMessage {
  id: number;
  message: string;
  condition: boolean;
}

export const WACAP_Right = (props) => {
  let [WACAP_Test] = useSimVar('L:C17_WACAP_Test', 'bool');
  let [IRU_3] = useSimVar('L:C17_IRU3', 'bool');
  let [IRU_4] = useSimVar('L:C17_IRU4', 'bool');
  let [APU_ON] = useSimVar('A:APU PCT RPM', 'percent');
  let [AntiIceEng3] = useSimVar('A:ENG ANTI ICE:3', 'bool');
  let [AntiIceEng4] = useSimVar('A:ENG ANTI ICE:4', 'bool');
  let [OilPressEng3] = useSimVar('A:General Eng3 oil pressure', 'PSI');
  let [OilPressEng4] = useSimVar('A:General Eng4 oil pressure', 'PSI');  
  let [Para_R] = useSimVar('L:C17_PARA_R', 'BOOL');
  let [MAIN_PWR] = useSimVar('L:C17_Cpit_Pacs', 'BOOL');
  let [Pitot_R] = useSimVar('L:C17_CP_PITOT', 'BOOL');
  let [Emer_Pwr] = useSimVar('L:C17_Emer_Batt', 'BOOL');
  let [Scroll_R] = useSimVar('L:C17_WACAP_VIEW_R', 'enum');
  const [cautionMessages, setCautionMessages] = useState<CautionMessage[]>([]);

  useEffect(() => {
    const messages: CautionMessage[] = [
      { id: 1, message: 'IRU INOP 3', condition:!IRU_3&&IRU_4 },
      { id: 2, message: 'IRU INOP 4', condition:!IRU_4&&IRU_3 },
      { id: 3, message: 'IRU INOP 3,4', condition: WACAP_Test || !IRU_3&&!IRU_4 },
      { id: 4, message: 'APU', condition: WACAP_Test || APU_ON>95 },
      { id: 5, message: 'ANTI ICE 3', condition: !AntiIceEng3&&AntiIceEng4 },
      { id: 6, message: 'ANTI ICE 4', condition: !AntiIceEng4&&AntiIceEng3 },
      { id: 7, message: 'ANTI ICE 3,4', condition: WACAP_Test || !AntiIceEng4&&!AntiIceEng3 },
      { id: 8, message: 'ENG OIL PRESS 3', condition: OilPressEng3<70&&OilPressEng4>70 },
      { id: 9, message: 'ENG OIL PRESS 4', condition: OilPressEng4<70&&OilPressEng3>70 },
      { id: 10, message: 'ENG OIL PRESS 3,4', condition: WACAP_Test || OilPressEng3<70&&OilPressEng4<70 },
      { id: 11, message: 'R TROOP DOOR', condition: WACAP_Test || Para_R },
      { id: 12, message: 'AERO-I INOP', condition: WACAP_Test || !MAIN_PWR },
      { id: 13, message: 'RADAR ALT 2', condition: WACAP_Test || !MAIN_PWR },
      { id: 14, message: 'PROBE HEATER', condition: WACAP_Test || !Pitot_R},
      { id: 15, message: 'EMERGENCY PWR', condition: WACAP_Test || !Emer_Pwr},
      { id: 16, message: 'P/S 2A, 2B HEAD HTR', condition: WACAP_Test || !MAIN_PWR},
      
      // Add more caution messages here...
    ];

    setCautionMessages(messages);
  }, [WACAP_Test,Emer_Pwr,Pitot_R,WACAP_Test,IRU_3,IRU_4,APU_ON,AntiIceEng3,AntiIceEng4,Para_R, MAIN_PWR, MAIN_PWR]);

  const maxMessages = 14;
  const visibleMessages = cautionMessages.filter((message) => message.condition);
  const remainingMessages = Math.max(0, visibleMessages.length - maxMessages);
  // Calculate the maximum value for Scroll_L
const maxScroll = Math.max(0, remainingMessages);

// Ensure that Scroll_L does not exceed maxScroll
const clampedScroll_L = Math.min(Scroll_R, maxScroll);

// Calculate the displayed messages based on clampedScroll_L
const displayedMessages = visibleMessages.slice(clampedScroll_L, clampedScroll_L + maxMessages);

  
  return (
    <g>
      {/* right */}
      {displayedMessages.map((message, index) => (
        <text
          key={message.id}
          x={885}
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
        <g className="scroll-symbols" transform={`translate(323, 60) `}>
          <text x={650} y={615} fontSize={16} fill="#00EE00">
            ↑
          </text>
          <text x={650} y={638} fontSize={16} fill="#00EE00">
            {'↓'}
          </text>
        </g>
      )}
    </g>
  );
};