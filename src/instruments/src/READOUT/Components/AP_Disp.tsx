import React, { useEffect } from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const Ap_Disp = (props) => {

    var [AP_ALT] = useSimVar('A:Autopilot altitude lock var', 'feet');
    AP_ALT = Math.floor(AP_ALT / 5) * 5;

    const [AP_SPD] = useSimVar('A:Autopilot airspeed hold var','knots');
    var [AP_HDG] = useSimVar('A:Autopilot heading lock dir', 'degrees');
    AP_HDG = Math.floor(AP_HDG)

    let [AP_VertSpd] = useSimVar('AUTOPILOT VERTICAL HOLD VAR', 'feet per minute');
    useEffect(() => console.log(AP_VertSpd), [AP_VertSpd])

    const [AP_API] = useSimVar('L:C17_API', 'enum');
    var [AFCS_Color] = useSimVar('L:C17_CPIT_ILLUM_MODE', 'bool');

    var [Tot_Fuel] = useSimVar('A:FUEL TOTAL QUANTITY WEIGHT', 'pounds');
    Tot_Fuel = Math.floor(Tot_Fuel / 5) * 5;
    var [Fuel_1] = useSimVar('A:FUELSYSTEM TANK WEIGHT:1', 'pounds');
    var [Fuel_2] = useSimVar('A:FUELSYSTEM TANK WEIGHT:2', 'pounds');
    Fuel_1 = Math.floor(Fuel_1 / 5) * 5;
    Fuel_2 = Math.floor(Fuel_2 / 5) * 5;
    var [Fuel_3] = useSimVar('A:FUELSYSTEM TANK WEIGHT:3', 'pounds');
    var [Fuel_4] = useSimVar('A:FUELSYSTEM TANK WEIGHT:4', 'pounds');
    Fuel_3 = Math.floor(Fuel_3 / 5) * 5;
    Fuel_4 = Math.floor(Fuel_4 / 5) * 5;

    var [APU_PCT] = useSimVar('A:APU PCT RPM', 'percent');
    APU_PCT = Math.round(APU_PCT);
    let APU_EGT: number = APU_PCT * 4

    const [BLEED_ENG1] = useSimVar('A:TURB ENG BLEED AIR:1', 'psi');
    const [BLEED_ENG2] = useSimVar('A:TURB ENG BLEED AIR:2', 'psi');
    let BLEED_LEFTWING: number = Math.round(BLEED_ENG1+BLEED_ENG2);
    const [BLEED_ENG3] = useSimVar('A:TURB ENG BLEED AIR:3', 'psi');
    const [BLEED_ENG4] = useSimVar('A:TURB ENG BLEED AIR:4', 'psi');
    const [BLEED_APU] = useSimVar('A:APU BLEED PRESSURE RECEIVED BY ENGINE', 'psi');
    let BLEED_RIGHTWING: number = Math.round(BLEED_ENG3+BLEED_ENG4+BLEED_APU);

    var [HYDPRESS_ENG1] = useSimVar('ENG HYDRAULIC PRESSURE:1', 'psf');
    HYDPRESS_ENG1 = Math.floor(HYDPRESS_ENG1/50)*50;
    var [HYDPRESS_ENG2] = useSimVar('ENG HYDRAULIC PRESSURE:2', 'psf');
    HYDPRESS_ENG2 = Math.floor(HYDPRESS_ENG2/50)*50;
    var [HYDPRESS_ENG3] = useSimVar('ENG HYDRAULIC PRESSURE:3', 'psf');
    HYDPRESS_ENG3 = Math.floor(HYDPRESS_ENG3/50)*50;
    var [HYDPRESS_ENG4] = useSimVar('ENG HYDRAULIC PRESSURE:4', 'psf');
    HYDPRESS_ENG4 = Math.floor(HYDPRESS_ENG4/50)*50;

    return(
        <g>
            <rect  x={0} y={0} width={1020} height={(AFCS_Color) ? 500 : 580} className='OHDispBackrnd' fill="none" stroke-width="2.5"/>

            <rect  x={45} y={670} width={250} height={90} visibility={(AFCS_Color) ? 'hidden' : 'visible'} className='OHDispBackrnd' fill="none" stroke-width="2.5"/>


            <text x={205} y={48} fontSize={32} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>
            <text x={485} y={48} fontSize={32} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>

            <text x={319} y={115} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>
            <text x={406} y={115} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>

            <text x={366} y={181} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>
            <text x={261} y={181} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>
            <text x={467} y={181} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>

            <text x={366} y={235} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>
            <text x={261} y={235} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>
            <text x={467} y={235} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>

            <text x={152} y={302} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>
            <text x={225} y={302} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>
            <text x={320} y={302} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>
            <text x={395} y={302} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>
            <text x={504} y={300} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>
            <text x={577} y={300} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>

            <text x={678} y={299} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>
            <text x={746} y={299} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">---</text>

            <text x={325} y={425} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">----</text>
            <text x={410} y={425} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">----</text>
            <text x={532} y={425} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">----</text>
            <text x={646} y={425} fontSize={31} fill='#00EE00' className='OHPNL' textAnchor="end">------</text>


            <text x={145} y={448} fontSize={32} fill='#00EE00' className='OHPNL' textAnchor="end">{APU_EGT}</text>
            <text x={145} y={408} fontSize={32} fill='#00EE00' className='OHPNL' textAnchor="end">{APU_PCT}</text>
            <text x={300} y={482} fontSize={35} className='OHPNL' textAnchor="end">{Fuel_1}</text>
            <text x={405} y={482} fontSize={35} className='OHPNL' textAnchor="end">{Fuel_2}</text>
            <text x={535} y={482} fontSize={35} className='OHPNL' textAnchor="end">{Fuel_3}</text>
            <text x={637} y={482} fontSize={35} className='OHPNL' textAnchor="end">{Fuel_4}</text>


            <text x={45} y={555} fontSize={40} fill={(AFCS_Color) ? 'white' : '#00EE00'} className='FrontPNL' textAnchor="end">{AP_API}</text>
            <text x={180} y={555} fontSize={40} fill={(AFCS_Color) ? 'white' : '#00EE00'} className='FrontPNL' textAnchor="end">{AP_SPD}</text>

            <text x={320} y={555} fontSize={40} fill={(AFCS_Color) ? 'white' : '#00EE00'} className='FrontPNL' textAnchor="end">{AP_HDG}</text>

            <text x={470} y={555} fontSize={40} fill={(AFCS_Color) ? 'white' : '#00EE00'} className='FrontPNL' textAnchor="end">{AP_VertSpd}</text>

            <text x={618} y={555} fontSize={40} fill={(AFCS_Color) ? 'white' : '#00EE00'} className='FrontPNL' textAnchor="end">{AP_ALT}</text>

            <text x={265} y={735} fontSize={65} fill={(AFCS_Color) ? 'white' : '#00EE00'} className='FrontPNL' textAnchor="end">{Tot_Fuel}</text>





        </g>
    )
};
