import React, {FC} from 'react';
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
    const [HUD_OVERLAY] = useSimVar('L:C17_HUDDEBUG', 'bool');

    return(
        <Electricity circuit='81'>
            <HUDPower localVar="C17_HUD_DISABLE">
                <svg viewBox='0 0 1170 1280'>
                <rect x={0} y={0} width={1170} height={1280} fill='#00000'/>

                
                <Altitude />            
                <Stationary />
                <FlightDirector />
                <Horizon />
                <FPV2 />
                <Glideslope />


                <image visibility={HUD_OVERLAY ? 'visible' : 'hidden'} xlinkHref="/Images/HUD2 - Copy.jpg"  height={1280} x={-0} y={0} opacity={0.2}/>


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


render(<HUD/>)
