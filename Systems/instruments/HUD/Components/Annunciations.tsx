import React from 'react';
import { useSimVar } from '../../Hooks/simVars';
import "../style.scss";


export const Annunciations = () => {
    let [IRU1] = useSimVar('L:C17_IRU1', 'bool');
    let [IRU2] = useSimVar('L:C17_IRU2', 'bool');
    let [IRU3] = useSimVar('L:C17_IRU3', 'bool');
    let [IRU4] = useSimVar('L:C17_IRU4', 'bool');
    let [Terrain_Caution] = useSimVar('L:C17_TERRAIN_FLYUP', 'bool');

    return(
        <g>
                <text visibility={(IRU1 && IRU2 && IRU3 && IRU4) ? 'hidden' : 'visible'} x={585} y={430} fontSize={60} fill="green" textAnchor="middle" className='textAlert' >
                    DO NOT TAXI
                </text>
                <text visibility={Terrain_Caution ? 'visible' : 'hidden'} x={585} y={430} fontSize={60} fill="green" textAnchor="middle" className='textAlert' >
                    TERRAIN
                </text>
        </g>
    )
};
