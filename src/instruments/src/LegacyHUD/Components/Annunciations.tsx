import React from 'react';
import { useSimVar } from '../../Hooks/simVars';
import "../style.scss";


export const Annunciations = () => {
    var [RADalt] = useSimVar('PLANE ALT ABOVE GROUND', 'feet')
    RADalt = Math.floor(RADalt)


    return(
        <g>
            <g transform={`translate(0 75)` }>

                <g transform={`translate(0 ${0})`}>
                    <g transform='scale(0.87) translate(628,386)'>
                        <g>
                            <circle cx="45.5" cy="45.5" r="27" stroke="#2CE832" stroke-width="3.2"/>
                        </g>
                        <g transform='translate(16,16)'>
                            <path d="M21 0H38V59H21V0Z" fill="black"/>
                            <path d="M0 38L2.02723e-07 21H59V38H0Z" fill="black"/>        
                        </g>    

                    </g>
                </g>
            </g>
        </g>
    )
};
