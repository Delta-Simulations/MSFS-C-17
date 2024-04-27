import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Container from '@mui/material/Container';
import { useSimVar } from '../../../Hooks/simVars';
import { ButtonColour } from '../ThemesEFB';
import { ThemeProvider } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Images } from './Images'
import './aircraft.scss';

export const Aircraft = () => {
	let [removeTags, setremoveTags] = useSimVar('L:C17_RBF_EngCovers', 'bool');
	let [removeCones, setremoveCones] = useSimVar('L:C17_RBF_ChocksCones', 'bool');

	let [rearDoorL, setRearDoorL] = useSimVar('L:C17_PARA_L', 'bool');
	let [rearDoorR, setRearDoorR] = useSimVar('L:C17_PARA_R', 'bool');
	let [CargoDoor, setCargoDoor] = useSimVar('L:C17_CargoDoor_POS', 'enum');
	let [ARSlipway, setARSlipway] = useSimVar('L:C17_UARRSI_Slipway', 'bool');
	let [EnteranceDoor, setEnteranceDoor] = useSimVar('L:C17_Crew_Enterance', 'bool');
	let [WXDome, setWXDome] = useSimVar('L:C17_Radome_Open', 'bool');
	let [FARP, setFARP] = useSimVar('A:LIGHT PEDESTRAL', 'bool');
	let [FARPSHOW, setFARPSHOW] = useSimVar('L:C17_FARPSHOW', 'bool');
	let [FARPTANK, setFARPTANK] = useSimVar('L:C17_FARP_TANK', 'bool');
	let [DevModeEFB] = useSimVar('L:C17_DevModeEFB', 'bool');
	let [CargoLightMode, setCargoLightMode] = useSimVar('L:C17_CARGO_LGT_MODE', 'bool');


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
				<Images />
				<Box
					sx={{
						position: 'absolute',
						width: 220,
						height: 200,
						backgroundColor: '#343a40',
						borderRadius: 1,
						left: 15,
						top: 20,
						boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
						justifyContent: 'start',
						textAlign: 'center',
						fontSize: 14,
						padding: 1,
					}}
				>
					<h2 style={{ marginTop: 0, color: '#aeb0b3' }}>Ground Services</h2>
					<Stack direction="column" spacing={1}>
						<ThemeProvider theme={ButtonColour}>

							<Button
								onClick={() => setWXDome(!WXDome)}
								size="large"
								variant={WXDome ? 'contained' : 'outlined'}
							>
								WX Dome
							</Button>
							<Button
								onClick={() => setremoveTags(!removeTags)}
								size="large"
								variant={removeTags ? 'contained' : 'outlined'}

							>
								Engine Covers
							</Button>
							<Button
								onClick={() => setremoveCones(!removeCones)}
								size="large"
								variant={removeCones ? 'contained' : 'outlined'}

							>
								Cones & Chocks
							</Button>
							<Button
								onClick={() => setFARPSHOW(!FARPSHOW)}
								size="large"
								variant={FARPSHOW ? 'contained' : 'outlined'}
								style={{ display: DevModeEFB ? 'block' : 'none' }}
							>
								SET UP FARP (MP)
							</Button>
							<Button
								onClick={() => setFARPTANK(!FARPTANK)}
								size="large"
								variant={FARPTANK ? 'contained' : 'outlined'}
								style={{ display: DevModeEFB ? 'block' : 'none' }}
							>
								FARP - FEED TO TANK
							</Button>
							</ThemeProvider>
					</Stack>
				</Box>
				<ThemeProvider theme={ButtonColour}>
				<Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
		left: 824,
		top: 160,
		position: 'absolute',
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
    <Button size="large" variant={CargoDoor === 0 ? 'contained' : 'outlined'} onClick={() => setCargoDoor(CargoDoor=0)} key="one">CLOSED</Button>
    <Button size="large" variant={CargoDoor === 50 ? 'contained' : 'outlined'} onClick={() => setCargoDoor(CargoDoor=50)} key="two">AIRDROP</Button>
    <Button size="large" variant={CargoDoor === 100 ? 'contained' : 'outlined'} onClick={() => setCargoDoor(CargoDoor=100)} key="three">GROUND</Button>
      </ButtonGroup>

    </Box>

	<Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
		left: 824,
		top: 640,
		position: 'absolute',

      }}
    >
      <ButtonGroup
        orientation="horizontal"
        aria-label="horizontal outlined button group"
      >
    <Button  size="large" variant={CargoLightMode === 0 ? 'contained' : 'outlined'} onClick={() => setCargoLightMode(CargoLightMode=0)} key="one">DAY</Button>
    <Button sx={{ backgroundColor: CargoLightMode === 0 ? 'transparent' : '#8B0000' }} size="large" variant={CargoLightMode === 1 ? 'contained' : 'outlined'} onClick={() => setCargoLightMode(CargoLightMode=1)} key="two">NIGHT</Button>
      </ButtonGroup>

    </Box>

					<Button
						onClick={() => setARSlipway(!ARSlipway)}
						size="large"
						variant={ARSlipway ? 'contained' : 'outlined'}
						style={{
							position: 'absolute',
							top: '340px',
							left: '45px',
							margin: '10px',
							boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
							backgroundColor: ARSlipway ? ButtonColour.palette.primary.main : '#22262a',

						}}
					>
						A/R Slipway
					</Button>
					<Button
						onClick={() => setEnteranceDoor(!EnteranceDoor)}
						size="large"
						variant={EnteranceDoor ? 'contained' : 'outlined'}
						style={{
							position: 'absolute',
							top: '635px',
							left: '120px',
							margin: '10px',
							boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
							backgroundColor: EnteranceDoor ? ButtonColour.palette.primary.main : '#22262a',

						}}
					>
						Crew Door
					</Button>


					<Button
						onClick={() => setRearDoorR(!rearDoorR)}
						size="large"
						variant={rearDoorR ? 'contained' : 'outlined'}
						style={{
							position: 'absolute',
							top: '300px',
							left: '620px',
							margin: '10px',
							boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
							backgroundColor: rearDoorR ? ButtonColour.palette.primary.main : '#22262a',

						}}
					>
						Para Door R
					</Button>
					<Button
						onClick={() => setRearDoorL(!rearDoorL)}
						size="large"
						variant={rearDoorL ? 'contained' : 'outlined'}
						style={{
							position: 'absolute',
							top: '640px',
							left: '620px',
							margin: '10px',
							boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
							backgroundColor: rearDoorL ? ButtonColour.palette.primary.main : '#22262a',

						}}
					>
						Para Door L
					</Button>
				</ThemeProvider>





			</Box>

		</div>
	);
};
