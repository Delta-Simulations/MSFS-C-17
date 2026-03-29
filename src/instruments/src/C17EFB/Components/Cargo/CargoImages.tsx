import React from 'react';
import Box from '@mui/material/Box';
import { useSimVar } from '../../../Hooks/simVars';

import './cargo.scss';


export const ImagesCargo = () => {
	const [GPU] = useSimVar('L:C17_GPU_Vis', 'bool');
	let [cargoMode, setCargoMode] = useSimVar('L:C17_PAYLOAD_MODE', 'BOOL');

	const [FwdCargo_Station, setFwdCargo_Station] = useSimVar('PAYLOAD STATION WEIGHT:3', 'pounds');
	const [AftCargo_Station, setAftCargo_Station] = useSimVar('PAYLOAD STATION WEIGHT:4', 'pounds');
	const [removeTags] = useSimVar('L:C17_RBF_TAGS', 'bool');
	const [EnteranceDoor] = useSimVar('L:C17_Crew_Enterance', 'bool');
	const [WXDome] = useSimVar('L:C17_Radome_Open', 'bool');
	const isEmpty = FwdCargo_Station < 5000 && AftCargo_Station < 5000;
	const isPallet = FwdCargo_Station >= 5000 && FwdCargo_Station < 15000  && cargoMode === 0;
	const isISU = FwdCargo_Station >= 15000 && FwdCargo_Station < 23000 && cargoMode === 0;
	const isUH60 = FwdCargo_Station >= 23000 && FwdCargo_Station < 40000 && cargoMode === 0;
	const isFuel = FwdCargo_Station >= 40000  && cargoMode === 0;
	const isADSCargo = FwdCargo_Station >= 10000 && AftCargo_Station >= 10000  && cargoMode === 1;

	return (
		<div className="aircraftContainer">
			<Box
				sx={{
					position: 'absolute',
					width: 1040,
					height: 810,
					borderRadius: 4,
					left: 0,
					justifyContent: 'Left',
					display: 'flex',
					textAlign: 'center',
					fontSize: 14,
				}}
			>

				<Box
					sx={{
						position: 'absolute',
						width: 1280,
						height: 1200,
						left: -252,
						top: 0,
						backgroundImage: 'url(/images/EFB/Cargoflooring.svg)',
						backgroundPosition: 'right',
						backgroundSize: '80%',
						backgroundRepeat: 'no-repeat',
						transform: 'rotate(0deg)',
					}}
				/>
			</Box>

			<Box
				sx={{
					position: 'absolute',
					width: 1280,
					height: 1200,
					left: -252,
					top: 0,
    				backgroundImage: isUH60 ? 'url(/images/EFB/UH60.png)' : 'none',
					backgroundPosition: 'right',
					backgroundSize: '80%',
					backgroundRepeat: 'no-repeat',
					transform: 'rotate(0deg)',
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					width: 1280,
					height: 1200,
					left: -252,
					top: 0,
    				backgroundImage: isPallet ? 'url(/images/EFB/Palletized.png)' : 'none',
					backgroundPosition: 'right',
					backgroundSize: '80%',
					backgroundRepeat: 'no-repeat',
					transform: 'rotate(0deg)',
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					width: 1280,
					height: 1200,
					left: -252,
					top: 0,
    				backgroundImage: isISU ? 'url(/images/EFB/ISU.png)' : 'none',
					backgroundPosition: 'right',
					backgroundSize: '80%',
					backgroundRepeat: 'no-repeat',
					transform: 'rotate(0deg)',
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					width: 1280,
					height: 1200,
					left: -252,
					top: 0,
    				backgroundImage: isFuel ? 'url(/images/EFB/FuelBladder.png)' : 'none',
					backgroundPosition: 'right',
					backgroundSize: '80%',
					backgroundRepeat: 'no-repeat',
					transform: 'rotate(0deg)',
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					width: 1280,
					height: 1200,
					left: -252,
					top: 0,
    				backgroundImage: isADSCargo ? 'url(/images/EFB/Pallet_ADS.png)' : 'none',
					backgroundPosition: 'right',
					backgroundSize: '80%',
					backgroundRepeat: 'no-repeat',
					transform: 'rotate(0deg)',
				}}
			/>



		</div>
	);
};
