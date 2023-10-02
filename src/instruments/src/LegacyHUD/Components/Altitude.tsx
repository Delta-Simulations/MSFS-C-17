import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const Altitude = () => {

    let [IndicatedSpeed] = useSimVar('AIRSPEED INDICATED', 'knots');
    IndicatedSpeed = Math.floor(IndicatedSpeed*100)/100;

    let [HDG] = useSimVar('Plane heading degrees gyro', 'degrees');
    HDG = Math.floor(HDG*100)/100;

    let [DCLT] = useSimVar('L:C17_DCLT', 'bool');

    let [RADalt] = useSimVar('A:PLANE ALT ABOVE GROUND', 'feet')
    RADalt = Math.floor(RADalt*100)/100;

    let [INDalt] = useSimVar('A:INDICATED ALTITUDE', 'feet')
    INDalt = Math.floor(INDalt*100)/100;

    let [UseRAalt] = useSimVar('L:C17_HUD_RaBa', 'bool')

    let IndicatedALT: number;
    if (UseRAalt === 1) {
      IndicatedALT = RADalt;
    } else {
      IndicatedALT = INDalt;
    }

    return(
        <g> 
            <g>

            <g transform={`translate(0, 0) `}>
                <polygon points='160,655 177,671 177,640 ' className='readouts' strokeWidth={3} fill='none'/>
            </g>

                <clipPath id='Alt' >
                    <rect x={5} y={220} width={1154} height={440} fill='white'/>
                </clipPath>

                <g visibility={DCLT ? 'hidden' : 'visible'} clipPath='url(#Alt)'>
                    <g transform={`scale(1.3) translate(10 ${IndicatedALT/8.35-6956})`}  > 
                        <image xlinkHref="/Images/HUD_ALT_strip.jpg" width={92} height={7443} x={765} y={0}/>
                    </g>
                </g>

                <g visibility={DCLT ? 'hidden' : 'visible'} clipPath='url(#Alt)'>
                    <g transform={`translate(10 ${-3.9*IndicatedSpeed+417}) scale(1.3)`}> 
                        <image xlinkHref="/Images/HUD_KNT_strip.jpg" width={72} height={3000} x={44} y={0}/>
                    </g>
                </g>
            </g>
            <clipPath id='HDG' >
                <rect x={250} y={1040} width={660} height={440} fill='white'/>
            </clipPath>

            <g clipPath='url(#HDG)' >
                <g transform={`translate(${-9*HDG} 0) scale(1.5)`}> 
                    <image xlinkHref="/Images/HUD_HDG_strip.jpg" width={2620} height={48} x={192} y={720}/>
                </g>
            </g>

            <g transform={`translate(-54, 960) `}>
                <polygon points='625,85 640,124 655,85' className='readouts' strokeWidth={3} fill='none'/>
            </g>
        </g>
    )
};
