import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import './buttonBar.scss';

export const ButtonBar = () => {
	return (
		<g>
			<div className="ButtonBarContainer">
				<NavLink
					style={{ textDecoration: 'none' }}
					to="/"
					className={(isActive) =>
						'BottomButton' + (isActive ? 'ButtomButtonActive' : '')
					}
				>
					<Button variant="contained">Home</Button>
				</NavLink>
				<NavLink
					style={{ textDecoration: 'none' }}
					to="/Aircraft"
					className={(isActive) =>
						'BottomButton' + (isActive ? 'ButtomButtonActive' : '')
					}
				>
					<Button variant="contained">Aircraft</Button>
				</NavLink>

				<NavLink
					style={{ textDecoration: 'none' }}
					to="/PDF"
					className={(isActive) =>
						'BottomButton' + (isActive ? 'ButtomButtonActive' : '')
					}
				>
					<Button variant="contained">Manual</Button>
				</NavLink>

				<NavLink
					style={{ textDecoration: 'none' }}
					to="/Map"
					className={(isActive) =>
						'BottomButton' + (isActive ? 'ButtomButtonActive' : '')
					}
				>
					<Button variant="contained">Map</Button>
				</NavLink>

				<NavLink
					style={{ textDecoration: 'none' }}
					to="/Browser"
					className={(isActive) =>
						'BottomButton' + (isActive ? 'ButtomButtonActive' : '')
					}
				>
					<Button variant="contained">Browser</Button>
				</NavLink>
				<NavLink
					style={{ textDecoration: 'none' }}
					to="/Settings"
					className={(isActive) =>
						'BottomButton' + (isActive ? 'ButtomButtonActive' : '')
					}
				>
					<Button variant="contained">Settings</Button>
				</NavLink>
			</div>
		</g>
	);
};
