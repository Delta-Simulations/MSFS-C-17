import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const WACAP = (props) => {

    var [WACAP_Test] = useSimVar('L:C17_WACAP_Test', 'bool');

    var [Park_brake] = useSimVar('A:Brake parking position','bool');

    const [Speed_brake] = useSimVar('A:Spoilers right position','bool');

    const [Landing_light] = useSimVar('A:Light landing','bool');

    const [Taxi_light] = useSimVar('A:Light taxi','bool');

    var [Fuel_quantity] = useSimVar('A:FUEL TOTAL QUANTITY','gallons');
    Fuel_quantity= Math.round(Fuel_quantity)

    const [Cargo_door] = useSimVar('L:DoorSwitch','enum');

   

    return(
        <g>
            {/* CENTER */}
            < text x={670} y={615} fontSize={30} visibility={(WACAP_Test||Park_brake) ? 'visible' : 'hidden'} fill='#FF0000' className='WAPanel' textAnchor="middle">PARK BRAKE</text>
            < text x={670} y={638} fontSize={30} visibility={(WACAP_Test||Landing_light) ? 'visible' : 'hidden'} fill='#FF0000' className='WAPanel' textAnchor="middle">LANDING LIGHT</text>
            < text x={670} y={661} fontSize={30} visibility={(WACAP_Test||Taxi_light) ? 'visible' : 'hidden'} fill='#FF0000' className='WAPanel' textAnchor="middle">TAXI LIGHT</text>
            < text x={670} y={684} fontSize={30} visibility={(WACAP_Test||Fuel_quantity<=12310)? 'visible' : 'hidden'} fill='#FF0000' className='WAPanel' textAnchor="middle">FUEL LOW</text>
            < text x={670} y={707} fontSize={30} visibility={(WACAP_Test||Speed_brake) ? 'visible' : 'hidden'} fill='#FF0000' className='WAPanel' textAnchor="middle">SPOILERS</text>

            < text x={670} y={730} fontSize={30} visibility={(WACAP_Test||Cargo_door) ? 'visible' : 'hidden'} fill='#CCFF33' className='WAPanel' textAnchor="middle">RAMP OPEN</text>


        </g>
    )
};
