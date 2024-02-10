import React, { FC } from 'react';
import { render } from "../Hooks/index";
import { useSimVar } from '../Hooks/simVars';
import "./style.scss";
import { Stationary } from './Components/Stationary';
import { Altitude } from './Components/Altitude';
import { FlightDirector } from './Components/flightDirector';
import { Glideslope } from './Components/Glideslope';
import { Annunciations } from './Components/Annunciations';
import { FPV2 } from './Components/FlightPathVector';
import { Horizon } from './Components/horizon';
import { HUDPower } from '../Common/circuit';


interface ElectricityProps {
    circuit: string | number;
}

const Electricity: FC<ElectricityProps> = ({ circuit, children }) => {
    const [isPowerOn] = useSimVar(`CIRCUIT ON:${circuit}`, "Bool");

    if (!isPowerOn) return null;

    return <div>{children}</div>;
};


const HUD = () => {
    //const [altimeterHG] = useSimVar('KOHLSMAN SETTING HG', 'inHg');
    //const [altimeterMB] = useSimVar('KOHLSMAN SETTING MB', 'millibars');
    //0 = HG, 1 = MB
    //const [altimeterUnit] = useSimVar('L:C17 ALTIMETER UNIT', 'enum');
    //const [isAltimeterSTD] = useSimVar('KOHLSMAN SETTING STD', 'bool');
    let [HUD_OVERLAY] = useSimVar('L:C17_HUDDEBUG', 'bool');
    let [HUD_TEST_MODE] = useSimVar('L:C17_HUD_TEST', 'bool');

    return (
        <Electricity circuit='81'>
            <HUDPower localVar="C17_HUD_DISABLE">
                <svg viewBox='0 0 1170 1280'>
                    <rect x={0} y={0} width={1170} height={1280} fill='#00000' />



                    <Altitude />
                    <Stationary />
                    <FlightDirector />
                    <Horizon />
                    <FPV2 />
                    <Glideslope />


                    <rect visibility={HUD_TEST_MODE ? 'visible' : 'hidden'} x={0} y={0} width={1170} height={1280} fill='#00000' />
                    <g visibility={HUD_TEST_MODE ? 'visible' : 'hidden'} >
                        <line className="a" x1="0" y1="0" x2="1170" y2="1280" />
                        <line className="a" x1="1170" y1="0" x2="0" y2="1280" />
                        <line className="a" x1="0" y1="640" x2="1170" y2="640" />
                        <g transform={`translate(0, 0), scale(0.88)`}>
                <path d="M722 6H1192.5L1318 131.5M722 1435.5H1192.5L1318 1310M724 6H131.5L6 131M722.5 1436H131.5L6 1310" className="a2" stroke-width="5"/>
                <path d="M1318.5 131V1311M5.49994 131L5.49999 1311" className="a2" stroke-width="5" stroke-dasharray="55 15"/>
            </g>
                    </g>

                    <image visibility={HUD_OVERLAY ? 'visible' : 'hidden'} xlinkHref="/Images/HUD2 - Copy.jpg" height={1280} x={-0} y={0} opacity={0.2} />


                </svg>
            </HUDPower>
        </Electricity>
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


render(<HUD />)
