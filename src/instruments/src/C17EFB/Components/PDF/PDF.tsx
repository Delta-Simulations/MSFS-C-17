import React, { useEffect, useReducer, useState } from 'react';
import Button from '@mui/material/Button';
import GetImageFromPDF from './getImageFromPDF';
import './pdf.scss';
import { usePersistentProperty } from '../../../Hooks/persistence';
import Bookmarks from './bookmarks';

export const MANUAL = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [_, forceReRender] = useReducer((x) => x + 1, 0);
	const [bookmarks, setBookmarks] = useState(() => {
		const saved = localStorage.getItem('bookmarks');
		const initalValue = JSON.parse(saved);
		return initalValue || [];
	});
	const [invert, setInvert] = useState(false);
	const totalPages: number = 68; // Total number of images

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
		if (bookmarks.length == 0) {
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
			<GetImageFromPDF invertColors={invert} page={currentPage} />
			<Button
				size="small"
				className="previousPage"
				variant="contained"
				onClick={handlePreviousPage}
			>
				&lt;
			</Button>
			<div className="pageDisplay">
				Page {currentPage} and {currentPage + 1} of {totalPages}
			</div>
			<Button
				size="small"
				className="nextPage"
				variant="contained"
				onClick={handleNextPage}
			>
				&gt;
			</Button>
			<Button
				className="invertButton"
				variant="contained"
				onClick={handleInvert}
			>
				Invert Colors
			</Button>
			<Button
				className="addToBookmarks"
				onClick={() =>
					bookmarks.includes(currentPage)
						? bookmarkPageRemove(currentPage)
						: bookmarkPageAdd(currentPage)
				}
			>
				{bookmarks.includes(currentPage) ? 'Remove' : 'Add'} Bookmark
			</Button>
			<Bookmarks navigateTo={navigateToPage} pages={bookmarks} />
		</div>
	);
};
