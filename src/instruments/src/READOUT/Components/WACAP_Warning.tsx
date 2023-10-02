import React, { useState, useEffect } from 'react';
import { useSimVar } from '../../Hooks/simVars';

interface CautionMessage {
  id: number;
  message: string;
  condition: boolean;
}

export const WACAP_Warning = (props) => {
  const [WACAP_Test] = useSimVar('L:C17_WACAP_Test', 'bool');
  const [APU_FIRE] = useSimVar('L:C17_FIRE_TEST', 'enum');
  const [PCH_AUTHORITY] = useSimVar('L:C17_PCH_AUTHORITY', 'BOOL');
  const [cautionMessages, setCautionMessages] = useState<CautionMessage[]>([]);

  useEffect(() => {
    const messages: CautionMessage[] = [
      { id: 1, message: 'APU FIRE', condition: WACAP_Test || APU_FIRE },
      { id: 2, message: 'OBIGG MANIFOLD L,R', condition: WACAP_Test },
      { id: 3, message: 'CABIN PRESS LOW', condition: WACAP_Test },
      { id: 4, message: 'TRIM AIR MANIFOLD', condition: WACAP_Test },
      { id: 5, message: 'PITCH AUTHORITY', condition: WACAP_Test || PCH_AUTHORITY},
      // Add more caution messages here...
    ];

    setCautionMessages(messages);
  }, [APU_FIRE,WACAP_Test,WACAP_Test,WACAP_Test,WACAP_Test,PCH_AUTHORITY]);

  const maxMessages = 5;
  const visibleMessages = cautionMessages.filter((message) => message.condition);
  const displayedMessages = visibleMessages.slice(0, maxMessages);

  return (
    <g>
      {displayedMessages.map((message, index) => (
        <text
  key={message.id}
  x={670}
  y={713 + index * 13}
  fontSize={15}
  fill="yellow"

  textAnchor="middle"
>
  <tspan className="scroll-symbols">{"► "}</tspan>
  <tspan className="WAPanel" >{message.message}</tspan>
  <tspan className="scroll-symbols">{" ◄"}</tspan>
</text>
      ))}
    </g>
  );
};