import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const AltitudeIndicator = () => {
    const [galt] = useSimVar('PLANE ALT ABOVE GROUND', 'feet')
    const [FL] = useSimVar('AUTOPILOT ALTITUDE LOCK VAR', 'feet')

    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    var groundAlt = Math.round(galt/10)
    groundAlt = groundAlt*10

    var AP_FL = Math.round(FL/1000)
    AP_FL = AP_FL * 10
    AP_FL.toString()
    AP_FL = pad(AP_FL, 3)
    return(
        <g>
            <text x={1155} y={1000} fontSize={62} fill='white' textAnchor='end'>{groundAlt}</text>
            <text x={1155} y={925} fontSize={62} fill='green' textAnchor='end'>DH{AP_FL}</text>
        </g>
    )
};
