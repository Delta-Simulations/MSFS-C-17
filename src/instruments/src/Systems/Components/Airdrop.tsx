import React, { useEffect } from 'react';
import { render } from "../../Hooks/index";
import { useSimVar } from '../../Hooks/simVars';
import "../style.scss";

export const Airdrop_CAWS = () => {
  let [AC_Lat] = useSimVar('A:GPS POSITION LAT', 'Degrees', 500);
  let [AC_Lon] = useSimVar('A:GPS POSITION LON', 'Degrees', 500);
  let [Airdrop_Lat] = useSimVar('L:C17_AD_Lat', 'Degrees');
  let [Airdrop_Lon] = useSimVar('L:C17_AD_Lon', 'Degrees');
  let [AC_Distance, setAC_Distance] = useSimVar('L:C17_AD_Dist', 'kilometers');
  let [Airdrop_Active] = useSimVar('L:C17_AD_ACTIVE', 'bool');



  return (
    <g>
      <text x={0} y={50} fontSize={100} fill='white'>{1}</text>
    </g>
  );
};