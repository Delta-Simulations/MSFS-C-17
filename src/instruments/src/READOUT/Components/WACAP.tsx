import React, { useState, useEffect } from 'react';
import { useSimVar } from '../../Hooks/simVars';

interface CautionMessage {
  id: number;
  message: string;
  condition: boolean;
}

export const WACAP = (props) => {
  const [WACAP_Test] = useSimVar('L:C17_WACAP_Test', 'bool');
  const [Park_brake] = useSimVar('A:Brake parking position', 'bool');
  const [Speed_brake] = useSimVar('A:Spoilers right position', 'bool');
  const [Landing_light] = useSimVar('A:Light landing', 'bool');
  const [Taxi_light] = useSimVar('A:Light taxi', 'bool');
  const [Fuel_quantity] = useSimVar('A:FUEL TOTAL QUANTITY', 'gallons');
  const [Cargo_door] = useSimVar('L:C17_CargoDoor_POS', 'enum');
  const [SlatDisable] = useSimVar('L:C17_Slat_Disable', 'bool');
  const [cautionMessages, setCautionMessages] = useState<CautionMessage[]>([]);
  const [Fuel_Quantity_L_Out] = useSimVar('A:FUELSYSTEM TANK WEIGHT:1', 'Pounds');
  const [Fuel_Quantity_R_Out] = useSimVar('A:FUELSYSTEM TANK WEIGHT:4', 'Pounds');
  const [Fuel_Quantity_L_In] = useSimVar('A:FUELSYSTEM TANK WEIGHT:2', 'Pounds');
  const [Fuel_Quantity_R_In] = useSimVar('A:FUELSYSTEM TANK WEIGHT:3', 'Pounds');
  let Fuel_Delta = Math.abs((Fuel_Quantity_L_Out + Fuel_Quantity_L_In) - (Fuel_Quantity_R_Out + Fuel_Quantity_R_In))

  useEffect(() => {
    const messages: CautionMessage[] = [
      { id: 1, message: 'PARK BRAKE ON L, R', condition: WACAP_Test || Park_brake },
      { id: 2, message: 'LANDING/TAXI LTS', condition: WACAP_Test || (Landing_light || Taxi_light) },
      { id: 4, message: 'FUEL LOW', condition: WACAP_Test || Fuel_quantity <= 16000 },
      { id: 8, message: 'L OR R FUEL HEAVY', condition: WACAP_Test || Fuel_Delta >= 8000 },
      { id: 5, message: 'SPEED BRAKES', condition: WACAP_Test || Speed_brake },
      { id: 6, message: 'RAMP OPEN', condition: WACAP_Test || Cargo_door },
      { id: 7, message: 'SLAT OVERRIDE', condition: WACAP_Test || SlatDisable },
      
      // Add more caution messages here...
    ];

    setCautionMessages(messages);
  }, [WACAP_Test, Park_brake, Speed_brake, Landing_light, Taxi_light, Fuel_quantity, Cargo_door, SlatDisable]);

  const maxMessages = 14;
  const visibleMessages = cautionMessages.filter((message) => message.condition);
  const displayedMessages = visibleMessages.slice(0, maxMessages);
  const remainingMessages = Math.max(0, visibleMessages.length - maxMessages);

  return (
    <g>
      {/* CENTER */}
      {displayedMessages.map((message, index) => (
        <text
          key={message.id}
          x={670}
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