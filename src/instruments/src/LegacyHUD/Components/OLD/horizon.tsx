import React from 'react';
import { HorizonLine } from './horizonLine';
import { HorizonLine2 } from './horizonLine2';

import { useSimVar } from '../../Hooks/simVars';

export const Horizon = () => {

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

    {/*for (let i = 1; i < 10; i++) {
        let height2 = 548 - (i*165)
        const SpdMark = <HorizonLine2 height={height2}/>
        elements.push(SpdMark)
    }
    for (let i = 0; i < 9; i++) {
        let height2 = 548 + (i*165)
        const SpdMark = <HorizonLine2 height={height2}/>
        elements.push(SpdMark)
    */}

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
                            <g transform={`translate(0 ${-pitch * 52-90}) `}>
                                <g transform={`translate(0 0)`}>
                                    <g>
                                        <rect x={670} y={677} width={30} height={3} fill='#60FF5C'/>
                                        <rect x={712} y={677} width={30} height={3} fill='#60FF5C'/>
                                        <rect x={753} y={677} width={56} height={3} fill='#60FF5C'/>
                                        <rect x={806} y={660} width={3} height={17} fill='#60FF5C'/>
                                        
                                        <rect x={470} y={677} width={30} height={3} fill='#60FF5C'/>
                                        <rect x={429} y={677} width={30} height={3} fill='#60FF5C'/>
                                        <rect x={361} y={677} width={56} height={3} fill='#60FF5C'/>
                                        <rect x={361} y={660} width={3} height={17} fill='#60FF5C'/>

                                        <rect x={279} y={547} width={222} height={3} fill='#60FF5C'/>
                                        <rect x={670} y={547} width={222} height={3} fill='#60FF5C'/>

                                        <rect x={361} y={421} width={139} height={3} fill='#60FF5C'/>
                                        <rect x={361} y={421} width={3} height={17} fill='#60FF5C'/>
                                        <rect x={670} y={421} width={139} height={3} fill='#60FF5C'/>
                                        <rect x={806} y={421} width={3} height={17} fill='#60FF5C'/>

                                        {elements}
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    <g transform={`translate(-55 20)`}>
                        <g transform={`rotate(${roll}, 638, 550)`}>
                            <g transform={`translate(0, 84) `}>
                                <polygon points='620,130 640,103 660,130' stroke='#2CE832' strokeWidth={3} fill='black'/>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
















            {/*-140*/}
            {/*<g >
                <g transform={`translate(2 0)`}>
                    <polygon points='635,145 655,181 675,145' stroke='white' strokeWidth={3} fill='black'/>
                </g>

                <polygon points='585,148 592,187' stroke='white' strokeWidth={5} fill='black'/>
                <polygon points='517,170 530,202' stroke='white' strokeWidth={5} fill='black'/>
                <polygon points='435,170 470,229' stroke='white' strokeWidth={5} fill='black'/>
                <polygon points='370,261 393,286' stroke='white' strokeWidth={5} fill='black'/>
                <polygon points='305,345 335,360' stroke='white' strokeWidth={5} fill='black'/>

                <polygon points='725,148 718,187' stroke='white' strokeWidth={5} fill='black'/>
                <polygon points='793,170 780,202' stroke='white' strokeWidth={5} fill='black'/>
                <polygon points='875,170 840,229' stroke='white' strokeWidth={5} fill='black'/>
                <polygon points='940,261 917,286' stroke='white' strokeWidth={5} fill='black'/>
                <polygon points='1005,345 975,360' stroke='white' strokeWidth={5} fill='black'/>
            </g>*/}
            {/*<g transform={`translate(15 0) `}>
                <polygon points='460,610 640,545 820,610 760,610 640,570 520,610' fill='black' stroke='white' strokeWidth={4.0}/>
            </g>*/}
            {/*<g>
                <polygon points='813,606 681,607 681,650 696,650 696,619 813,619' fill='black' stroke='white' strokeWidth={2.0}/>
            </g>
            <g>
                <rect x={556.5} y={603.5} width={15} height={15} fill='black' stroke='white' strokeWidth={2.0}/>
            </g>*/}
        </g>
    )
};
