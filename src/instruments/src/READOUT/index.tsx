import React, {FC} from 'react';
import { render } from '../Hooks/index';
import { useSimVar } from '../Hooks/simVars';
import { Ap_Disp } from './Components/Ap_Disp';
import './style.scss';
import { VertSpeed } from './Components/VSpeed';
import { Clock } from './Components/Clock';
import { WACAP } from './Components/WACAP';
import { RadioDisp } from './Components/RadioDisp';
import { StbyEngDisp } from './Components/StbyEngDisp';

interface ElectricityProps {
    circuit: string | number;
  }
  
    const Electricity: FC<ElectricityProps> = ({ circuit, children }) => {
    const [isPowerOn] = useSimVar(`CIRCUIT ON:${circuit}`, "Bool");
  
    if (!isPowerOn) return null;
  
    return <div>{children}</div>;
};

const AP = () => {

    const [HUD_OVERLAY] = useSimVar('L:C17_HUDDEBUG', 'bool');


    return(
        <Electricity circuit='81'>
            <svg viewBox='0 0 1024 1024'>
                <rect x={0} y={0} width={1024} height={1024} fill='black'/>
                <g>   
                                      
                    <image visibility={HUD_OVERLAY ? 'visible' : 'hidden'} x={644} y={803} xlinkHref="/Images/stg.png" height={220} opacity={0.7}/>
                    
                    <Ap_Disp />
                    <WACAP />
                    <StbyEngDisp />
                    <RadioDisp />
                    <image visibility={HUD_OVERLAY ? 'visible' : 'hidden'} x={0} y={0} xlinkHref="/Images/Dispbackround.png" height={1024} width={1024} opacity={0.7}/>

                </g>
            </svg>
        </Electricity>
    )
    
};

render(<AP/>);
