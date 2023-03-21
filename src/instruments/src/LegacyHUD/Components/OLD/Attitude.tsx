import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const Attitude = () => {

    var [Roll] = useSimVar('PLANE BANK DEGREES', 'Degrees');
    Roll = Math.floor(Roll*100)/100
    var [Pitch] = useSimVar('PLANE PITCH DEGREES', 'Degrees');
    Pitch = Math.floor(Pitch*100)/100

    const [AP_API] = useSimVar('L:C17_API', 'enum');
    const [DCLT] = useSimVar('L:C17_DCLT', 'bool');

    let ShowAPI: boolean = false;
    if (AP_API > 0) {
        ShowAPI = true
    } else {
        ShowAPI = false
    }
    return(
        <g>
            

            <clipPath id='Hud_Clip' >
                <rect x={250} y={200} width={670} height={750} fill='black' />
            </clipPath>
            {/* <clipPath id='BankClip' >
                <rect x={250} y={100} width={670} height={750} fill='black' />
            </clipPath> */}

            <g clipPath='url(#Hud_Clip)' transform={`translate(0 -10)`}>
                <g transform={`rotate(${Roll}, 585, 550)`}>
                    <g transform={`translate(0 ${-Pitch * 12-100}) `}>
                        <g transform={`scale(1.5)`}>
                            <image xlinkHref="/Images/HUD_ATT.jpg" width={500} height={1600} x={140} y={-430}/>
                            <image visibility={DCLT ? 'hidden' : 'visible'} width={500} height={1600} xlinkHref="/Images/HUD_ATT3.jpg" x={140} y={-430}/>
                        </g>
                        <line className="readouts" strokeWidth={3.5} x1="275" y1="560" x2="500" y2="560"/>
                        <line className="readouts" strokeWidth={3.5} x1="671" y1="560" x2="895" y2="560"/>

                        <line visibility={ShowAPI ? 'visible' : 'hidden'} className="readouts" strokeWidth={3.5} x1="500" y1={560+AP_API*10.6} x2="671" y2={560+AP_API*10.6}/>
                    </g>

                </g>
            </g>
            <g clipPath='url(#BankClip)' transform={`translate(0 -10)`}>
                <g transform={`rotate(${Roll}, 585, 550)`}>
                    <g transform={`translate(-54, 113) `}>
                        <polygon points='625,85 640,44 655,85' className='readouts' strokeWidth={3} fill='none'/>
                    </g>
                </g>
            </g>

        </g>
    )
};
