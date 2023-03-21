import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const Stationary = () => {
    var [RADalt] = useSimVar('PLANE ALT ABOVE GROUND', 'feet')
    RADalt = Math.floor(RADalt)
    RADalt = RADalt-10

    let ShowRA: number = 1;
  
    if (RADalt <= 1500) {
        ShowRA = 1
    } else {
        ShowRA = 0
    }

    return(
        <g>
            <g transform={`translate(458, 120), scale(2,1.93)`}>
                <line className="a" x1="26.32" y1="16.12" x2="26.32" y2="21.53"/>
                <line className="a" x1="45.06" y1="11.15" x2="45.06" y2="16.16"/>
                <path className="a" d="M59.21,4.11C29.76,5.34,12.06,14.54,1.43,21.25L7.75,30l2.94-2L8,23.74,5,19.08l3,4.66c1.79,0,21.94-14.38,53.64-14.42"/>
                <polyline className="a" points="63.47 1 69.38 1 63.89 13.66 58.39 1 63.47 1"/>
                <line className="a" x1="101.59" y1="16.12" x2="101.59" y2="21.53"/>
                <line className="a" x1="82.85" y1="11.15" x2="82.85" y2="16.16"/>
                <path className="a" d="M68.7,4.11c29.45,1.23,47.15,10.43,57.77,17.14L120.16,30l-3-2,2.7-4.18,3-4.66-3,4.66c-1.8,0-21.94-14.38-53.64-14.42"/>
        
            </g>

            <line className="a2" x1="140" y1="448" x2="171" y2="448" strokeWidth={3}/>
            <circle cx="190" cy="448" r="18" className="a2" fill='none' strokeWidth={3} />

            <g transform={`translate(1170, 0), scale(-1,1)`}>
                <line className="a2" x1="140" y1="448" x2="171" y2="448" strokeWidth={3}/>
                <circle cx="190" cy="448" r="18" className="a2" fill='none' strokeWidth={3} />
            </g>

            <g transform={`translate(0, 0), scale(0.88)`}>
                <path d="M722 6H1192.5L1318 131.5M722 1435.5H1192.5L1318 1310M724 6H131.5L6 131M722.5 1436H131.5L6 1310" className="a2" stroke-width="3"/>
                <path d="M1318.5 131V1311M5.49994 131L5.49999 1311" className="a2" stroke-width="3" stroke-dasharray="55 15"/>
            </g>
            <g transform={`translate(530 445)scale(0.86)`}>
                <path d="M0 3.5H18.5L41.5 41L61 0.5H68L87.5 41L110.5 3.5H129" strokeWidth={3} className='readouts'/>
            </g>
            <g visibility={ShowRA ? 'visible' : 'hidden'} >
                <text x={1142} y={748} fontSize={33} className='FrontPNL' textAnchor="end">{RADalt}</text>
                <text x={1009} y={748} fontSize={33} className='FrontPNL' textAnchor="end">RA</text>
            </g>

        </g>
    )
};
