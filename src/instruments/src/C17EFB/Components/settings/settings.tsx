import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useSimVar } from '../../../Hooks/simVars';
import Typography from '@material-ui/core/Typography';
import { Button, Slider, ThemeProvider } from '@mui/material';
import './settings.scss';
import { ButtonColour } from '../ThemesEFB';

export const Settings = () => {
	let [DevModeEFB, setDevModeEFB] = useSimVar('L:C17_DevModeEFB', 'bool');
	let [EFBPopOut, setEFBPopOut] = useSimVar('L:C17_EFBPopOut', 'bool');

	let [brightnessEFB, setbrightnessEFB] = useSimVar('L:C17_EFB_Brightness', 'enum');
	const handleChange = (event: Event, newValue: number | number[]) => {
		setbrightnessEFB(newValue as number);
	};
	return (
		<div className="settingsContainer">

			<Box
				sx={{
					position: 'absolute',
					width: 420,
					height: 150,
					backgroundColor: '#343a40',
					borderRadius: 1,
					left: 300,
					top: 20,
					boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
					justifyContent: 'start',
					textAlign: 'center',
					fontSize: 14,
					padding: 2,
				}}
			>
				<h2 style={{ marginTop: 0, color: '#aeb0b3' }}>EFB Brightness</h2>

				<Stack direction="column" spacing={1}>

					<ThemeProvider theme={ButtonColour}>

						<Slider aria-labelledby="brightness" value={brightnessEFB} onChange={handleChange}
							sx={{
								color: 'orange', // Set the color to orange
								"& .MuiSlider-thumb": {
									backgroundColor: '#ffaa00', // Set the color of the slider thumb to orange
								},
							}}
						/>

						<Button
							onClick={() => setDevModeEFB(!DevModeEFB)}
							size="large"
							variant={DevModeEFB ? 'contained' : 'outlined'}
						>
							EXPERIMENTAL MODE
						</Button>

						<h3 style={{ marginTop: 5, color: '#aeb0b3' }}>Use Right-Alt to pop this display out</h3>
					</ThemeProvider>


				</Stack>

			</Box>


		</div>
	);
};
