import React, { useEffect, useState } from 'react';
import { useSimVar } from '../../Hooks/simVars';
import "../style.scss";

export const MasterCaution = () => {
  let [MasterCaution, setMasterCaution] = useSimVar('L:C17_ALERT_MASTER_CAUTION', 'bool');

  // Define an array of triggering conditions
  const fuelQuantity = useSimVar('A:FUEL TOTAL QUANTITY WEIGHT', 'pounds')[0];
  const triggeringConditions = [
    useSimVar('L:AnotherCondition', 'bool')[0],
    useSimVar('L:YetAnotherCondition', 'bool')[0],
    useSimVar('L:C17_ALERT_WACS_FAIL', 'bool')[0],
    fuelQuantity <= 16000, // Check if the fuel quantity is equal to 16000
    // Add more conditions here as needed
  ];

  // useEffect to set MasterCaution to true when any triggering condition becomes true
  useEffect(() => {
    if (triggeringConditions.some(condition => condition)) {
      // Use setTimeout to delay setting MasterCaution to true
      const delay = 1000; // 1000 milliseconds = 1 second
      const timerId = setTimeout(() => {
        setMasterCaution(true);
      }, delay);

      // Cleanup the timer if the component unmounts or if any triggering condition changes
      return () => clearTimeout(timerId);
    }
  }, [...triggeringConditions]); // This effect will run whenever any triggering condition changes

  return (
    <g>
      <text x={10} y={10} fontSize={5} fill='#00EE00' className='ESIS'>100</text>
    </g>
  );
};