import React from 'react';
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
import './aircraft.scss';


export const Images = () => {
	let [GPU] = useSimVar('L:C17_GPU_Vis', 'bool');

	let [removeTags, setremoveTags] = useSimVar('L:C17_RBF_TAGS', 'bool');
	let [rearDoorL, setRearDoorL] = useSimVar('L:C17_PARA_L', 'bool');
	let [rearDoorR, setRearDoorR] = useSimVar('L:C17_PARA_R', 'bool');
	let [CargoDoor, setCargoDoor] = useSimVar('L:C17_CargoDoor_POS', 'enum');
	let [ARSlipway, setARSlipway] = useSimVar('L:C17_UARRSI_Slipway', 'bool');
	let [EnteranceDoor, setEnteranceDoor] = useSimVar('L:C17_Crew_Enterance', 'bool');
	let [WXDome, setWXDome] = useSimVar('L:C17_Radome_Open', 'bool');

	const handleChange = (event: Event, newValue: number | number[]) => {
		setCargoDoor(newValue as number)
	}
	const [view, setView] = React.useState('list');

	const handleChange2 = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
		setView(nextView);
	};
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
						transform: 'rotate(-180deg)', // Apply the rotation here

					}}
				/>
				{removeTags && (
					<Box
						sx={{
							position: 'absolute',
							width: 2050,
							height: 1000,
							left: -300,
							top: 0,
							backgroundImage: 'url(/images/EFB/C17RBF.png)',
							backgroundPosition: 'right',
							backgroundSize: '80%',
							backgroundRepeat: 'no-repeat',
							transform: 'rotate(-180deg)',
						}}
					/>
				)}
				{GPU && (
					<Box
						sx={{
							position: 'absolute',
							width: 2050,
							height: 1000,
							left: -300,
							top: 0,
							backgroundImage: 'url(/images/EFB/C17GPU.png)',
							backgroundPosition: 'right',
							backgroundSize: '80%',
							backgroundRepeat: 'no-repeat',
							transform: 'rotate(-180deg)',
						}}
					/>
				)}
				{!WXDome && (
					<Box
						sx={{
							position: 'absolute',
							width: 2050,
							height: 1000,
							left: -300,
							top: 0,
							backgroundImage: 'url(/images/EFB/C17RadomeClosed.png)',
							backgroundPosition: 'right',
							backgroundSize: '80%',
							backgroundRepeat: 'no-repeat',
							transform: 'rotate(-180deg)',
						}}
					/>
				)}
				{WXDome && (
					<Box
						sx={{
							position: 'absolute',
							width: 2050,
							height: 1000,
							left: -300,
							top: 0,
							backgroundImage: 'url(/images/EFB/C17RadomeOpen.png)',
							backgroundPosition: 'right',
							backgroundSize: '80%',
							backgroundRepeat: 'no-repeat',
							transform: 'rotate(-180deg)',
						}}
					/>
				)}
				{EnteranceDoor && (
					<Box
						sx={{
							position: 'absolute',
							width: 2050,
							height: 1000,
							left: -300,
							top: 0,
							backgroundImage: 'url(/images/EFB/C17CrewDoorOpen.png)',
							backgroundPosition: 'right',
							backgroundSize: '80%',
							backgroundRepeat: 'no-repeat',
							transform: 'rotate(-180deg)',
						}}
					/>
				)}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(27, 147, 255, 0.5)', // Adjust the color and opacity
    }}
  />

			</Box>

		</div>
	);
};
