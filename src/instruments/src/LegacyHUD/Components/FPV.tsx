import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const FPV = () => {


    var [IndicatedSpeed] = useSimVar('AIRSPEED INDICATED', 'knots');
    IndicatedSpeed = Math.floor(IndicatedSpeed*10)/10
    var [Cage_FPV] = useSimVar('L:C17_HUD_Cage', 'bool')

    // X SHIFT CALC
    var [GroundTrack1] = useSimVar('GPS GROUND TRUE TRACK', 'radians');
    var [GroundTrack2] = useSimVar('gps ground true heading', 'radians');
    let XShift: number = Math.floor(((Math.sin(GroundTrack1-GroundTrack2)) * 60)*100)/100;

    // Y SHIFT CALC
    var [AoA] = useSimVar('ANGLE OF ATTACK INDICATOR', 'radians');
    AoA = Math.floor(AoA*100)/100

    var [VSpeed] = useSimVar('Vertical speed', 'm/s');
    VSpeed = Math.floor(VSpeed*100)/100
    var [GroundVelocity] = useSimVar('Ground Velocity', 'm/s');
    GroundVelocity = Math.floor(GroundVelocity*100)/100
    let YShift: number = - (-AoA*4+180 * Math.atan(VSpeed / GroundVelocity))/ Math.PI ;


    let ShowFPV: boolean = true;
    if (IndicatedSpeed>60) {
        ShowFPV = true
    } else {
        ShowFPV = false
    }

    let ShowCage: boolean = true;
    if ((ShowFPV == true) && (Cage_FPV == 1) && (Math.abs(XShift)>7)) {
        ShowCage = true
    } else {
        ShowCage = false
    }
    
    return(
        <g>
            <g transform={`translate(0 75)` }>
                <g visibility={ShowFPV ? 'visible' : 'hidden'} transform={`translate(${10*XShift} ${10*YShift})`}>
                    <g transform='scale(0.87) translate(628,386)'>
                        <line x1="45.5" y1="18" x2="45.5" y2="-6.55671e-08" className="readouts" stroke-width="3.2"/>
                        <line y1="45.5" x2="18" y2="45.5" className="readouts" stroke-width="3.2"/>
                        <line x1="73" y1="44.5" x2="91" y2="44.5" className="readouts" stroke-width="3.2"/>
                        <circle cx="45.5" cy="45.5" r="27" className="readouts" stroke-width="3.2" fill='none'/>
                    </g>
                </g>
                <g visibility={ShowCage ? 'visible' : 'hidden'} transform={`translate(0 ${15*YShift})`}>
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
            </g>

        </g>
    )
};
