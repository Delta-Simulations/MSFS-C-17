import React, { useCallback, useState } from 'react';
import './scratchpads.scss';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { red } from '@mui/material/colors';
import {
	CanvasPath,
	ExportImageType,
	ReactSketchCanvas,
	ReactSketchCanvasProps,
	ReactSketchCanvasRef,
} from 'react-sketch-canvas';

export const ScratchPad = () => {
	const [color, setColor] = useState('Black');
	const canvasRef = React.createRef<ReactSketchCanvasRef>();

	const handleChange = (event: SelectChangeEvent) => {
		setColor(event.target.value);
	};
	const styles = {
		border: '0.0625rem solid #1976d2',
		borderRadius: '1px',
	};
	const undoHandler = () => {
		const undo = canvasRef.current?.undo;
		if (undo) {
			undo();
		}
	};
	const clearHandler = () => {
		const clearCanvas = canvasRef.current?.clearCanvas;
		if (clearCanvas) {
			clearCanvas();
		}
	};
	const buttonsWithHandlers: Handlers = [
		['Undo', undoHandler, 'primary'],
		['Clear All', clearHandler, 'primary'],
	];
	const onChange = (updatedPaths: CanvasPath[]): void => {
		setPaths(updatedPaths);
	};

	return (
		<g>
			<div className="canvasContainer">
				<Box
					sx={{ display: 'flex', justifyContent: 'left', maxWidth: '400' }}
				>
					<ButtonGroup
						variant="contained"
						aria-label="Scratchpad controls"
					>
						<Button onClick={undoHandler}>undo</Button>
						<Button onClick={clearHandler}>clear</Button>
					</ButtonGroup>
					<div
						className="Pen Black"
						onClick={() => setColor('Black')}
					></div>
					<div className="Pen Red" onClick={() => setColor('red')}></div>
					<div
						className="Pen Green"
						onClick={() => setColor('green')}
					></div>
					<div
						className="Pen Blue "
						onClick={() => setColor('blue')}
					></div>
				</Box>
				<ReactSketchCanvas
					ref={canvasRef}
					style={styles}
					width="1000"
					height="670"
					strokeWidth={4}
					strokeColor={color}
				/>
			</div>
		</g>
	);
};
