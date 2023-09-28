import React, { useState, useEffect } from 'react';
import { useSimVar } from '../../Hooks/simVars';

interface CautionMessage {
  id: number;
  message: string;
  condition: boolean;
}

export const WACAP_Left = (props) => {
  let [WACAP_Test] = useSimVar('L:C17_WACAP_Test', 'bool');
  let [EnteranceDoor] = useSimVar('L:C17_Crew_Enterance', 'bool');
  let [IRU_1] = useSimVar('L:C17_IRU1', 'bool');
  let [IRU_2] = useSimVar('L:C17_IRU2', 'bool');
  let [IRU_3] = useSimVar('L:C17_IRU3', 'bool');
  let [IRU_4] = useSimVar('L:C17_IRU4', 'bool');
  const [cautionMessages, setCautionMessages] = useState<CautionMessage[]>([]);

  useEffect(() => {
    const messages: CautionMessage[] = [
      { id: 1, message: 'ENTRY DOOR', condition: WACAP_Test || EnteranceDoor },
      { id: 2, message: 'IRU INOP 1', condition: WACAP_Test || !IRU_1 },
      { id: 3, message: 'IRU INOP 2', condition: WACAP_Test || !IRU_2 },
      // Add more caution messages here...
    ];

    setCautionMessages(messages);
  }, [WACAP_Test, EnteranceDoor,IRU_1,IRU_2]);

  const maxMessages = 14;
  const visibleMessages = cautionMessages.filter((message) => message.condition);
  const displayedMessages = visibleMessages.slice(0, maxMessages);
  const remainingMessages = Math.max(0, visibleMessages.length - maxMessages);

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
        <g className="scroll-symbols">
          <text x={650} y={615 + maxMessages * 23} fontSize={16} fill="#00EE00">
            ↑
          </text>
          <text x={650} y={638 + maxMessages * 23} fontSize={16} fill="#00EE00">
            ↓
          </text>
        </g>
      )}
    </g>
  );
};