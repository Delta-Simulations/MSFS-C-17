import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const RadioDisp = () => {

    let [HUD_OVERLAY] = useSimVar('L:C17_HUDDEBUG', 'bool');
    let [KHz_tune] = useSimVar('L:C17_KHz_Tune', 'bool');
    let [SQL_active] = useSimVar('L:C17_SQL_active', 'bool');
    let [GRD_active] = useSimVar('L:C17_GRD_active', 'bool');
    let [Active_COM] = useSimVar('L:C17_Nav_System_Active', 'enum');
    let [NAV_Secured] = useSimVar('L:C17_Nav_System_Secured', 'enum');
    let [COM1_Active_Freq] = useSimVar('A:COM ACTIVE FREQUENCY:1', 'Megahertz');
    let [COM2_Active_Freq] = useSimVar('A:COM ACTIVE FREQUENCY:2', 'Megahertz');
    let [COM1_Stby_Freq] = useSimVar('A:COM STANDBY FREQUENCY:1', 'Megahertz');
    let [COM2_Stby_Freq] = useSimVar('A:COM STANDBY FREQUENCY:2', 'Megahertz')

    let [NAV1_Active_Freq] = useSimVar('A:NAV ACTIVE FREQUENCY:1', 'Megahertz');
    let [NAV2_Active_Freq] = useSimVar('A:NAV ACTIVE FREQUENCY:2', 'Megahertz');
    let [NAV1_Stby_Freq] = useSimVar('A:NAV STANDBY FREQUENCY:1', 'Megahertz');
    let [NAV2_Stby_Freq] = useSimVar('A:NAV STANDBY FREQUENCY:2', 'Megahertz')

    let [Tacan_Active_Freq] = useSimVar('A:TACAN ACTIVE CHANNEL:1', 'number');
    let [Tacan_Active_Mode] = useSimVar('A:TACAN ACTIVE MODE:1', 'Bool');
    let [Tacan_Stby_Freq] = useSimVar('A:TACAN STANDBY CHANNEL:1', 'number');
    let [Tacan_Stby_Mode] = useSimVar('A:TACAN STANDBY MODE:1', 'Bool');

    let [ADF_Active_Freq] = useSimVar('A:ADF ACTIVE FREQUENCY:1', 'Megahertz');
    let [ADF_Stby_Freq] = useSimVar('A:ADF STANDBY FREQUENCY:1', 'Megahertz');

    let [Ident_Active] = useSimVar('A:TRANSPONDER IDENT:1', 'bool');
    let [Ident_Code] = useSimVar('A:TRANSPONDER CODE:1', 'enum');

   
    let DispActiveFreq : string = "----";
    let DispStbyFreq : string = "-INOP-" ;
    let DispMode : string;
    switch (Active_COM) {
    case 1:
        DispMode = "COM1";
        DispActiveFreq = (Math.round(COM1_Active_Freq*1000)/1000).toFixed(3);
        DispStbyFreq = (Math.round(COM1_Stby_Freq*1000)/1000).toFixed(3);
        break;
    case 2:
        DispMode = "COM2";
        DispActiveFreq = (Math.round(COM2_Active_Freq*1000)/1000).toFixed(3);
        DispStbyFreq = (Math.round(COM2_Stby_Freq*1000)/1000).toFixed(3);
        break;
    case 3:
        DispMode = "UHF";
        break;
    case 4:
        DispMode = "VHF";
        break;
    case 5:
        DispMode = "HF1";
        break;
    case 6:
        DispMode = "HF2";
        break;
    case 7:
        DispMode = "NAV1";
        DispActiveFreq = (Math.round(NAV1_Active_Freq*1000)/1000).toFixed(3);
        DispStbyFreq = (Math.round(NAV1_Stby_Freq*1000)/1000).toFixed(3);
        break;
    case 8:
        DispMode = "NAV2";
        DispActiveFreq = (Math.round(NAV2_Active_Freq*1000)/1000).toFixed(3);
        DispStbyFreq = (Math.round(NAV2_Stby_Freq*1000)/1000).toFixed(3);
        break;
    case 9:
        DispMode = "TAC";
        DispActiveFreq = `${Tacan_Active_Freq}${Tacan_Active_Mode ? "Y" : "X"}`;
        DispStbyFreq = `${Tacan_Stby_Freq}${Tacan_Stby_Mode ? "Y" : "X"}`;
        break;
    case 10:
        DispMode = "LF-ADF";
        DispActiveFreq = `${ADF_Active_Freq}`;
        DispStbyFreq = `${ADF_Stby_Freq}`;
        break;
    case 11:
        DispMode = "IFF";
        DispActiveFreq = `${Ident_Code}`;
        DispStbyFreq = ``;
        break;
      default:
        DispMode = "";
        DispActiveFreq = ""
        DispStbyFreq = ""
        break;
    }

    let SecureComms: string;
    switch (NAV_Secured) {
    case 1:
        SecureComms = "SC-";
        break;
    case 2:
        SecureComms = "SC-P";
        break;
    case 3:
        SecureComms = "SC-R";
        break;
    case 4:
        SecureComms = "SC-T";
        break;
      default:
        SecureComms = "";
        break;
    }


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


            <text visibility={Ident_Active == 1  ? 'visible' : 'hidden'} x={76} y={963} fontSize={19} fill='#00EE00' className='Radio' textAnchor="start">IDENT</text>
            <text x={197} y={963} fontSize={19} fill='#00EE00' className='Radio' textAnchor="start">TEMPEST</text>

            <text x={138} y={963} fontSize={19} fill='#00EE00' className='Radio' textAnchor="start">{Ident_Code}</text>


            <text x={73} y={830} fontSize={34} fill='rgb(245, 255, 137)' className='Radio' textAnchor="start">{DispMode}</text>
            <text x={193} y={830} fontSize={34} fill='rgb(245, 255, 137)' className='Radio' textAnchor="start">{SecureComms}</text>
            <text x={ Active_COM === 9 ? 260 : 146} y={932} fontSize={34} fill='rgb(245, 255, 137)' className='Radio' textAnchor={ Active_COM === 9 ? 'end' : 'start'}>{DispActiveFreq}</text>
            <text x={ Active_COM === 9 ? 110 : 52} y={925} fontSize={22} fill='rgb(245, 255, 137)' className='Radio' textAnchor={ Active_COM === 9 ? 'end' : 'start'}>{DispStbyFreq}</text>


            <text visibility={Active_COM <= 6 && 0 <Active_COM ? 'visible' : 'hidden'} x={36} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="Middle">MODE</text>
            <text visibility={Active_COM === 1 || Active_COM === 2 ? 'visible' : 'hidden'} x={89} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="Middle">ECCM</text>
            <text visibility={Active_COM === 1 || Active_COM === 2 ? 'visible' : 'hidden'} x={142} y={1016} fontSize={18} fill='#00EE00' className='Radio' textAnchor="Middle">8.33</text>
            <rect visibility={(Active_COM === 1 || Active_COM === 2) && KHz_tune ? 'visible' : 'hidden'} x={119.1} y={1000} width={45} height={19} stroke='#00EE00' fill="none" stroke-width="2.5"/>
            <text visibility={Active_COM <= 6 && 0 <Active_COM ? 'visible' : 'hidden'} x={196} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="Middle">SQL</text>
            <rect visibility={(Active_COM <= 6 && 0 <Active_COM) && SQL_active ? 'visible' : 'hidden'} x={178} y={1000} width={37} height={19} stroke='#00EE00' fill="none" stroke-width="2.5"/>
            <text visibility={Active_COM <= 6 && 0 <Active_COM ? 'visible' : 'hidden'} x={303} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="Middle">GRD</text>
            <rect visibility={(Active_COM <= 6&& 0 <Active_COM ) && GRD_active ? 'visible' : 'hidden'} x={284.5} y={1000} width={37} height={19} stroke='#00EE00' fill="none" stroke-width="2.5"/>

            <text visibility={Active_COM === 3 ? 'visible' : 'hidden'} x={89} y={1016} fontSize={18} fill='#00EE00' className='Radio' textAnchor="Middle">DF</text>

            <text visibility={Active_COM === 5 || Active_COM === 6 ? 'visible' : 'hidden'} x={85} y={1016} fontSize={18} fill='#00EE00' className='Radio' textAnchor="Middle">MUTE</text>
            <text visibility={Active_COM === 5 || Active_COM === 6 ? 'visible' : 'hidden'} x={143} y={1016} fontSize={18} fill='#00EE00' className='Radio' textAnchor="Middle">SILENT</text>

            <text visibility={Active_COM === 7 || Active_COM === 8 ? 'visible' : 'hidden'} x={36} y={1016} fontSize={18} fill='#00EE00' className='Radio' textAnchor="Middle">V/L</text>
            <text visibility={Active_COM === 7 || Active_COM === 8 ? 'visible' : 'hidden'} x={89} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="Middle">MLS</text>

            <text visibility={Active_COM === 10  ? 'visible' : 'hidden'} x={36} y={1016} fontSize={18} fill='#00EE00' className='Radio' textAnchor="Middle">ADF</text>
            <text visibility={Active_COM === 10  ? 'visible' : 'hidden'} x={89} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="Middle">ANT</text>


            <text visibility={Active_COM === 11  ? 'visible' : 'hidden'} x={36} y={1016} fontSize={18} fill='#00EE00' className='Radio' textAnchor="Middle">S/N</text>
            <text visibility={Active_COM === 11  ? 'visible' : 'hidden'} x={89} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="Middle">M3A</text>
            <text visibility={Active_COM === 11  ? 'visible' : 'hidden'} x={142} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="Middle">M1</text>
            <text visibility={Active_COM === 11  ? 'visible' : 'hidden'} x={303} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="Middle">EMER</text>


            <text x={250} y={1016} fontSize={19} fill='#00EE00' className='Radio' textAnchor="Middle"></text>

            <g visibility={ Active_COM === 9 ? 'visible' : 'hidden'} >
                <text x={89} y={1016} fontSize={18} fill='#00EE00' className='Radio' textAnchor="Middle">REC</text>
                <text x={142} y={1016} fontSize={18} fill='#00EE00' className='Radio' textAnchor="Middle">T/R</text>
                <text x={196} y={1016} fontSize={18} fill='#00EE00' className='Radio' textAnchor="Middle">A/REC</text>
                <text x={250} y={1016} fontSize={18} fill='#00EE00' className='Radio' textAnchor="Middle">AT/R</text>
            </g>



        </g>
    )
};
