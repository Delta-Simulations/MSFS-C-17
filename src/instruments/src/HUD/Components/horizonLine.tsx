import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const HorizonLine = (props) => {

    const [roll] = useSimVar('PLANE BANK DEGREES', 'Degrees');
    const [pitch] = useSimVar('PLANE PITCH DEGREES', 'Degrees');
    
    return(
        <g>
            <g transform={`translate(0 ${props.height}) `}>
                <rect x={670} y={0} width={30} height={3} fill='#2CE832'/>
                <rect x={712} y={0} width={30} height={3} fill='#2CE832'/>
                <rect x={753} y={0} width={30} height={3} fill='#2CE832'/>
                <rect x={795} y={0} width={40} height={3} fill='#2CE832'/>
                <rect x={832} y={-17} width={3} height={17} fill='#2CE832'/>
                
                <rect x={470} y={0} width={30} height={3} fill='#2CE832'/>
                <rect x={429} y={0} width={30} height={3} fill='#2CE832'/>
                <rect x={388} y={0} width={30} height={3} fill='#2CE832'/>
                <rect x={336} y={0} width={40} height={3} fill='#2CE832'/>
                <rect x={336} y={-17} width={3} height={17} fill='#2CE832'/>

                <text x={318} y={12} fontSize={30} fill="white" textAnchor="middle">{props.label}</text>
                <text x={855} y={12} fontSize={30} fill="white" textAnchor="middle">{props.label}</text>
            </g>
        </g>
    )
};
