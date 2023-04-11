import { Checkbox, Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSimVar } from '../../../../../Hooks/simVars';
import Divider from '@mui/material/Divider';
import './traditionalChecklist.scss';
import ToggleButton from '@mui/material/ToggleButton';
import { Button } from '@mui/material';

export const BeforeStart = () => {
	const [cklItm1, setChlItm1] = useSimVar('L:CHECKLISTITEM1', 'bool');
	const [cklItm2, setChlItm2] = useSimVar('L:CHECKLISTITEM2', 'bool');
	const [cklItm3, setChlItm3] = useSimVar('L:CHECKLISTITEM3', 'bool');
	const [cklItm4, setChlItm4] = useSimVar('L:CHECKLISTITEM4', 'bool');
	const [cklItm5, setChlItm5] = useSimVar('L:CHECKLISTITEM5', 'bool');
	const [cklItm6, setChlItm6] = useSimVar('L:CHECKLISTITEM6', 'bool');
	const [cklItm7, setChlItm7] = useSimVar('L:CHECKLISTITEM7', 'bool');
	const [cklItm8, setChlItm8] = useSimVar('L:CHECKLISTITEM8', 'bool');
	const [cklItm9, setChlItm9] = useSimVar('L:CHECKLISTITEM9', 'bool');
	const [cklItm10, setChlItm10] = useSimVar('L:CHECKLISTITEM10', 'bool');
	const [cklItm11, setChlItm11] = useSimVar('L:CHECKLISTITEM11', 'bool');

	const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm1(event.target.checked);
	};
	const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm2(event.target.checked);
	};
	const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm3(event.target.checked);
	};
	const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm4(event.target.checked);
	};
	const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm5(event.target.checked);
	};
	const handleChange6 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm6(event.target.checked);
	};
	const handleChange7 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm7(event.target.checked);
	};
	const handleChange8 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm8(event.target.checked);
	};
	const handleChange9 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm9(event.target.checked);
	};
	const handleChange10 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm10(event.target.checked);
	};
	const handleChange11 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm11(event.target.checked);
	};

	const markAll = () => {
		setChlItm1(true);
		setChlItm2(true);
		setChlItm3(true);
		setChlItm4(true);
		setChlItm5(true);
		setChlItm6(true);
		setChlItm7(true);
		setChlItm8(true);
		setChlItm9(true);
		setChlItm10(true);
		setChlItm11(true);
	};
	const unmarkAll = () => {
		setChlItm1(false);
		setChlItm2(false);
		setChlItm3(false);
		setChlItm4(false);
		setChlItm5(false);
		setChlItm6(false);
		setChlItm7(false);
		setChlItm8(false);
		setChlItm9(false);
		setChlItm10(false);
		setChlItm11(false);
	};

	return (
		<g>
			<div className="checklistContents">
				<Stack direction="row">
					<Stack
						justifyContent="center"
						divider={<Divider orientation="horizontal" flexItem />}
						spacing={0.1}
					>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange1}
								checked={cklItm1}
								color="success"
							/>
							<div
								className={
									cklItm1
										? 'activeChecklistItem'
										: 'inactiveChecklistItem'
								}
							>
								Parking Brake - Set
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange2}
								checked={cklItm2}
								color="success"
							/>
							<div
								className={
									cklItm2
										? 'activeChecklistItem'
										: 'inactiveChecklistItem'
								}
							>
								ANTI COLLISION, POSITION LIGHTS - As required
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange3}
								checked={cklItm3}
								color="success"
							/>
							<div
								className={
									cklItm3
										? 'activeChecklistItem'
										: 'inactiveChecklistItem'
								}
							>
								STBY INST - OFF
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange4}
								checked={cklItm4}
								color="success"
							/>
							<div
								className={
									cklItm4
										? 'activeChecklistItem'
										: 'inactiveChecklistItem'
								}
							>
								BATT - ON
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange5}
								checked={cklItm5}
								color="success"
							/>
							<div
								className={
									cklItm5
										? 'activeChecklistItem'
										: 'inactiveChecklistItem'
								}
							>
								EXT POW - As required
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange6}
								checked={cklItm6}
								color="success"
							/>
							<div
								className={
									cklItm6
										? 'activeChecklistItem'
										: 'inactiveChecklistItem'
								}
							>
								NO.1 AND NO.2 GEN - ON
							</div>
						</Stack>

						<Stack direction="row">
							<Checkbox
								onChange={handleChange7}
								checked={cklItm7}
								color="success"
							/>
							<div
								className={
									cklItm7
										? 'activeChecklistItem'
										: 'inactiveChecklistItem'
								}
							>
								APU CONT - OFF
							</div>
						</Stack>

						<Stack direction="row">
							<Checkbox
								onChange={handleChange8}
								checked={cklItm8}
								color="success"
							/>
							<div
								className={
									cklItm8
										? 'activeChecklistItem'
										: 'inactiveChecklistItem'
								}
							>
								FUEL BOOST PUMP - OFF
							</div>
						</Stack>

						<Stack direction="row">
							<Checkbox
								onChange={handleChange9}
								checked={cklItm9}
								color="success"
							/>
							<div
								className={
									cklItm9
										? 'activeChecklistItem'
										: 'inactiveChecklistItem'
								}
							>
								AIR SCE STRT - APU
							</div>
						</Stack>

						<Stack direction="row">
							<Checkbox
								onChange={handleChange10}
								checked={cklItm10}
								color="success"
							/>
							<div
								className={
									cklItm10
										? 'activeChecklistItem'
										: 'inactiveChecklistItem'
								}
							>
								FUEL BOOST PUMP - OFF
							</div>
						</Stack>

						<Stack direction="row">
							<Checkbox
								onChange={handleChange11}
								checked={cklItm11}
								color="success"
							/>
							<div
								className={
									cklItm11
										? 'activeChecklistItem'
										: 'inactiveChecklistItem'
								}
							>
								AIRLANDFS - OFF
							</div>
						</Stack>
					</Stack>
				</Stack>
			</div>
			<div className="traditionalControls">
				<Stack spacing={1}>
					<Button
						onClick={markAll}
						size="large"
						color="success"
						variant="outlined"
					>
						Mark all
					</Button>
					<Button
						onClick={unmarkAll}
						size="large"
						color="error"
						variant="outlined"
					>
						Unmark all
					</Button>
				</Stack>
			</div>
		</g>
	);
};

export const CockpitCheck = () => {
	const [cklItm1, setChlItm1] = useSimVar('L:CHECKLISTITEM12', 'bool');
	const [cklItm2, setChlItm2] = useSimVar('L:CHECKLISTITEM13', 'bool');
	const [cklItm3, setChlItm3] = useSimVar('L:CHECKLISTITEM14', 'bool');
	const [cklItm4, setChlItm4] = useSimVar('L:CHECKLISTITEM15', 'bool');
	const [cklItm5, setChlItm5] = useSimVar('L:CHECKLISTITEM16', 'bool');
	const [cklItm6, setChlItm6] = useSimVar('L:CHECKLISTITEM17', 'bool');

	const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm1(event.target.checked);
	};
	const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm2(event.target.checked);
	};
	const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm3(event.target.checked);
	};
	const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm4(event.target.checked);
	};
	const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm5(event.target.checked);
	};
	const handleChange6 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm6(event.target.checked);
	};

	const markAll = () => {
		setChlItm1(true);
		setChlItm2(true);
		setChlItm3(true);
		setChlItm4(true);
		setChlItm5(true);
		setChlItm6(true);
	};
	const unmarkAll = () => {
		setChlItm1(false);
		setChlItm2(false);
		setChlItm3(false);
		setChlItm4(false);
		setChlItm5(false);
		setChlItm6(false);
	};
	return (
		<g>
			<div className="checklistContents">
				<Stack
					direction="row"
					style={{ fontSize: 17, fontWeight: 'bold', color: '1B93FF' }}
				>
					<Stack
						justifyContent="center"
						divider={<Divider orientation="horizontal" flexItem />}
						spacing={0.1}
					>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange1}
								checked={cklItm1}
								color="success"
							/>
							<div style={{ color: cklItm1 ? '2e7d32 ' : '' }}>
								PANEL LIGHTING - As required
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange2}
								checked={cklItm2}
								color="success"
							/>
							<div style={{ color: cklItm2 ? '2e7d32 ' : '' }}>
								FUEL PUMP - APU BOOST
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange3}
								checked={cklItm3}
								color="success"
							/>
							<div style={{ color: cklItm3 ? '2e7d32 ' : '' }}>
								APU CONT - ON
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange4}
								checked={cklItm4}
								color="success"
							/>
							<div style={{ color: cklItm4 ? '2e7d32 ' : '' }}>
								GENERATORS APU - ON
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange5}
								checked={cklItm5}
								color="success"
							/>
							<div style={{ color: cklItm5 ? '2e7d32 ' : '' }}>
								STBY INST - ARM
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange6}
								checked={cklItm6}
								color="success"
							/>
							<div style={{ color: cklItm6 ? '2e7d32 ' : '' }}>
								FIRE TEST - HOLD for 5 seconds
							</div>
						</Stack>
					</Stack>
				</Stack>
			</div>
			<div className="traditionalControls">
				<Stack spacing={1}>
					<Button
						onClick={markAll}
						size="large"
						color="success"
						variant="outlined"
					>
						Mark all
					</Button>
					<Button
						onClick={unmarkAll}
						size="large"
						color="error"
						variant="outlined"
					>
						Unmark all
					</Button>
				</Stack>
			</div>
		</g>
	);
};

export const EngineStart = () => {
	const [cklItm1, setChlItm1] = useSimVar('L:CHECKLISTITEM18', 'bool');
	const [cklItm2, setChlItm2] = useSimVar('L:CHECKLISTITEM19', 'bool');
	const [cklItm3, setChlItm3] = useSimVar('L:CHECKLISTITEM20', 'bool');
	const [cklItm4, setChlItm4] = useSimVar('L:CHECKLISTITEM21', 'bool');
	const [cklItm5, setChlItm5] = useSimVar('L:CHECKLISTITEM22', 'bool');

	const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm1(event.target.checked);
	};
	const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm2(event.target.checked);
	};
	const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm3(event.target.checked);
	};
	const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm4(event.target.checked);
	};
	const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm5(event.target.checked);
	};

	const markAll = () => {
		setChlItm1(true);
		setChlItm2(true);
		setChlItm3(true);
		setChlItm4(true);
		setChlItm5(true);
	};
	const unmarkAll = () => {
		setChlItm1(false);
		setChlItm2(false);
		setChlItm3(false);
		setChlItm4(false);
		setChlItm5(false);
	};
	return (
		<g>
			<div className="checklistContents">
				<Stack
					direction="row"
					style={{ fontSize: 17, fontWeight: 'bold', color: '1B93FF' }}
				>
					<Stack
						justifyContent="center"
						divider={<Divider orientation="horizontal" flexItem />}
						spacing={0.1}
					>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange1}
								checked={cklItm1}
								color="success"
							/>
							<div style={{ color: cklItm1 ? '2e7d32 ' : '' }}>
								BEACON LIGHTS - As required
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange2}
								checked={cklItm2}
								color="success"
							/>
							<div style={{ color: cklItm2 ? '2e7d32 ' : '' }}>
								ENG FUEL SYS - DIR
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange3}
								checked={cklItm3}
								color="success"
							/>
							<div style={{ color: cklItm3 ? '2e7d32 ' : '' }}>
								ENGINE IGNITION - ON
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange4}
								checked={cklItm4}
								color="success"
							/>
							<div style={{ color: cklItm4 ? '2e7d32 ' : '' }}>
								STARTER - ON
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange5}
								checked={cklItm5}
								color="success"
							/>
							<div style={{ color: cklItm5 ? '2e7d32 ' : '' }}>
								Eng PCL lever - IDLE
							</div>
						</Stack>
					</Stack>
				</Stack>
			</div>
			<div className="traditionalControls">
				<Stack spacing={1}>
					<Button
						onClick={markAll}
						size="large"
						color="success"
						variant="outlined"
					>
						Mark all
					</Button>
					<Button
						onClick={unmarkAll}
						size="large"
						color="error"
						variant="outlined"
					>
						Unmark all
					</Button>
				</Stack>
			</div>
		</g>
	);
};

export const EngineRunup = () => {
	const [cklItm1, setChlItm1] = useSimVar('L:CHECKLISTITEM23', 'bool');
	const [cklItm2, setChlItm2] = useSimVar('L:CHECKLISTITEM24', 'bool');
	const [cklItm3, setChlItm3] = useSimVar('L:CHECKLISTITEM25', 'bool');
	const [cklItm4, setChlItm4] = useSimVar('L:CHECKLISTITEM26', 'bool');
	const [cklItm5, setChlItm5] = useSimVar('L:CHECKLISTITEM27', 'bool');

	const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm1(event.target.checked);
	};
	const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm2(event.target.checked);
	};
	const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm3(event.target.checked);
	};
	const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm4(event.target.checked);
	};
	const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm5(event.target.checked);
	};

	const markAll = () => {
		setChlItm1(true);
		setChlItm2(true);
		setChlItm3(true);
		setChlItm4(true);
		setChlItm5(true);
	};
	const unmarkAll = () => {
		setChlItm1(false);
		setChlItm2(false);
		setChlItm3(false);
		setChlItm4(false);
		setChlItm5(false);
	};
	return (
		<g>
			<div className="checklistContents">
				<Stack
					direction="row"
					style={{ fontSize: 17, fontWeight: 'bold', color: '1B93FF' }}
				>
					<Stack
						justifyContent="center"
						divider={<Divider orientation="horizontal" flexItem />}
						spacing={0.1}
					>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange1}
								checked={cklItm1}
								color="success"
							/>
							<div style={{ color: cklItm1 ? '2e7d32 ' : '' }}>
								PCL lever - FLY
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange2}
								checked={cklItm2}
								color="success"
							/>
							<div style={{ color: cklItm2 ? '2e7d32 ' : '' }}>
								FUEL BOOST PUMP - OFF
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange3}
								checked={cklItm3}
								color="success"
							/>
							<div style={{ color: cklItm3 ? '2e7d32 ' : '' }}>
								APU CONT - OFF
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange4}
								checked={cklItm4}
								color="success"
							/>
							<div style={{ color: cklItm4 ? '2e7d32 ' : '' }}>
								AIR SCE STRT - As required
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange5}
								checked={cklItm5}
								color="success"
							/>
							<div style={{ color: cklItm5 ? '2e7d32 ' : '' }}>
								AIRLANDFS - STARTED
							</div>
						</Stack>
					</Stack>
				</Stack>
			</div>
			<div className="traditionalControls">
				<Stack spacing={1}>
					<Button
						onClick={markAll}
						size="large"
						color="success"
						variant="outlined"
					>
						Mark all
					</Button>
					<Button
						onClick={unmarkAll}
						size="large"
						color="error"
						variant="outlined"
					>
						Unmark all
					</Button>
				</Stack>
			</div>
			<div className="warning">
				Make sure that AirlandFS is not running until after BOTH engines
				have stabilized and the PCL levers are in FLY
			</div>
		</g>
	);
};
export const BeforeTaxi = () => {
	const [cklItm1, setChlItm1] = useSimVar('L:CHECKLISTITEM28', 'bool');
	const [cklItm2, setChlItm2] = useSimVar('L:CHECKLISTITEM29', 'bool');
	const [cklItm3, setChlItm3] = useSimVar('L:CHECKLISTITEM30', 'bool');
	const [cklItm4, setChlItm4] = useSimVar('L:CHECKLISTITEM31', 'bool');
	const [cklItm5, setChlItm5] = useSimVar('L:CHECKLISTITEM32', 'bool');
	const [cklItm6, setChlItm6] = useSimVar('L:CHECKLISTITEM33', 'bool');

	const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm1(event.target.checked);
	};
	const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm2(event.target.checked);
	};
	const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm3(event.target.checked);
	};
	const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm4(event.target.checked);
	};
	const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm5(event.target.checked);
	};
	const handleChange6 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm6(event.target.checked);
	};

	const markAll = () => {
		setChlItm1(true);
		setChlItm2(true);
		setChlItm3(true);
		setChlItm4(true);
		setChlItm5(true);
		setChlItm6(true);
	};
	const unmarkAll = () => {
		setChlItm1(false);
		setChlItm2(false);
		setChlItm3(false);
		setChlItm4(false);
		setChlItm5(false);
		setChlItm6(false);
	};
	return (
		<g>
			<div className="checklistContents">
				<Stack
					direction="row"
					style={{ fontSize: 17, fontWeight: 'bold', color: '1B93FF' }}
				>
					<Stack
						justifyContent="center"
						divider={<Divider orientation="horizontal" flexItem />}
						spacing={0.1}
					>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange1}
								checked={cklItm1}
								color="success"
							/>
							<div style={{ color: cklItm1 ? '2e7d32 ' : '' }}>
								TAXI CLEARANCE - Issued
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange2}
								checked={cklItm2}
								color="success"
							/>
							<div style={{ color: cklItm2 ? '2e7d32 ' : '' }}>
								Doors - Secure
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange3}
								checked={cklItm3}
								color="success"
							/>
							<div style={{ color: cklItm3 ? '2e7d32 ' : '' }}>
								WIPERS, DEFOG BLOWER - As required
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange4}
								checked={cklItm4}
								color="success"
							/>
							<div style={{ color: cklItm4 ? '2e7d32 ' : '' }}>
								PARKING BRAKE - Release
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange5}
								checked={cklItm5}
								color="success"
							/>
							<div style={{ color: cklItm5 ? '2e7d32 ' : '' }}>
								NAVIGATION, TAXI, STROBE LIGHTS - As required
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange6}
								checked={cklItm6}
								color="success"
							/>
							<div style={{ color: cklItm6 ? '2e7d32 ' : '' }}>
								DE-ICE SYS - As required
							</div>
						</Stack>
					</Stack>
				</Stack>
			</div>
			<div className="traditionalControls">
				<Stack spacing={1}>
					<Button
						onClick={markAll}
						size="large"
						color="success"
						variant="outlined"
					>
						Mark all
					</Button>
					<Button
						onClick={unmarkAll}
						size="large"
						color="error"
						variant="outlined"
					>
						Unmark all
					</Button>
				</Stack>
			</div>
		</g>
	);
};

export const BeforeTakeoff = () => {
	const [cklItm1, setChlItm1] = useSimVar('L:CHECKLISTITEM34', 'bool');
	const [cklItm2, setChlItm2] = useSimVar('L:CHECKLISTITEM35', 'bool');
	const [cklItm3, setChlItm3] = useSimVar('L:CHECKLISTITEM36', 'bool');
	const [cklItm4, setChlItm4] = useSimVar('L:CHECKLISTITEM37', 'bool');
	const [cklItm5, setChlItm5] = useSimVar('L:CHECKLISTITEM38', 'bool');
	const [cklItm6, setChlItm6] = useSimVar('L:CHECKLISTITEM39', 'bool');

	const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm1(event.target.checked);
	};
	const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm2(event.target.checked);
	};
	const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm3(event.target.checked);
	};
	const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm4(event.target.checked);
	};
	const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm5(event.target.checked);
	};
	const handleChange6 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm6(event.target.checked);
	};

	const markAll = () => {
		setChlItm1(true);
		setChlItm2(true);
		setChlItm3(true);
		setChlItm4(true);
		setChlItm5(true);
		setChlItm6(true);
	};
	const unmarkAll = () => {
		setChlItm1(false);
		setChlItm2(false);
		setChlItm3(false);
		setChlItm4(false);
		setChlItm5(false);
		setChlItm6(false);
	};
	return (
		<g>
			<div className="checklistContents">
				<Stack
					direction="row"
					style={{ fontSize: 17, fontWeight: 'bold', color: '1B93FF' }}
				>
					<Stack
						justifyContent="center"
						divider={<Divider orientation="horizontal" flexItem />}
						spacing={0.1}
					>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange1}
								checked={cklItm1}
								color="success"
							/>
							<div style={{ color: cklItm1 ? '2e7d32 ' : '' }}>
								TAKEOFF CLEARANCE - Issued
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange2}
								checked={cklItm2}
								color="success"
							/>
							<div style={{ color: cklItm2 ? '2e7d32 ' : '' }}>
								Doors - Secure
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange3}
								checked={cklItm3}
								color="success"
							/>
							<div style={{ color: cklItm3 ? '2e7d32 ' : '' }}>
								SEARCH LIGHT - As required
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange4}
								checked={cklItm4}
								color="success"
							/>
							<div style={{ color: cklItm4 ? '2e7d32 ' : '' }}>
								Systems - Check
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange5}
								checked={cklItm5}
								color="success"
							/>
							<div style={{ color: cklItm5 ? '2e7d32 ' : '' }}>
								Avionics - As required
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange6}
								checked={cklItm6}
								color="success"
							/>
							<div style={{ color: cklItm6 ? '2e7d32 ' : '' }}>
								Crew, passengers, mission equipment - Secure
							</div>
						</Stack>
					</Stack>
				</Stack>
			</div>
			<div className="traditionalControls">
				<Stack spacing={1}>
					<Button
						onClick={markAll}
						size="large"
						color="success"
						variant="outlined"
					>
						Mark all
					</Button>
					<Button
						onClick={unmarkAll}
						size="large"
						color="error"
						variant="outlined"
					>
						Unmark all
					</Button>
				</Stack>
			</div>
		</g>
	);
};

export const BeforeLanding = () => {
	const [cklItm1, setChlItm1] = useSimVar('L:CHECKLISTITEM40', 'bool');
	const [cklItm2, setChlItm2] = useSimVar('L:CHECKLISTITEM41', 'bool');

	const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm1(event.target.checked);
	};
	const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm2(event.target.checked);
	};

	const markAll = () => {
		setChlItm1(true);
		setChlItm2(true);
	};
	const unmarkAll = () => {
		setChlItm1(false);
		setChlItm2(false);
	};
	return (
		<g>
			<div className="checklistContents">
				<Stack
					direction="row"
					style={{ fontSize: 17, fontWeight: 'bold', color: '1B93FF' }}
				>
					<Stack
						justifyContent="center"
						divider={<Divider orientation="horizontal" flexItem />}
						spacing={0.1}
					>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange1}
								checked={cklItm1}
								color="success"
							/>
							<div style={{ color: cklItm1 ? '2e7d32 ' : '' }}>
								TAKEOFF CLEARANCE - Issued
							</div>
						</Stack>
						<Stack direction="row">
							<Checkbox
								onChange={handleChange2}
								checked={cklItm2}
								color="success"
							/>
							<div style={{ color: cklItm2 ? '2e7d32 ' : '' }}>
								Doors - Secure
							</div>
						</Stack>
					</Stack>
				</Stack>
			</div>
			<div className="traditionalControls">
				<Stack spacing={1}>
					<Button
						onClick={markAll}
						size="large"
						color="success"
						variant="outlined"
					>
						Mark all
					</Button>
					<Button
						onClick={unmarkAll}
						size="large"
						color="error"
						variant="outlined"
					>
						Unmark all
					</Button>
				</Stack>
			</div>
			<div className="advisory">
				It is recommended to shut down AirlandFS BEFORE shutting down the
				engines
			</div>
		</g>
	);
};

export const Shutdown = () => {
	const [cklItm1, setChlItm1] = useSimVar('L:CHECKLISTITEM42', 'bool');
	const [cklItm2, setChlItm2] = useSimVar('L:CHECKLISTITEM43', 'bool');
	const [cklItm3, setChlItm3] = useSimVar('L:CHECKLISTITEM44', 'bool');
	const [cklItm4, setChlItm4] = useSimVar('L:CHECKLISTITEM45', 'bool');
	const [cklItm5, setChlItm5] = useSimVar('L:CHECKLISTITEM46', 'bool');
	const [cklItm6, setChlItm6] = useSimVar('L:CHECKLISTITEM47', 'bool');

	const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm1(event.target.checked);
	};
	const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm2(event.target.checked);
	};
	const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm3(event.target.checked);
	};
	const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm4(event.target.checked);
	};
	const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm5(event.target.checked);
	};
	const handleChange6 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChlItm6(event.target.checked);
	};

	const markAll = () => {
		setChlItm1(true);
		setChlItm2(true);
		setChlItm3(true);
		setChlItm4(true);
		setChlItm5(true);
		setChlItm6(true);
	};
	const unmarkAll = () => {
		setChlItm1(false);
		setChlItm2(false);
		setChlItm3(false);
		setChlItm4(false);
		setChlItm5(false);
		setChlItm6(false);
	};
	return (
		<div>
			<h1>Shutdown</h1>
		</div>
	);
};
