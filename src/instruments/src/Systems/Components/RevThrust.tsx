import React, { useEffect, useState, useRef } from 'react';
import { useSimVar } from '../../Hooks/simVars';
import "../style.scss";

export const ReverseThrust = () => {


  let [ReverseThrust] = useSimVar('L:C17_REV_THRUST', 'bool');
  let [Eng1, setEng1] = useSimVar('A:GENERAL ENG THROTTLE LEVER POSITION:1', 'percent', 0.1);
  let [Eng2, setEng2] = useSimVar('A:GENERAL ENG THROTTLE LEVER POSITION:2', 'percent', 0.1);
  let [Eng3, setEng3] = useSimVar('A:GENERAL ENG THROTTLE LEVER POSITION:3', 'percent', 0.1);
  let [Eng4, setEng4] = useSimVar('A:GENERAL ENG THROTTLE LEVER POSITION:4', 'percent', 0.1);
  useEffect(() => {
    if (ReverseThrust) {
      setEng1(-0.1);
      setEng2(-20);
      setEng3(-20);
      setEng4(-0.1);
    }
  }, [ReverseThrust]);

  return (
      <g>
          <text x={50} y={50} fontSize={100} fill='white' className='ESIS'>{ReverseThrust*Eng1*Eng2*Eng3*Eng4}</text>
      </g>
  );
};
