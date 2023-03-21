import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const RadioDisp = (props) => {

    var [WACAP_Test] = useSimVar('L:C17_WACAP_Test', 'bool');
    const [HUD_OVERLAY] = useSimVar('L:HUD_OVERLAY', 'bool');
    const [KHz_tune] = useSimVar('L:C17_KHz_Tune', 'bool');
    const [SQL_active] = useSimVar('L:C17_SQL_active', 'bool');

    

    return(
        <g>
            <image visibility={HUD_OVERLAY ? 'visible' : 'hidden'} x={3} y={754} xlinkHref="/Images/RadioStack.png" height={276} opacity={0.7}/>

            <rect  x={145} y={855} width={143.5} height={83} className='YllwRect' fill="none" stroke-width="2.5"/>

            <text x={14} y={813} fontSize={19} fill='#00EE00' className='Radio' textAnchor="start">COM</text>
            <text x={14} y={855} fontSize={19} fill='#00EE00' className='Radio' textAnchor="start">UHF</text>
            <text x={14} y={895} fontSize={19} fill='#00EE00' className='Radio' textAnchor="start">VHF</text>
            <text x={14} y={938} fontSize={19} fill='#00EE00' className='Radio' textAnchor="start">HF</text>

            <text x={324} y={813} fontSize={19} fill='#00EE00' className='Radio' textAnchor="end">NAV</text>
            <text x={324} y={855} fontSize={19} fill='#00EE00' className='Radio' textAnchor="end">TAC</text>
            <text x={324} y={895} fontSize={19} fill='#00EE00' className='Radio' textAnchor="end">ADF</text>
            <text x={324} y={938} fontSize={19} fill='#00EE00' className='Radio' textAnchor="end">IFF</text>
            <text x={198} y={902} fontSize={19} fill='#00EE00' className='Radio' textAnchor="start">ACT</text>
            <text x={81} y={902} fontSize={19} fill='#00EE00' className='Radio' textAnchor="start">STBY</text>
            <text x={15} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="start">MODE</text>
            <text x={65} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="start">ECCM</text>

            <text x={120} y={1016} fontSize={18} fill='#00EE00' className='Radio' textAnchor="start">8.33</text>
            <rect visibility={KHz_tune ? 'visible' : 'hidden'} x={119.1} y={1000} width={45} height={19} stroke='#00EE00' fill="none" stroke-width="2.5"/>

            <text x={179} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="start">SQL</text>
            <rect visibility={SQL_active ? 'visible' : 'hidden'} x={178} y={1000} width={37} height={19} stroke='#00EE00' fill="none" stroke-width="2.5"/>



        </g>
    )
};
