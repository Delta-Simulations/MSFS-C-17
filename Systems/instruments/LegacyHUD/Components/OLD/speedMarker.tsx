import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const SpdMarker = (props) => {
    const [speed] = useSimVar('AIRSPEED INDICATED', 'knots');
    let speed2 = 0
    if (speed < 40) {
        speed2 = 0
    } else {
        speed2 = speed-40
    }
    return(
        <g transform={`translate(0 ${-speed2*4.5}) `}>
            <rect x={139} y={props.height} width={25} height={4} fill='#2CE832'/>
            <rect x={150} y={props.height-(-47.5)} width={12} height={4} fill='#2CE832'/>
            <text x={128} y={(props.height-(-19))} fontSize={41} fill="#2CE832" textAnchor="end">
                {props.speedIndicate}
            </text>
        </g>
    )
};