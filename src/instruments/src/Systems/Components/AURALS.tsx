import React, { useEffect, useState, useRef } from 'react';
import { render } from "../../Hooks/index";
import { useSimVar } from '../../Hooks/simVars';
import "../style.scss";

export const AURALS = () => {


  let [WacsFail, setWacsFail] = useSimVar('L:C17_ALERT_Wacs_Fail', 'bool');
  let [Avionics_PWR] = useSimVar('A:CIRCUIT ON:65', 'bool');
  let [Cargo_door] = useSimVar('L:C17_CargoDoor_POS', 'enum');
  let [Cargo_door_Sound, setCargoDoorSound] = useSimVar('L:C17_CargoDoor_Sound', 'bool');
  let [StabMotion, setStabMotion] = useSimVar('L:C17_STAB_MOTION', 'bool');
  let [Stab_Trim] = useSimVar('A:ELEVATOR TRIM PCT', 'degrees');
  let [SimOnGround] = useSimVar('A:SIM ON GROUND', 'bool');
  let [ATEngaged] = useSimVar('A:AUTOTHROTTLE ACTIVE', 'bool');
  let [ThrrotleWarning, setThrrotleWarning] = useSimVar('L:C17_AT_warning', 'bool');

const isInitialRenderCargo = useRef(true);
const isInitialRenderWacs = useRef(true);


useEffect(() => {
  if (ATEngaged === false) {
    setThrrotleWarning(true);
    const timeoutIdAT = setTimeout(() => setThrrotleWarning(false), 2000);
    return () => clearTimeout(timeoutIdAT);
  }
}, [ATEngaged]);

const [ThrrotleWarningValue, setThrrotleWarningValue] = useSimVar('L:C17_AT_warning', 'bool');
useEffect(() => {
  // Check if ATEngaged changed from true to false
  if (ThrrotleWarningValue && !ThrrotleWarning) {
    setThrrotleWarning(true);
    const timeoutId = setTimeout(() => setThrrotleWarning(false), 2000);
    return () => clearTimeout(timeoutId);
  }
}, [ThrrotleWarningValue, ThrrotleWarning]);

useEffect(() => {
  // Check if Avionics_PWR changes
  if (!isInitialRenderWacs.current && Avionics_PWR) {
    // Use setTimeout to delay setting WacsFail to true
    const delay = 2000; // 2000 milliseconds = 2 seconds
    const timerId = setTimeout(() => {
      setWacsFail(true);
    }, delay);

    // Cleanup the timer if the component unmounts or Avionics_PWR changes
    return () => clearTimeout(timerId)
  }
}, [Avionics_PWR]);

// Set the corresponding ref to false after the initial render
useEffect(() => {
  isInitialRenderCargo.current = false;
}, []);

useEffect(() => {
  isInitialRenderWacs.current = false;
}, []);

  return (
      <g>

<text x={0} y={50} fontSize={100} fill='white'>{ATEngaged}</text>

          <text x={50} y={50} fontSize={100} fill='white'>{ThrrotleWarning && ATEngaged && WacsFail && Cargo_door_Sound && StabMotion && ThrrotleWarning && ATEngaged}</text>
      </g>
  );
};
