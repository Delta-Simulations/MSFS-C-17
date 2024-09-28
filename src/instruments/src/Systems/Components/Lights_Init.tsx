import React, { useEffect, useState } from 'react';
import { useSimVar } from '../../Hooks/simVars';
import "../style.scss";

export const Lights_Init = () => {
  let [Init, setInit] = useSimVar('L:C17_Initialization', 'bool');
  
    useEffect(() => {
      // Set a timeout to change the variable after 2 seconds
      const timer = setTimeout(() => {
        setInit(0);
      }, 2000);
  
      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }, []); // Empty dependency array means this runs once on mount

  return (
    <g>
      <text x={10} y={10} fontSize={5} fill='#00EE00' className='ESIS'>{Init}</text>
    </g>
  );
};