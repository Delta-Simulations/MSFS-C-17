import { Button } from '@mui/material';
import React, { FC, useState } from 'react';
import './pdf.scss';

interface BookmarksProps {
	pages: Array<number>;
	navigateTo: any;
}

const Bookmarks: FC<BookmarksProps> = (props: any): JSX.Element => {
	const [bookmarkMenu, setBookmarkMenu] = useState(false);
	return (
		<div style={{ position: 'absolute', top: '30%' }}>
			<Button
				onClick={() => setBookmarkMenu(!bookmarkMenu)}
				variant="contained"
				className="bookmarkButton"
			>
				Bookmarks
			</Button>
			<div className={`dropdown ${bookmarkMenu ? 'shown' : 'hidden'}`}>
				<ul>
					{props.pages.map((pages, index) => (
						<li className="bookmarkItem">
							<button
								className="bookmarkItemButton"
								onClick={() => props.navigateTo(pages)}
								key={index}
							>
								Page:{pages}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Bookmarks;
