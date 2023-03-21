import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const Glideslope = () => {
    const [galt] = useSimVar('PLANE ALT ABOVE GROUND', 'feet')
    const [FL] = useSimVar('AUTOPILOT ALTITUDE LOCK VAR', 'feet')
    const [glide] = useSimVar('NAV GLIDE SLOPE ERROR', 'degrees')
    const [local] = useSimVar('NAV LOCALIZER', 'degrees')
    const [heading] = useSimVar('PLANE HEADING DEGREES TRUE', 'degrees')
    const [APPRMode] = useSimVar('A:AUTOPILOT APPROACH ARM', 'bool')

    var glide2: number = glide;
    var loc2: number = local

    if (glide > 14) {
        var glide2 = 14
    } else if (glide < -14) {
        var glide2 = -14
    }
    loc2 = heading - loc2
    if (loc2 > 14) {
        var loc2 = 14
    } else if (loc2 < -14) {
        var loc2 = -14
    }


    return(
        <g visibility={APPRMode ? 'visible' : 'hidden'} >
            <g transform={`translate(127, 66), scale(0.7)`}>
                <g transform={`translate(0, ${-glide2*15.5})`}>
                    <g transform={`translate(1165.5, 521), rotate(45)`}>
                        <rect x={0} y={0} width={35} height={35} className='readouts' strokeWidth={5}/>
                    </g>
                </g>
                <g>
                    <text x={1134} y={413} fontSize={110} fill='white'className='degrees'>°</text>
                    <text x={1134} y={513} fontSize={110} fill='white' className='degrees'>°</text>
                    <text x={1134} y={713} fontSize={110} fill='white' className='degrees'>°</text>
                    <text x={1134} y={813} fontSize={110} fill='white' className='degrees'>°</text>
                    
                    <rect x={1148} y={535} width={35} height={22} className='readouts' strokeWidth={5}/>
                </g>
            </g>

            <g transform={`translate(127, 310), scale(0.7)`}>
                <g transform={`translate(-401, -185) rotate(90, 800, 800)`}>
                    <text x={1134} y={420} fontSize={110} fill='white' className='degrees'>°</text>
                    <text x={1134} y={520} fontSize={110} fill='white' className='degrees'>°</text>
                    <text x={1134} y={713} fontSize={110} fill='white' className='degrees'>°</text>
                    <text x={1134} y={813} fontSize={110} fill='white' className='degrees'>°</text>

                    <rect x={1148} y={533} width={35} height={22} className='readouts' strokeWidth={5}/>
                </g>
                <g transform={`translate(${(-loc2*15.5)}, 0)`}>
                    <g transform={`translate(644, 950), rotate(45)`}>
                        <rect x={0} y={0} width={35} height={35} className='readouts' strokeWidth={5}/>
                    </g>
                </g>
            </g>

            
        </g>
    )
};
