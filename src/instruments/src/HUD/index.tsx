import React from 'react';
import { render } from "../Hooks/index";
import { Horizon } from './Components/horizon';
import { Toga } from './Components/annunciation';
//import { VerticalSpeed } from './Components/verticalSpeed';
import { SpdIndicator } from './Components/speedIndicator';
import { Glideslope } from './Components/glideslope';


import "./style.scss";

import "../Common/pixels.scss";

import { useSimVar } from '../Hooks/simVars';
import { FlightDirector } from './Components/flightDirector';
import { Stationary } from './Components/Stationary';



const HUD = () => {
    return(
        <svg viewBox='0 0 1170 1280'>
            <div className="LcdOverlay" style={{ opacity: "0.2" }} />
            <rect x={0} y={0} width={1180} height={1280} fill='#00000'/>




            <Horizon />
            <SpdIndicator />
            {/*<AltitudeIndicator />*/}
            <Glideslope />
            <FlightDirector />
            <Stationary />

            {/*<VerticalSpeed />*/}
            <image xlinkHref="/Images/HUD2.png"  height={1280} x={-0} y={0} opacity={0.1}/>

        </svg>
    )
};

type TapeProps = {
    x: number,
    y: number,
    fontSize: number,
    valueAmount: number,
    valueMinimum: number,
    valueMultiple: number,
    valueSpacing: number,
    markAmount: number,
    markSpacing: number,
    markDistance: number,
    markYOffset: number,
    markWidth: number,
};
export const Tape = ({ x, y, fontSize, valueAmount, valueMinimum, valueMultiple, valueSpacing, markAmount, markSpacing, markDistance, markYOffset, markWidth }: TapeProps) => {
    return (
        <g>
            {[...Array(valueAmount)].map((_, index) => index * valueMultiple >= valueMinimum && <text x={x} y={y - index * valueSpacing} fontSize={fontSize} fill='white' textAnchor='middle'>{index * valueMultiple < 100 ? index * valueMultiple < 10 ? `00${index * valueMultiple}` : `0${index * valueMultiple}` : index * valueMultiple}</text>)}
            {[...Array(markAmount)].map((_, index) => index * valueMultiple > valueMinimum && <rect x={x + markDistance} y={(y - fontSize / 2 - index * markSpacing) + markYOffset} width={markWidth} height={3.5} fill='white' />)}
        </g>
    );
};


render(<HUD/>)
