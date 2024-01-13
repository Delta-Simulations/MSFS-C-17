import React from 'react';
import Box from '@mui/material/Box';
import { useSimVar } from '../../../Hooks/simVars';

import './cargo.scss';


export const ImagesCargo = () => {
	let [GPU] = useSimVar('L:C17_GPU_Vis', 'bool');

	let [removeTags] = useSimVar('L:C17_RBF_TAGS', 'bool');
	let [EnteranceDoor] = useSimVar('L:C17_Crew_Enterance', 'bool');
	let [WXDome] = useSimVar('L:C17_Radome_Open', 'bool');

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
						width: 2050,
						height: 1000,
						left: -300,
						top: 0,
						backgroundImage: 'url(/images/EFB/C17Base.png)',
						backgroundPosition: 'right',
						backgroundSize: '80%',
						backgroundRepeat: 'no-repeat',
						transform: 'rotate(-180deg)',
					}}
				/>


			</Box>

		</div>
	);
};
