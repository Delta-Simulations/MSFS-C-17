import React, { useEffect } from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const AURALS = () => {

  let [AP_ON] = useSimVar('A:AUTOPILOT AVAILABLE', 'bool');
  let [AP_AURAL, setAP_AURAL] = useSimVar('L:C17_AURAL_AP_DISENGAGE', 'bool');

  useEffect(() => {
    if (AP_ON === false && prevAP_ON === true) {
      setAP_AURAL(true);
    }
    prevAP_ON = AP_ON;
  }, [AP_ON]);

  let prevAP_ON = AP_ON;

  return (
    <div>
      <p>AURALS Component</p>
    </div>
  );
};