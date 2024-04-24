import React, { useState, useEffect } from 'react';
import { useSimVar } from '../../Hooks/simVars';
import "../style.scss";

export const Annunciations = () => {
    let [IRU1] = useSimVar('L:C17_IRU1', 'bool');
    let [IRU2] = useSimVar('L:C17_IRU2', 'bool');
    let [IRU3] = useSimVar('L:C17_IRU3', 'bool');
    let [IRU4] = useSimVar('L:C17_IRU4', 'bool');
    let [Terrain_Caution] = useSimVar('L:C17_TERRAIN_FLYUP', 'bool');
    let [DH] = useSimVar('L:C17_GPWS_DH_P', 'bool');
    let [MDA] = useSimVar('L:C17_GPWS_MDA_P', 'bool');
    let [MKR] = useSimVar('L:C17_GPWS_MKR_P', 'bool');

    // State to keep track of displayed text
    const [displayedText, setDisplayedText] = useState('');
    // State to keep track of previous displayed text
    const [prevDisplayedText, setPrevDisplayedText] = useState('');
    // State to keep track of render count
    const [renderCount, setRenderCount] = useState(0);

    // Update displayed text based on the highest priority variable that is true
    useEffect(() => {
        if (Terrain_Caution) {
            setDisplayedText('TERRAIN');
        } else if (!IRU1 || !IRU2 || !IRU3 || !IRU4) {
            setDisplayedText('DO NOT TAXI');
        } else if (DH) {
            setDisplayedText('DH');
        } else if (MDA) {
            setDisplayedText('MDA');
        } else if (MKR) {
            setDisplayedText('TOO LOW');
        }

        setRenderCount(prevCount => prevCount + 1);
    }, [IRU1, IRU2, IRU3, IRU4, Terrain_Caution, DH, MDA, MKR]);

    // Effect to clear displayed text after 2 seconds if it has changed
    useEffect(() => {
        if (displayedText !== prevDisplayedText) {
            const timeoutId = setTimeout(() => {
                setDisplayedText('');
            }, 2000);
            return () => clearTimeout(timeoutId);
        }

        setPrevDisplayedText(displayedText);
    }, [displayedText, prevDisplayedText]);

    return(
        <g>
            {displayedText && (
                <text visibility={'visible'} x={585} y={430} fontSize={60} fill="green" textAnchor="middle" className='textAlert'>
                    {displayedText}
                </text>
            )}
        </g>
    )
};
