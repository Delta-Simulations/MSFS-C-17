import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const HorizonLine2 = (props) => {

    const [roll] = useSimVar('PLANE BANK DEGREES', 'Degrees');
    const [pitch] = useSimVar('PLANE PITCH DEGREES', 'Degrees');
    
    return(
        <g>
            <g transform={`translate(0 ${props.height}) `}>
                <rect x={525} y={78} width={120} height={5} fill='white'/>
                <rect x={605} y={118} width={70} height={5} fill='white'/>
                <rect x={605} y={38} width={70} height={5} fill='white'/>
            </g>
        </g>
    )
};
