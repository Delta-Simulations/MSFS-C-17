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

	let [brightnessEFB, setbrightnessEFB] = useSimVar('L:C17_EFB_Brightness', 'enum');
	const handleChangeBrightness = (event: Event, newValue: number | number[]) => {
		setbrightnessEFB(newValue as number);
	};
	let [MasterVolume, setMasterVolume] = useSimVar('L:C17_Volume_Exterior', 'enum');
	let [EngineVolume, setEngineVolume] = useSimVar('L:C17_Volume_Engine', 'enum');
	let [AuralVolume, setAuralVolume] = useSimVar('L:C17_Volume_Aurals', 'enum');
	let [CockpitVolume, setCockpitVolume] = useSimVar('L:C17_Volume_Cockpit', 'enum');
	let [EngInCockpitVolume, setEngInCockpitVolume] = useSimVar('L:C17_Volume_EngInCockpit', 'enum');

	const handleMasterVolume = (event: Event, newValue: number | number[]) => {
		setMasterVolume(newValue as number);
	};
	const handleEngineVolume = (event: Event, newValue: number | number[]) => {
		setEngineVolume(newValue as number);
	};
	const handleAuralVolume = (event: Event, newValue: number | number[]) => {
		setAuralVolume(newValue as number);
	};
	const handleCockpitVolume = (event: Event, newValue: number | number[]) => {
		setCockpitVolume(newValue as number);
	};
	const handleEngInCockpitVolume = (event: Event, newValue: number | number[]) => {
		setEngInCockpitVolume(newValue as number);
	};


	return (
		<div className="settingsContainer">

			<Box
				sx={{
					position: 'absolute',
					width: 420,
					height: 170,
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

						<Slider aria-labelledby="brightness" value={brightnessEFB} onChange={handleChangeBrightness}
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

						<h3 style={{ marginBottom: 5, marginTop: 5, color: '#aeb0b3' }}>Use Right-Alt to pop this display out</h3>
					</ThemeProvider>


				</Stack>

			</Box>
			<Box
				sx={{
					position: 'absolute',
					width: 420,
					height: 390,
					backgroundColor: '#343a40',
					borderRadius: 1,
					left: 300,
					top: 260,
					boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
					justifyContent: 'start',
					textAlign: 'center',
					fontSize: 14,
					padding: 2,
					marginBottom: 5,
				}}
			>


				<Stack direction="column" spacing={1}>
					<ThemeProvider theme={ButtonColour}>

					<h2 style={{ marginTop: 0, color: 'Red' }}>INOP</h2>

						<h2 style={{ marginTop: 0, color: '#aeb0b3' }}>Exterior Volume</h2>

						<Slider aria-labelledby="brightness" value={MasterVolume} onChange={handleMasterVolume}
							sx={{
								color: 'orange', // Set the color to orange
								"& .MuiSlider-thumb": {
									backgroundColor: '#ffaa00', // Set the color of the slider thumb to orange
								},
							}}
						/>
						<h2 style={{ marginTop: 0, color: '#aeb0b3' }}>Engine Volume</h2>

						<Slider aria-labelledby="brightness" value={EngineVolume} onChange={handleEngineVolume}
							sx={{
								color: 'orange', // Set the color to orange
								"& .MuiSlider-thumb": {
									backgroundColor: '#ffaa00', // Set the color of the slider thumb to orange
								},
							}}
						/>
						<h2 style={{ marginTop: 0, color: '#aeb0b3' }}>Aural Volume</h2>

						<Slider aria-labelledby="brightness" value={AuralVolume} onChange={handleAuralVolume}
							sx={{
								color: 'orange', // Set the color to orange
								"& .MuiSlider-thumb": {
									backgroundColor: '#ffaa00', // Set the color of the slider thumb to orange
								},
							}}
						/>
						<h2 style={{ marginTop: 0, color: '#aeb0b3' }}>Cockpit Volume</h2>

						<Slider aria-labelledby="brightness" value={CockpitVolume} onChange={handleCockpitVolume}
							sx={{
								color: 'orange', // Set the color to orange
								"& .MuiSlider-thumb": {
									backgroundColor: '#ffaa00', // Set the color of the slider thumb to orange
								},
							}}
						/>
						<h2 style={{ marginTop: 0, color: '#aeb0b3' }}>Engine In-Cockpit Volume</h2>

						<Slider aria-labelledby="brightness" value={EngInCockpitVolume} onChange={handleEngInCockpitVolume}
							sx={{
								color: 'orange', // Set the color to orange
								"& .MuiSlider-thumb": {
									backgroundColor: '#ffaa00', // Set the color of the slider thumb to orange
								},
							}}
						/>

					</ThemeProvider>


				</Stack>

			</Box>

		</div>
	);
};
