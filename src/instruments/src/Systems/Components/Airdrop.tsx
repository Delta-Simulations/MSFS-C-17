import React, { useEffect } from 'react';
import { render } from "../../Hooks/index";
import { useSimVar } from '../../Hooks/simVars';
import "../style.scss";
import { getDistance } from 'geolib';

export const Airdrop_CAWS = () => {
  const [AC_Lat] = useSimVar('A:GPS POSITION LAT', 'Degrees', 500);
  const [AC_Lon] = useSimVar('A:GPS POSITION LON', 'Degrees', 500);
  const [Airdrop_Lat] = useSimVar('L:C17_AD_Lat', 'Degrees');
  const [Airdrop_Lon] = useSimVar('L:C17_AD_Lon', 'Degrees');
  let [AC_Distance, setAC_Distance] = useSimVar('L:C17_AD_Dist', 'meters');
  let [AC_BearingtoWP, setAC_BearingtoWP] = useSimVar('L:C17_AD_Bearing', 'degrees');

  const [Airdrop_Active] = useSimVar('L:C17_AD_ACTIVE', 'bool');
  let lat1 = Math.round(AC_Lat*100000)/100000
  let lon1 = Math.round(AC_Lon*100000)/100000
  let lat2 = Math.round(Airdrop_Lat*100000)/100000
  let lon2 = Math.round(Airdrop_Lon*100000)/100000
  let unit;
  let brng;
  let dist;
    if (((lat2 > 0) ) ) {

      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }

      const y = Math.sin(lat2-lat1) * Math.cos(lon2);
      const x = Math.cos(lon1)*Math.sin(lon2) -
                Math.sin(lon1)*Math.cos(lon2)*Math.cos(lat2-lat1);
      const θ = Math.atan2(y, x);
      brng = (θ*180/Math.PI)
      useEffect(() => {
        setAC_Distance(dist)
        setAC_BearingtoWP(brng)
      }, [dist, brng]);
    
    }





  return (
    <g>
      <text x={0} y={100} fontSize={100} fill='green'>DIST{dist}</text>
    </g>
  );
};