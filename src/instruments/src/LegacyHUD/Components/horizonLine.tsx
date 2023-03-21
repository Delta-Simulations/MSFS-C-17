import React from 'react';

export const HorizonLine = (props) => {
 
    return(
        <g>
            <g transform={`translate(0 ${props.height}) `}>
                <rect x={670} y={0} width={30} height={3} className='textAlert'/>
                <rect x={712} y={0} width={30} height={3} className='textAlert'/>
                <rect x={753} y={0} width={30} height={3} className='textAlert'/>
                <rect x={795} y={0} width={40} height={3} className='textAlert'/>
                <rect x={832} y={-17} width={3} height={17} className='textAlert'/>
                
                <rect x={470} y={0} width={30} height={3} className='textAlert'/>
                <rect x={429} y={0} width={30} height={3} className='textAlert'/>
                <rect x={388} y={0} width={30} height={3} className='textAlert'/>
                <rect x={336} y={0} width={40} height={3} className='textAlert'/>
                <rect x={336} y={-17} width={3} height={17} className='textAlert'/>

                <text x={318} y={12} fontSize={30} fill="white" textAnchor="middle">{props.label}</text>
                <text x={855} y={12} fontSize={30} fill="white" textAnchor="middle">{props.label}</text>
            </g>
        </g>
    )
};
