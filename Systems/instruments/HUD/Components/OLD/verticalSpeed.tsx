import React, { useEffect, useState } from 'react';
import { useSimVar } from '../../Hooks/simVars';

export const VerticalSpeed = () => {
    const [vs, setVs] = useSimVar('VERTICAL SPEED', 'feet per minute');

    const getY1 = (vs: number) => {
        if (Math.round(vs) <= -6000) {
            return 478;
        }
        if (vs > -6000 && vs < -2000) {
            return 418 - 0.01 * vs;
        }
        else if (vs > -2000 && vs < -1000) {
            return 358 - 0.04 * vs;
        }
        else if (vs > -1000 && vs < 1000) {
            return 295 - 0.103 * vs;
        }
        else if (vs > 1000 && vs < 2000) {
            return 232 - 0.04 * vs;
        }
        else if (vs > 2000 && vs < 6000) {
            return 172 - 0.01 * vs;
        }
        else if (Math.round(Number(vs >= 6000))) {
            return 112;
        }
    }
    const getY2 = (vs: number) => {
        if (Math.round(vs) <= -6000) {
            return 395;
        }
        if (vs > -6000 && vs < -2000) {
            return 358 - 0.00625 * vs;
        }
        else if (vs > -2000 && vs < -1000) {
            return 320 - 0.025 * vs;
        }
        else if (vs > -1000 && vs < 1000) {
            return 295 - 0.053 * vs;
        }
        else if (vs > 1000 && vs < 2000) {
            return 269 - 0.027 * vs;
        }
        else if (vs > 2000 && vs < 6000) {
            return 228 - 0.0065 * vs;
        }
        else if (Math.round(Number(vs >= 6000))) {
            return 189;
        }
    }

    return (
        <g>
            <polygon points='1169,305 1169,510 1199,530 1199,530 1199,719 1165,740 1165,942 1220,942 1275,800 1275,453 1223,305' fill="#242329"/>
        </g>
    )
}
