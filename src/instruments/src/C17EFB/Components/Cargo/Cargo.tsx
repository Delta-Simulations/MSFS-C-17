import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import { Alert, Divider, IconButton, TextField, ToggleButtonGroup, Typography } from '@mui/material';
import { Button, Slider, ThemeProvider } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import MuiInput from '@mui/material/Input';
import Container from '@mui/material/Container';
import { useSimVar } from '../../../Hooks/simVars';
import { ButtonColour } from '../ThemesEFB';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ImagesCargo } from './CargoImages'

import './cargo.scss';


export const Cargo = () => {
	let [cargoMode, setCargoMode] = useSimVar('L:C17_PAYLOAD_MODE', 'BOOL');
	const [ac_on_ground] = useSimVar('SIM ON GROUND', 'bool');
	let [airdrop_control_mode, setairdrop_control_mode] = useSimVar('L:C17_AD_MODE', 'bool');
	const [fp_Waypoint_count] = useSimVar('GPS FLIGHT PLAN WP COUNT', 'number');
	let [Airdrop_drop_WP, setAirdrop_drop_WP] = useSimVar('L:C17_AD_DROP_WP', 'enum');

	let [FwdCargo_Station, setFwdCargo_Station] = useSimVar('PAYLOAD STATION WEIGHT:3', 'pounds');
	let [AftCargo_Station, setAftCargo_Station] = useSimVar('PAYLOAD STATION WEIGHT:4', 'pounds');

	let [WXDome, setWXDome] = useSimVar('L:C17_Radome_Open', 'bool');
	let [CargoHoldFlood, setCargoHoldFlood] = useSimVar('K:LIGHT_POTENTIOMETER_18_SET', 'number');
	let [CargoLightMode, setCargoLightMode] = useSimVar('L:C17_CARGO_LGT_MODE', 'bool');

	let [camera_instrument_index, setcamera_instrument_index] = useSimVar('A:CAMERA VIEW TYPE AND INDEX:1', 'enum');
	let [camera_substate, setcamera_substate] = useSimVar('A:CAMERA VIEW TYPE AND INDEX', 'enum');

	const totalGpsWaypoints = useSimVar('C:fs9gps:FlightPlanWaypointsNumber', 'number');

	const isEmpty = FwdCargo_Station < 5000 && AftCargo_Station < 5000;
	const isPallet = FwdCargo_Station >= 5000 && FwdCargo_Station < 15000;
	const isISU = FwdCargo_Station >= 15000 && FwdCargo_Station < 23000;
	const isUH60 = FwdCargo_Station >= 23000 && FwdCargo_Station < 40000;
	const isFuel = FwdCargo_Station >= 40000;
	const isADSCargo = FwdCargo_Station >= 10000 && AftCargo_Station >= 10000;


	// (&gt;A:CAMERA VIEW TYPE AND INDEX:1, enum)
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
				<ImagesCargo />
				<Box
					sx={{
						position: 'absolute',
						width: 240,
						height: 180,
						backgroundColor: '#343a40',
						borderRadius: 1,
						left: 15,
						top: 15,
						boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
						justifyContent: 'start',
						display: 'flex',
						flexDirection: 'column',
						textAlign: 'center',
						fontSize: 14,
						padding: 1,
					}}
				>
					<Stack direction="column" spacing={1} >

						<ThemeProvider theme={ButtonColour}>
							<h3 style={{ marginTop: 0, color: '#aeb0b3' }}>Cargo Bay Lighting</h3>
							<ButtonGroup variant="outlined" fullWidth>
								<Button onClick={() => setCargoHoldFlood(0)}>Off</Button>
								<Button onClick={() => setCargoHoldFlood(40)}>Dim</Button>
								<Button onClick={() => setCargoHoldFlood(100)}>Bright</Button >
							</ButtonGroup>
							<ButtonGroup variant="outlined" fullWidth>
								<Button size="medium" variant={CargoLightMode === 0 ? 'contained' : 'outlined'} onClick={() => setCargoLightMode(CargoLightMode = 0)} key="one">DAY</Button>
								<Button sx={{ backgroundColor: CargoLightMode === 0 ? 'transparent' : '#8B0000' }} size="medium" variant={CargoLightMode === 1 ? 'contained' : 'outlined'} onClick={() => setCargoLightMode(CargoLightMode = 1)} key="two">NIGHT</Button>

							</ButtonGroup>

						</ThemeProvider>

					</Stack>

				</Box>

				<ThemeProvider theme={ButtonColour}>
					{/* Payload Options */}
					<Box
						sx={{
							position: 'absolute',
							width: 600,
							height: 155,
							backgroundColor: '#343a40',
							borderRadius: 1,
							left: 15,
							top: 310,
							boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
							justifyContent: 'start',
							display: 'flex',
							flexDirection: 'column',
							textAlign: 'center',
							fontSize: 14,
							padding: 1,
						}}
					>
						<h3 style={{ marginTop: 0, color: '#aeb0b3' }}>Payload Options</h3>
						<Stack
							direction="column"
							spacing={1}
							sx={{
								opacity: !ac_on_ground ? 0.4 : 1,
								pointerEvents: !ac_on_ground ? "none" : "auto"
							}}
						>
							<ButtonGroup
								fullWidth
								orientation="horizontal"
								aria-label="horizontal outlined button group"
							>
								<Button size="large" variant={cargoMode === 0 ? 'contained' : 'outlined'} onClick={() => setCargoMode(0)}>STATIC CARGO</Button>
								<Button size="large" variant={cargoMode === 1 ? 'contained' : 'outlined'} onClick={() => setCargoMode(1)}>AIRDROP CARGO</Button>
							</ButtonGroup>
							{cargoMode === 0 && (
								<ButtonGroup
									fullWidth
									orientation="horizontal"
									aria-label="horizontal outlined button group"
								>
									<Button size="medium" variant={isEmpty ? 'contained' : 'outlined'} onClick={() => { setFwdCargo_Station(0); setAftCargo_Station(0) }} >EMPTY</Button>
									<Button size="medium" variant={isPallet ? 'contained' : 'outlined'} onClick={() => { setFwdCargo_Station(14000); setAftCargo_Station(14000) }} >PALLET</Button>
									<Button size="medium" variant={isISU ? 'contained' : 'outlined'} onClick={() => { setFwdCargo_Station(22000); setAftCargo_Station(22000) }} >ISU</Button>
									<Button size="medium" variant={isUH60 ? 'contained' : 'outlined'} onClick={() => { setFwdCargo_Station(35000); setAftCargo_Station(35000) }} >UH-60</Button>
									<Button size="medium" variant={isFuel ? 'contained' : 'outlined'} onClick={() => { setFwdCargo_Station(50000); setAftCargo_Station(50000) }} >FUEL BLADDER</Button>
								</ButtonGroup>)}
							{cargoMode === 1 && (
								<ButtonGroup
									fullWidth
									orientation="horizontal"
									aria-label="horizontal outlined button group"
								>
									<Button size="medium" variant={isEmpty ? 'contained' : 'outlined'} onClick={() => { setFwdCargo_Station(0); setAftCargo_Station(0) }}>EMPTY</Button>
									<Button size="medium" variant={isADSCargo ? 'contained' : 'outlined'} onClick={() => { setFwdCargo_Station(12000); setAftCargo_Station(12000) }} >PALLET</Button>

								</ButtonGroup>)}
						</Stack>
					</Box>

					{/* Airdrop Configuration */}
					{cargoMode === 1 && isADSCargo && (
						<Box
							sx={{
								position: 'absolute',
								width: 350,
								height: 155,
								backgroundColor: '#343a40',
								borderRadius: 1,
								left: 650,
								top: 310,
								boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
								justifyContent: 'start',
								display: 'flex',
								flexDirection: 'column',
								textAlign: 'center',
								fontSize: 14,
								padding: 1,
							}}
						>
							<h3 style={{ marginTop: 0, color: '#aeb0b3' }}>Airdrop Configuration</h3>
							<Stack
								direction="column"
								spacing={1}
							>


								<ButtonGroup
									fullWidth
									orientation="horizontal"
									aria-label="horizontal outlined button group"
								>
									<Button size="medium" variant={airdrop_control_mode === 1 ? 'contained' : 'outlined'} onClick={() => setairdrop_control_mode(1)} >MANUAL DROP</Button>
									<Button size="medium" variant={airdrop_control_mode === 0 ? 'contained' : 'outlined'} onClick={() => setairdrop_control_mode(0)} >AUTO DROP</Button>
								</ButtonGroup>
								<Stack direction="column" spacing={0.5}
									sx={{
										opacity: airdrop_control_mode === 1 ? 0.4 : 1,
										pointerEvents: airdrop_control_mode === 1 ? "none" : "auto"
									}}
								>

									<h3 style={{ marginTop: 0, color: '#aeb0b3' }}>Autodrop WP Select</h3>

									<ButtonGroup fullWidth>
										<Button disabled sx={{ width: 400 }}>

											<Typography sx={{ color: '#aeb0b3' }}>
												{Airdrop_drop_WP}
											</Typography>
										</Button>
										<Button
											onClick={() => setAirdrop_drop_WP(Math.max(1, Airdrop_drop_WP - 1))}
										>
											-
										</Button>

										<Button
											onClick={() => setAirdrop_drop_WP(Math.min(fp_Waypoint_count, Airdrop_drop_WP + 1))}
										>
											+
										</Button>
									</ButtonGroup>
								</Stack>

							</Stack>

						</Box>)}


					<Button
						startIcon={<CameraAltIcon />}
						onClick={() => { setcamera_instrument_index(8); setcamera_substate(2); }}
						size="large"
						variant="outlined"
						style={{
							position: 'absolute',
							top: '700px',
							left: '45px',
							margin: '10px',
							boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
						}}
					>
						Loadmaster
					</Button>
					<Button
						startIcon={<CameraAltIcon />}
						onClick={() => { setcamera_instrument_index(7); setcamera_substate(2); }}
						size="large"
						variant="outlined"
						style={{
							position: 'absolute',
							top: '700px',
							left: '667px',
							margin: '10px',
							boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',
						}}
					>
						Cargo Door
					</Button>


				</ThemeProvider>


			</Box>

		</div>
	);
};
