import React, { useEffect, useState } from 'react'
import { useSimVar } from '../../Hooks/simVars'

export const Ap_Disp = () => {
  let [IAS_SPD] = useSimVar('A:Autopilot airspeed hold var', 'knots')
  let [MACH_SPD] = useSimVar('A:AUTOPILOT MACH HOLD VAR', 'number')
  let [AT_MODE] = useSimVar('L:C17_MACHIAS', 'bool')
  let [AT_CMMD_MODE] = useSimVar('L:C17_THRPCH', 'bool')
  const Disp_AT_CMMD = AT_CMMD_MODE ? 'PCH' : 'THR'

  IAS_SPD = Math.round(IAS_SPD)
  MACH_SPD = Math.round(MACH_SPD * 100) / 100
  MACH_SPD = MACH_SPD.toFixed(2)
  let AP_SPD = AT_MODE ? MACH_SPD : IAS_SPD
  let [AP_HDG] = useSimVar('A:Autopilot heading lock dir', 'degrees')
  AP_HDG = Math.round(AP_HDG)

  let [Fuel_Disp_Mode] = useSimVar('L:C17_Fuel_Qty_Sel', 'bool')
  const [fuelDisplayMode, setFuelDisplayMode] = useState('normal') // 'normal' or '8888'

  // Effect to update fuel display mode when C17_Fuel_Qty_Sel changes
  useEffect(() => {
    setFuelDisplayMode('8888')

    // Reset the display mode to 'normal' after 5 seconds
    const timer = setTimeout(() => {
      setFuelDisplayMode('normal')
    }, 5000) // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer) // Clear the timer on component unmount or when C17_Fuel_Qty_Sel changes again
  }, [Fuel_Disp_Mode])

  let [AP_API] = useSimVar('L:C17_API', 'enum')
  AP_API = Math.round(AP_API * 10) / 10
  let [AFCS_Color] = useSimVar('L:C17_CPIT_ILLUM_MODE', 'bool')
  let [Tot_Fuel] = useSimVar('A:FUEL TOTAL QUANTITY WEIGHT', 'pounds')
  Tot_Fuel = Math.round(Tot_Fuel / 5) * 5
  let [Fuel_1] = useSimVar('A:FUELSYSTEM TANK WEIGHT:1', 'pounds')
  let [Fuel_2] = useSimVar('A:FUELSYSTEM TANK WEIGHT:2', 'pounds')
  Fuel_1 = Math.round(Fuel_1 / 5) * 5
  Fuel_2 = Math.round(Fuel_2 / 5) * 5
  let [Fuel_3] = useSimVar('A:FUELSYSTEM TANK WEIGHT:3', 'pounds')
  let [Fuel_4] = useSimVar('A:FUELSYSTEM TANK WEIGHT:4', 'pounds')
  Fuel_3 = Math.round(Fuel_3 / 5) * 5
  Fuel_4 = Math.round(Fuel_4 / 5) * 5
  let [APU_PCT] = useSimVar('A:APU PCT RPM', 'percent')
  APU_PCT = Math.round(APU_PCT)
  let APU_EGT: number = APU_PCT * 4
  // const [BLEED_ENG1] = useSimVar('A:TURB ENG BLEED AIR:1', 'psi');
  // const [BLEED_ENG2] = useSimVar('A:TURB ENG BLEED AIR:2', 'psi');
  // let BLEED_LEFTWING: number = Math.round(BLEED_ENG1+BLEED_ENG2);
  // const [BLEED_ENG3] = useSimVar('A:TURB ENG BLEED AIR:3', 'psi');
  // const [BLEED_ENG4] = useSimVar('A:TURB ENG BLEED AIR:4', 'psi');
  // const [BLEED_APU] = useSimVar('A:APU BLEED PRESSURE RECEIVED BY ENGINE', 'psi');
  // let BLEED_RIGHTWING: number = Math.round(BLEED_ENG3+BLEED_ENG4+BLEED_APU);

  // var [HYDPRESS_ENG1] = useSimVar('ENG HYDRAULIC PRESSURE:1', 'psf');
  // HYDPRESS_ENG1 = Math.round(HYDPRESS_ENG1/50)*50;
  // var [HYDPRESS_ENG2] = useSimVar('ENG HYDRAULIC PRESSURE:2', 'psf');
  // HYDPRESS_ENG2 = Math.round(HYDPRESS_ENG2/50)*50;
  // var [HYDPRESS_ENG3] = useSimVar('ENG HYDRAULIC PRESSURE:3', 'psf');
  // HYDPRESS_ENG3 = Math.round(HYDPRESS_ENG3/50)*50;
  // var [HYDPRESS_ENG4] = useSimVar('ENG HYDRAULIC PRESSURE:4', 'psf');
  // HYDPRESS_ENG4 = Math.round(HYDPRESS_ENG4/50)*50;

  let [AP_ALT] = useSimVar('A:Autopilot altitude lock var', 'feet')
  AP_ALT = Math.round(AP_ALT / 5) * 5
  const formattedAlt = AP_ALT.toFixed(0) // format as string
  const AP_ALT_THOU = formattedAlt < 10000 ? formattedAlt.slice(0, 1) : formattedAlt.slice(0, 2) // get first 1 or 2 digits
  const AP_ALT_HUND = formattedAlt.slice(-3) // get last 3 digits

  let [AP_VertSpd] = useSimVar('AUTOPILOT VERTICAL HOLD VAR', 'feet per minute')
  const AP_VS_SIGN = AP_VertSpd !== 0 ? (AP_VertSpd < 0 ? '-' : '+') : ''
  AP_VertSpd = Math.abs(Math.round(AP_VertSpd / 5) * 5)
  const formattedVS = AP_VertSpd.toFixed(0) // format as string
  const AP_VS_THOU = formattedVS < 10000 ? formattedVS.slice(0, 1) : formattedVS.slice(0, 2) // get first 1 or 2 digits
  const AP_VS_HUND = formattedVS.slice(-3) // get last 3 digits

  return (
    <g>
      <rect
        x={0}
        y={0}
        width={1020}
        height={AFCS_Color ? 500 : 580}
        className="OHDispBackrnd"
        fill="none"
        stroke-width="2.5"
      />
      <rect
        x={45}
        y={670}
        width={250}
        height={90}
        visibility={AFCS_Color ? 'hidden' : 'visible'}
        className="OHDispBackrnd"
        fill="none"
        stroke-width="2.5"
      />
      <text x={205} y={48} fontSize={32} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={485} y={48} fontSize={32} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={319} y={115} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={406} y={115} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={366} y={181} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={261} y={181} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={467} y={181} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={366} y={235} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={261} y={235} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={467} y={235} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={152} y={302} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={225} y={302} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={320} y={302} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={395} y={302} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={504} y={300} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={577} y={300} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={678} y={299} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={746} y={299} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ---
      </text>
      <text x={325} y={425} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ----
      </text>
      <text x={410} y={425} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ----
      </text>
      <text x={532} y={425} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ----
      </text>
      <text x={646} y={425} fontSize={31} fill="#00EE00" className="OHPNL" textAnchor="end">
        ------
      </text>

      <text x={145} y={448} fontSize={32} fill="#00EE00" className="OHPNL" textAnchor="end">
        {APU_EGT}
      </text>
      <text x={145} y={408} fontSize={32} fill="#00EE00" className="OHPNL" textAnchor="end">
        {APU_PCT}
      </text>
      <text x={305} y={482} fontSize={35} className="OHPNL" textAnchor="end">
        {fuelDisplayMode === 'normal' ? Fuel_1 : '88888'}
      </text>
      <text x={410} y={482} fontSize={35} className="OHPNL" textAnchor="end">
        {fuelDisplayMode === 'normal' ? Fuel_2 : '88888'}
      </text>
      <text x={540} y={482} fontSize={35} className="OHPNL" textAnchor="end">
        {fuelDisplayMode === 'normal' ? Fuel_3 : '88888'}
      </text>
      <text x={642} y={482} fontSize={35} className="OHPNL" textAnchor="end">
        {fuelDisplayMode === 'normal' ? Fuel_4 : '88888'}
      </text>

      <text
        x={64}
        y={555}
        fontSize={38}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        {AP_API}
      </text>
      <text
        x={212}
        y={555}
        fontSize={40}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        {AP_SPD}
        {Disp_AT_CMMD}
      </text>

      <text
        x={329}
        y={555}
        fontSize={40}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        {AP_HDG}M
      </text>

      <text
        visibility={AP_VertSpd < 10000 ? 'visible' : 'hidden'}
        x={406}
        y={553}
        fontSize={30}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        {AP_VS_SIGN}
      </text>

      <text
        visibility={AP_VertSpd < 1000 ? 'visible' : 'hidden'}
        x={446}
        y={552}
        fontSize={27}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        -
      </text>
      <text
        visibility={AP_VertSpd < 1000 ? 'visible' : 'hidden'}
        x={446}
        y={563}
        fontSize={27}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        -
      </text>
      <text
        visibility={AP_VertSpd < 10000 ? 'visible' : 'hidden'}
        x={426}
        y={552}
        fontSize={27}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        -
      </text>
      <text
        visibility={AP_VertSpd < 10000 ? 'visible' : 'hidden'}
        x={426}
        y={563}
        fontSize={27}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        -
      </text>
      <text
        x={448}
        y={555}
        fontSize={40}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        {AP_VertSpd < 999 ? '' : AP_VS_THOU}
      </text>
      <text
        x={488}
        y={546}
        fontSize={27}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        {AP_VS_HUND}
      </text>

      <text
        x={578}
        y={555}
        fontSize={40}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        {AP_ALT < 999 ? '' : AP_ALT_THOU}
      </text>
      <text
        x={618}
        y={546}
        fontSize={27}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        {AP_ALT_HUND}
      </text>
      <text
        visibility={AP_ALT < 10000 ? 'visible' : 'hidden'}
        x={556}
        y={552}
        fontSize={27}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        -
      </text>
      <text
        visibility={AP_ALT < 10000 ? 'visible' : 'hidden'}
        x={556}
        y={563}
        fontSize={27}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        -
      </text>

      <text
        x={265}
        y={735}
        fontSize={65}
        fill={AFCS_Color ? '#C6C6C6' : '#00EE00'}
        className="FrontPNL"
        textAnchor="end"
      >
        {Tot_Fuel}
      </text>
    </g>
  )
}
