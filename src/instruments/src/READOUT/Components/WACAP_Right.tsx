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
  const [cautionMessages, setCautionMessages] = useState<CautionMessage[]>([]);

  useEffect(() => {
    const messages: CautionMessage[] = [
      { id: 1, message: 'IRU INOP 3', condition: WACAP_Test || !IRU_3 },
      { id: 2, message: 'IRU INOP 4', condition: WACAP_Test || !IRU_4 },
      // Add more caution messages here...
    ];

    setCautionMessages(messages);
  }, [WACAP_Test,IRU_3,IRU_4]);

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