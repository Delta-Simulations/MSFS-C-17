import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CanvasMap} from 'react-msfs';
import { useSimVar } from '../../../Hooks/simVars';
export const Map = () => {

const [latitude] = useSimVar('A:PLANE LATITUDE', 'Degrees');
const [longitude] = useSimVar('A:PLANE LONGITUDE', 'Degrees');
const [headingTrue] = useSimVar('A:PLANE HEADING DEGREES TRUE', 'Degrees');

	return (
    <CanvasMap
        bingConfigFolder="/Pages/VCockpit/Instruments/C17/C17EFB/"
        mapId="MAPC17"
        centerLla={{ lat: latitude, long: longitude }}
        range={10}
        rotation={-headingTrue}
    />
);
};
