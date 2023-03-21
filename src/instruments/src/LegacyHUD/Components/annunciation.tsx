import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const Toga = () => {
    const [isHDGSEL] = useSimVar('AUTOPILOT HEADING LOCK', 'Bool');
    const [isSPDSEL] = useSimVar('AUTOPILOT AIRSPEED HOLD', 'Bool');
    const [isFD] = useSimVar('AUTOPILOT FLIGHT DIRECTOR ACTIVE', 'Bool');
    const [isAT] = useSimVar('AUTOPILOT THROTTLE ARM', 'Bool');
    const [isVS] = useSimVar('AUTOPILOT VERTICAL HOLD', 'Bool');
    const [isSPDMACH] = useSimVar('AUTOPILOT MANAGED SPEED IN MACH', 'Bool');
    const [isALTHLD] = useSimVar('AUTOPILOT ALTITUDE LOCK', 'Bool');
    const [isRPMHLD] = useSimVar('AUTOPILOT RPM HOLD', 'Bool');


    return(
        <g>
            <g>
            <rect x={395} y={35} width={3} height={95} fill='white'/>
            <rect x={735} y={35} width={3} height={95} fill='white'/>
            <rect x={1038} y={35} width={3} height={95} fill='white'/>
                <g>
                <text visibility={isSPDSEL ? 'visible' : 'hidden'} x={243} y={85} fontSize={60} fill="green" textAnchor="middle">
                    SPD
                </text>
                <text visibility={isRPMHLD ? 'visible' : 'hidden'} x={243} y={85} fontSize={60} fill="green" textAnchor="middle">
                    THR HLD
                </text>
                <text x={243} y={85} fontSize={60} fill="green" textAnchor="middle">
                    {/*EPR*/}
                </text>
                <text x={243} y={85} fontSize={60} fill="green" textAnchor="middle">
                    {/*IDLE*/}
                </text>
                <text x={243} y={85} fontSize={60} fill="green" textAnchor="middle">
                    {/*FLCH*/}
                </text>
                <text visibility={isAT ? 'visible' : 'hidden'} x={243} y={155} fontSize={60} fill="green" textAnchor="middle">
                    A/T
                </text>
                <text x={565} y={85} fontSize={60} fill="green" textAnchor="middle">
                    TO
                </text>
                <text visibility={isALTHLD ? 'visible' : 'hidden'} x={565} y={85} fontSize={60} fill="green" textAnchor="middle">
                    ALT HOLD
                </text>
                <text visibility={isHDGSEL ? 'visible' : 'hidden'} x={565} y={85} fontSize={60} fill="green" textAnchor="middle">
                    {/*VNAV SPD*/}
                </text>
                <text visibility={isHDGSEL ? 'visible' : 'hidden'} x={565} y={85} fontSize={60} fill="green" textAnchor="middle">
                    {/*VNAV PITCH*/}
                </text>
                <text visibility={isHDGSEL ? 'visible' : 'hidden'} x={565} y={85} fontSize={60} fill="green" textAnchor="middle">
                    {/*G/S*/}
                </text>
                <text visibility={isHDGSEL ? 'visible' : 'hidden'} x={565} y={85} fontSize={60} fill="green" textAnchor="middle">
                    {/*V/S*/}
                </text>
                <text visibility={isHDGSEL ? 'visible' : 'hidden'} x={885} y={85} fontSize={60} fill="green" textAnchor="middle">
                    HDG SEL
                </text>
                <text visibility={isHDGSEL ? 'hidden' : 'visible'} x={885} y={85} fontSize={60} fill="green" textAnchor="middle">
                    LNAV
                </text>
                <text visibility={isFD ? 'visible' : 'hidden'} x={1090} y={85} fontSize={60} fill="green" textAnchor="middle">
                    FD
                </text>

                </g>
            </g>
        </g>
    )
};
