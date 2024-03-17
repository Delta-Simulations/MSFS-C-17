import React, { useEffect, useState, useRef } from 'react';
import { useSimVar } from '../../Hooks/simVars';
import "../style.scss";

export const AURALS = () => {
  let [ATEngaged] = useSimVar('A:AUTOPILOT THROTTLE ARM', 'bool');
  let [ATWarning, setATWarning] = useSimVar('L:C17_AT_warning', 'bool');

  let [WacsFail, setWacsFail] = useSimVar('L:C17_ALERT_Wacs_Fail', 'bool');
  let [Avionics_PWR] = useSimVar('A:CIRCUIT ON:65', 'bool');
  let [Cargo_door] = useSimVar('L:C17_CargoDoor_POS', 'enum');
  let [Cargo_door_Sound, setCargoDoorSound] = useSimVar('L:C17_CargoDoor_Sound', 'bool');
  let [StabMotion, setStabMotion] = useSimVar('L:C17_STAB_MOTION', 'bool');
  let [Stab_Trim] = useSimVar('A:ELEVATOR TRIM PCT', 'degrees');
  let [SimOnGround] = useSimVar('A:SIM ON GROUND', 'bool');
  const prevStab_TrimRef = useRef(Stab_Trim); // Store the previous value of Stab_Trim
  const isInitialRender = useRef(true);

  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    // Check if ATEngaged transitioned from 1 to 0
    if (ATEngaged === false && timerActive === false) {
      // Set ATWarning to true
      setATWarning(true);

      // Start a 4-second timer to reset ATWarning
      const timerId = setTimeout(() => {
        setATWarning(false);
        setTimerActive(false);
      }, 4000); // 4000 milliseconds = 4 seconds

      // Set timerActive to true to prevent multiple timers
      setTimerActive(true);

      // Cleanup the timer if the component unmounts
      return () => {
        clearTimeout(timerId);
      };
    } else if (ATEngaged === true && timerActive === true) {
      // Reset the timer if ATEngaged changes back to 1 before the timer expires
      setTimerActive(false);
    }
  }, [ATEngaged, timerActive]);

  useEffect(() => {
    // Check if there's power and the aircraft is on the ground
    if (Avionics_PWR && SimOnGround) {
      // Check if Stab_Trim has changed from the previous value
      if (Stab_Trim !== prevStab_TrimRef.current) {
        setStabMotion(true); // Turn on StabMotion
      }
      // Use setTimeout to turn off StabMotion after one second
      const turnOffTimeout = setTimeout(() => {
        setStabMotion(false);
      }, 5000); // 1000 milliseconds = 1 second
      // Cleanup the timeout when the component unmounts or when power is lost or not on the ground
      return () => {
        clearTimeout(turnOffTimeout);
      };
    } else {
      // Reset StabMotion when power is lost or not on the ground
      setStabMotion(false);
    }
    // Update the previous value of Stab_Trim
    prevStab_TrimRef.current = Stab_Trim;
  }, [Avionics_PWR, SimOnGround, Stab_Trim])

  useEffect(() => {
    // Skip the first render (initial load)
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Set Cargo_door_Sound to true when Cargo_door changes
    setCargoDoorSound(true);

    // Use setTimeout to reset Cargo_door_Sound to false after 5 seconds
    const timeoutId = setTimeout(() => {
      setCargoDoorSound(false);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup the timer if the component unmounts or if Cargo_door changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [Cargo_door])


  // useEffect to set WacsFail to true 2 seconds after Avionics_PWR becomes true
  useEffect(() => {
    if (Avionics_PWR) {
      // Use setTimeout to delay setting WacsFail to true
      const delay = 2000; // 2000 milliseconds = 2 seconds
      const timerId = setTimeout(() => {
        setWacsFail(true);
      }, delay);

      // Cleanup the timer if the component unmounts or Avionics_PWR changes
      return () => clearTimeout(timerId);
    }
  }, [Avionics_PWR]) // This effect will run whenever Avionics_PWR changes

  return (
      <g>
          <text x={50} y={50} fontSize={100} fill='white' className='ESIS'>{WacsFail*Cargo_door_Sound*StabMotion*ATWarning}</text>
      </g>
  );
};