import React from 'react';
import { HorizonLine } from './horizonLine';

import { useSimVar } from '../../Hooks/simVars';

export const Horizon = () => {
    const [AP_API] = useSimVar('L:C17_API', 'enum');
    const [DCLT] = useSimVar('L:C17_DCLT', 'bool');

    let ShowAPI: boolean = false;
    if (AP_API > 0) {
        ShowAPI = true
    } else {
        ShowAPI = false
    }

    const [roll] = useSimVar('PLANE BANK DEGREES', 'Degrees');
    const [pitch] = useSimVar('PLANE PITCH DEGREES', 'Degrees');

    const [readouts] = useSimVar('L:DCLT', 'enum');

    const elements : JSX.Element[] = []

    for (let i = 1; i < 19; i++) {
        let height2 = 548 - (i*261.5)
        let aircraftPitch = (i*5)
        const SpdMark = <HorizonLine height={height2} label={aircraftPitch} />
        elements.push(SpdMark)
    }
    for (let i = 1; i < 19; i++) {
        let height2 = 548 + (i*261.5)
        let aircraftPitch = (i*5)
        const SpdMark = <HorizonLine height={height2} label={aircraftPitch} />
        elements.push(SpdMark)
    }

    return(
        <g>
            <clipPath id='ah-clip' >

                <rect x={250} y={200} width={700} height={750} fill='grey' rx={0} ry={0}/>

            </clipPath>
            {/*<path d="M 593 559 L 611 559 L 633 594 L 650 556 L 655 556 L 674 594 L 695 559 L 713 559" fill="transparent" stroke="white" strokeWidth={5} strokeLinecap={"round"} strokeLinejoin={"round"}/>*/}
         
            <g clipPath='url(#ah-clip)' transform={`translate(0 0)`}>
                <g transform={`translate(0 -10)`}>
                    <g transform={`translate(0 0)`}>
                        <g transform={`rotate(${roll}, 585, 550)`}>
                            <g transform={`translate(0 ${-pitch * 52}) `}>
                                <g transform={`translate(0 -90)`}>
                                    <g>
                                        <rect x={670} y={677} width={30} height={3} className='textAlert'/>
                                        <rect x={712} y={677} width={30} height={3} className='textAlert'/>
                                        <rect x={753} y={677} width={56} height={3} className='textAlert'/>
                                        <rect x={806} y={660} width={3} height={17} className='textAlert'/>
                                        
                                        <rect x={470} y={677} width={30} height={3} className='textAlert'/>
                                        <rect x={429} y={677} width={30} height={3} className='textAlert'/>
                                        <rect x={361} y={677} width={56} height={3} className='textAlert'/>
                                        <rect x={361} y={660} width={3} height={17} className='textAlert'/>

                                        <rect x={279} y={547} width={222} height={3} className='textAlert'/>
                                        <rect x={670} y={547} width={222} height={3} className='textAlert'/>

                                        <rect x={361} y={421} width={139} height={3} className='textAlert'/>
                                        <rect x={361} y={421} width={3} height={17} className='textAlert'/>
                                        <rect x={670} y={421} width={139} height={3} className='textAlert'/>
                                        <rect x={806} y={421} width={3} height={17} className='textAlert'/>

                                        {elements}
                                        <line visibility={ShowAPI ? 'visible' : 'hidden'} className="readouts" strokeWidth={3} x1="501" y1={548.5+AP_API*52.5} x2="670" y2={548.5+AP_API*52.5}/>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
            <clipPath id='BankClip' >
                <rect x={250} y={100} width={670} height={750} fill='black' />
            </clipPath>
            <g clipPath='url(#BankClip)' transform={`translate(0 -10)`}>
                <g transform={`rotate(${roll}, 585, 550)`}>
                    <g transform={`translate(-54, 113) `}>
                        <polygon points='625,85 640,44 655,85' className='readouts' strokeWidth={3} fill='none'/>
                    </g>
                </g>
            </g>

        </g>
    )
};
