import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const WACAP2 = (props) => {

    let [Park_brake] = useSimVar('A:Brake parking position', 'bool');

    const cautionMessages = [
      { id: 1, message: 'PARK BRAKE ON L', condition: Park_brake },
      { id: 2, message: 'PARK BRAKE ON R', condition: Park_brake },
      // Add more caution messages here...
    ];
  
    const maxMessages = 14;
    const currentMessages = cautionMessages.filter((message) => message.condition).slice(0, maxMessages);
    const remainingMessages = cautionMessages.filter((message) => message.condition).length - maxMessages;
  
   

    return (
        <div className="caution-zone">
          <div className="caution-messages">
            {currentMessages.map((message) => (
                <div key={message.id} className="message" style={{ fontFamily: 'Arial', fontSize: '16px' }}>
  {message.message}
</div>
            ))}
          </div>
          {remainingMessages > 0 && (
            <div className="scroll-symbols">
              <span className="up-symbol">↑</span>
              <span className="down-symbol">↓</span>
            </div>
          )}
        </div>
      );
    }
