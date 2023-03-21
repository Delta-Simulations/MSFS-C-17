import React from 'react';
import './checklist.scss';
import Box from '@mui/material/Box';
import { Button, ButtonGroup } from '@mui/material';
import { Emergency } from './emergency/emergency';
import { Link } from 'react-router-dom';
import { Outlet, Route, Routes } from 'react-router';
import Stack from '@mui/material/Stack';
import { Traditional } from './traditional/traditional';
import { useSimVar } from '../../../Hooks/simVars';

export const Checklist = () => {
	return (
		<div className="checklistContiner">
			<Box
				sx={{
					position: 'absolute',
					width: 1040,
					height: 810,
					top: 0,
					left: 0,
				}}
			>
				<h1 style={{ marginTop: 25, marginLeft: 25, color: '#1B93FF' }}>
					Checklist
				</h1>
				<Box
					sx={{
						marginLeft: 1,
						position: 'absolute',
						top: 20,
						right: 20,
						backgroundColor: '202330',
						width: 450,
						height: 70,
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
							width: 400,
							height: 100,
						}}
					>
						<Stack direction="row" spacing={1}>
							<Link
								style={{ textDecoration: 'none' }}
								to="/Checklist/Emergency"
							>
								<Button size="large" variant="outlined">
									Traditional
								</Button>
							</Link>
							<Link
								style={{ textDecoration: 'none' }}
								to="/Checklist/Emergency"
							>
								<Button size="large" variant="outlined" color="error">
									Emergency
								</Button>
							</Link>
							<Link
								style={{ textDecoration: 'none' }}
								to="/Checklist/Emergency"
							>
								<Button size="large" variant="outlined">
									Special
								</Button>
							</Link>
						</Stack>
					</Box>
				</Box>
				<Outlet />
			</Box>
		</div>
	);
};
