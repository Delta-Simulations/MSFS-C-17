import React, { useContext } from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const FPV2 = () => {

    const [velX] = useSimVar('A:VELOCITY BODY X', 'm/s');
    const [velY] = useSimVar('A:VELOCITY BODY Y', 'm/s');
    const [velZ] = useSimVar('A:VELOCITY BODY Z', 'm/s');

    const [pitch] = useSimVar('A:PLANE PITCH DEGREES', 'Degrees');
    const [ias] = useSimVar('A:AIRSPEED INDICATED', 'Knots');
    const [onGround] = useSimVar('A:SIM ON GROUND', 'Boolean');

    const activeVert = !onGround;
    const ShowFPV = ias >= 60;

    const crabAnble = ShowFPV ? (180/Math.PI)*(Math.atan2(velX, velZ)) : 0;
    const pitchAngle = activeVert ? (180/Math.PI)*(Math.atan2(velY, velZ)) : 0;
    const dx = crabAnble * 28;
    const dy = -pitchAngle * 37;

    var [Cage_FPV] = useSimVar('L:C17_HUD_Cage', 'bool')


    let ShowCage: boolean = true;
    if ((ShowFPV == true) && (Cage_FPV == 1) && (Math.abs(crabAnble)>6)) {
        ShowCage = true
    } else {
        ShowCage = false
    }


    return (
        <g transform={`translate(0 ${74+-pitch * 12}) `} >
            <g visibility={ShowCage ? 'visible' : 'hidden'} transform={`translate(0 ${dy})`}>
                    <g transform='scale(0.87) translate(628,386)'>
                        <g>
                            <circle cx="45.5" cy="45.5" r="27" className="readouts" stroke-width="3.2"/>
                        </g>
                        <g transform='translate(16,16)'>
                            <path d="M21 0H38V59H21V0Z" fill="black"/>
                            <path d="M0 38L2.02723e-07 21H59V38H0Z" fill="black"/>        
                        </g>   
                </g>
            </g>

            <g transform={`translate(${dx} ${dy})`} >
                <g visibility={ShowFPV ? 'visible' : 'hidden'}>
                        <g transform='scale(0.87) translate(628,386)'>
                            <line x1="45.5" y1="18" x2="45.5" y2="-6.55671e-08" className="readouts" stroke-width="3.2"/>
                            <line y1="45.5" x2="18" y2="45.5" className="readouts" stroke-width="3.2"/>
                            <line x1="73" y1="44.5" x2="91" y2="44.5" className="readouts" stroke-width="3.2"/>
                            <circle cx="45.5" cy="45.5" r="27" className="readouts" stroke-width="3.2" fill='none'/>
                        </g>
                    </g>

            </g>

        </g>
    );
};
