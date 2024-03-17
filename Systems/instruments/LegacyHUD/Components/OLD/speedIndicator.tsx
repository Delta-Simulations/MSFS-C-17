import React from 'react';
import "../style.scss";

import { SpdMarker } from './speedMarker';
import { useSimVar } from '../../Hooks/simVars';

export const SpdIndicator = () => {
    const [speed] = useSimVar('AIRSPEED INDICATED', 'knots');


    const [gs] = useSimVar('GROUND VELOCITY', 'knots');
    

    const elements : JSX.Element[] = []
    const number = 10

    for (let i = 2; i < 300; i++) {
        let height2 = 224+(i*93)
        let spd2 = i*20
        const SpdMark = <SpdMarker height={height2} speedIndicate={spd2} />
        elements.push(SpdMark)
    }
    if (speed <= 30) {
        var ones = 0
        var tens = 3

    } else if (speed >= 100) {
        var hundreds = Math.floor(speed % 1000)
    } else {
        var ones = Math.floor(speed % 10)
        var tens = Math.floor(speed % 100)
        
    } 
    

    return(
        <g>
            
            <clipPath id='d-clip' >
                <rect x={50} y={230} width={230} height={400} fill='white' rx={1} ry={1}/>
            </clipPath>
            {/*<g clipPath='url(#d-clip)'>
                <SpdMarker height='1040' speedIndicate='200' />
            </g>*/}
            <g clipPath='url(#d-clip)' >
                <g transform={`translate( 0 24 )`}>
                    {elements}
                </g>
            </g>
            {/*<text x={140} y={580} fontSize={62} fill='white'>{ones}</text>
            <text x={100} y={580} fontSize={62} fill='white'>{tens}</text>
            <text x={60} y={580} fontSize={62} fill='white'>{hundreds}</text>*/}

            

        </g>
    )
};
