import React from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const FlightDirector = () => {
    const [FD_pitch] = useSimVar('AUTOPILOT FLIGHT DIRECTOR PITCH', 'degrees');
    const [FD_bank] = useSimVar('AUTOPILOT FLIGHT DIRECTOR BANK', 'degrees');
    const [pitch] = useSimVar("PLANE PITCH DEGREES", "degrees");
    const [bank] = useSimVar("PLANE BANK DEGREES", "degrees");
    const [isFD] = useSimVar('AUTOPILOT FLIGHT DIRECTOR ACTIVE', 'Bool');
    const [Airdrop_Active] = useSimVar('L:C17_AD_ACTIVE', 'bool');
    const [Airdrop_Dir_To_WP] = useSimVar('L:C17_AD_DirTo', 'enum');
    let [Airdrop_WP_ETA] = useSimVar('A:GPS WP ETE', 'enum');
    Airdrop_WP_ETA = Math.round(Airdrop_WP_ETA)
    let [Airdrop_WP_Lat_Offset] = useSimVar('A:GPS WP CROSS TRK', 'yards');
    Airdrop_WP_Lat_Offset = Math.round(Airdrop_WP_Lat_Offset*10)/10

    const degreesToPixels = (angle: number): number => (angle < 0 ? Math.max(angle * 8, -12 * 8) : Math.min(angle * 8, 12 * 8));
    
    return(
        <g transform={`translate(0 75)` }>
            <g visibility={isFD ? 'visible' : 'hidden'} transform={`translate(${(degreesToPixels((-FD_bank + bank) / 2) || 0)*0.8} 0)`}>
                <polygon points='586,295 586,453' className='readouts' strokeWidth={3} fill='black'/>
            </g>
            <g visibility={isFD ? 'visible' : 'hidden'} transform={`translate(0 ${(degreesToPixels(FD_pitch - pitch) || 0)*0.8})`}>
                <polygon points='507,374 665,374' className='readouts' strokeWidth={3} fill='black'/>
            </g>

            <g visibility={Airdrop_Active ? 'visible' : 'hidden'} transform={`translate(0 ${-30 * Airdrop_WP_ETA * Airdrop_Dir_To_WP})`}>
                <rect x='560' y='350' width={50} height={50} className='readouts' strokeWidth={3} fill='none'/>
                
            </g>
            <g visibility={Airdrop_Active ? 'visible' : 'hidden'} transform={`translate(${Airdrop_WP_Lat_Offset/2} 0)`}>
                <line className="a2" x1="586" y1="370" x2="586" y2="900" strokeWidth={4}/>

            </g>

        </g>


    )
};
