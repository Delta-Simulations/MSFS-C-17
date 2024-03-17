import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const Map = () => {
	const [mapProvider, setMapProvider] = useState('Windy');
	const handleChange = (event: SelectChangeEvent) => {
		setMapProvider(event.target.value);
	};
	return (
		<g>
			<Box
				sx={{
					position: 'absolute',
					backgroundColor: 'white',
					left: '0',
					top: '0',
					width: 1040,
					height: 750,
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						backgroundColor: 'white',
						left: '0',
						top: '0',
						width: 1040,
						height: 750,
					}}
				>
					<iframe
						width="1040"
						height="750"
						src="https://opentopomap.org/#map=6/38.505/-84.639"
					></iframe>
				</Box>
			</Box>
		</g>
	);
};
