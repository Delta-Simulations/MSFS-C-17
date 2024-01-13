import React, { useEffect, useReducer, useState } from 'react';
import Button from '@mui/material/Button';
import GetImageFromPDF from './getImageFromPDF';
import './pdf.scss';
import { usePersistentProperty } from '../../../Hooks/persistence';
import Bookmarks from './bookmarks';
import { ButtonColour } from '../ThemesEFB';
import { Box, Stack, ThemeProvider } from '@mui/material';
import { useSimVar } from '../../../Hooks/simVars';

export const MANUAL = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [_, forceReRender] = useReducer((x) => x + 1, 0);
	const [bookmarks, setBookmarks] = useState(() => {
		var saved = localStorage.getItem('bookmarks');
		const initalValue = JSON.parse(saved);
		return initalValue || [];
	});
	const [invert, setInvert] = useSimVar('L:C17_EFB_FM_INVERT', 'bool');
	const totalPages: number = 68; // Total number of images
	const [FMMode, setFMMode] = useSimVar('L:C17_EFB_FM_TYPE', 'bool');

	const navigateToPage = (pageNumber: number): void => {
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber);
		}
	};
	const handleNextPage = (): void => {
		navigateToPage(currentPage + 2);
	};
	const handleInvert = (): void => {
		setInvert(!invert);
	};
	const handlePreviousPage = (): void => {
		navigateToPage(currentPage - 2);
	};

	const bookmarkPageAdd = (page: number): void => {
		if (bookmarks.includes(page)) {
			console.log('already a bookmark');
			return;
		}
		let prev = bookmarks;
		prev.push(page);
		setBookmarks(prev);
		forceReRender();
	};
	const bookmarkPageRemove = (page): void => {
		if (bookmarks.length === 0) {
			bookmarks.shift();
			return;
		}
		const index = bookmarks.indexOf(page);
		bookmarks.splice(index, 1);
		setBookmarks(bookmarks);
		forceReRender();
	};



	useEffect(() => {
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}, [bookmarks]);

	return (
		<div className="PDFContainer">
			<g style={{ display: FMMode ? 'none' : 'block' }}>
			<GetImageFromPDF invertColors={invert} page={currentPage} /></g>
			<g style={{ display: FMMode ? 'block' : 'none' }}>
				<img
					className={invert ? 'invert' : ''}
					src={`/Images/FM/QuickRef.jpg`}
					style={{ maxWidth: '88%', justifyContent:'center'}}
				/></g>
			<ThemeProvider theme={ButtonColour}>
			<Box
				sx={{
					position: 'absolute',
					width: 1040,
					height: 40,
					left: 200,
					top: 710,
					justifyContent: 'Left',
					display: 'flex',
					textAlign: 'center',
					fontSize: 14,
				}}
			>
			<Stack direction="row" spacing={1}>
			<Button
				size="small"

				variant="contained"
				onClick={handlePreviousPage}
			>
				&lt;
			</Button>
			<h2 style={{color: '#aeb0b3' }}>Page {currentPage} and {currentPage + 1} of {totalPages}</h2>
			<Button
				size="small"
				variant="contained"
				onClick={handleInvert}
			>
				Invert Colors
			</Button>
			<Button
				size="small"
				variant="contained"
				onClick={() => setFMMode(!FMMode)}
			>
				{FMMode ? 'Flight Manual' : 'Checklist'}
			</Button>
			<Button
				size="small"
				variant="contained"
				onClick={() =>
					bookmarks.includes(currentPage)
						? bookmarkPageRemove(currentPage)
						: bookmarkPageAdd(currentPage)
				}
			>
				{bookmarks.includes(currentPage) ? 'Remove' : 'Add'} Bookmark
			</Button>
			<Button
				size="small"
				variant="contained"
				onClick={handleNextPage}
			>
				&gt;
			</Button>
			
			</Stack>
			
			</Box>


			</ThemeProvider>
			
		</div>
	);
};
