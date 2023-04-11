import * as React from 'react';
import './traditional.scss';
import { useSimVar } from '../../../../Hooks/simVars';
import Box from '@mui/material/Box';
import { Button, ButtonGroup } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

export const Traditional = () => {
	return (
		<div className="traditionalContainer">
			<h1 style={{ marginTop: 0, marginLeft: 15, color: '#1B93FF' }}>
				Traditional
			</h1>
			<Box
				sx={{
					marginLeft: 1,
					position: 'absolute',
					top: 44,
					left: 1,
					backgroundColor: '202330',
					width: 180,
					height: 580,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: 3,
					boxShadow: '0px 0px 7px rgba(0,0,0,.65)',
				}}
			>
				<Box
					sx={{
						marginTop: 7,
						width: 120,
						height: 570,
					}}
				>
					<Stack direction="column" spacing={1}>
						<Link
							style={{ textAlign: 'center', textDecoration: 'none' }}
							to=""
						>
							<Button size="medium" color="primary" variant="outlined">
								Before Start
							</Button>
						</Link>
						<Link
							style={{ textDecoration: 'none' }}
							to=""
						>
							<Button size="medium" color="primary" variant="outlined">
								Cockpit Equipment Checks
							</Button>
						</Link>
						<Link
							style={{ textDecoration: 'none' }}
							to=""
						>
							<Button size="medium" color="primary" variant="outlined">
								Engine Start
							</Button>
						</Link>
						<Link
							style={{ width: '100%', textDecoration: 'none' }}
							to=""
						>
							<Button size="medium" color="primary" variant="outlined">
								Engine Runup
							</Button>
						</Link>
						<Link
							style={{
								width: '100%',
								textAlign: 'center',
								textDecoration: 'none',
							}}
							to=""
						>
							<Button size="medium" color="primary" variant="outlined">
								Before Taxi
							</Button>
						</Link>
						<Link
							style={{ textDecoration: 'none' }}
							to=""
						>
							<Button size="medium" color="primary" variant="outlined">
								Before Takeoff
							</Button>
						</Link>
						<Link
							style={{ textDecoration: 'none' }}
							to=""
						>
							<Button size="medium" color="primary" variant="outlined">
								Before Landing
							</Button>
						</Link>
						<Link
							style={{ textDecoration: 'none' }}
							to=""
						>
							<Button size="medium" color="primary" variant="outlined">
								Shutdown
							</Button>
						</Link>
					</Stack>
				</Box>
			</Box>
			<Box
				sx={{
					marginLeft: 1,
					position: 'absolute',
					top: 70,
					left: 220,
					backgroundColor: '202330',
					width: 720,
					height: 520,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: 3,
					boxShadow: '0px 0px 7px rgba(0,0,0,.65)',
				}}
			>
				<Outlet />
			</Box>
		</div>
	);
};
