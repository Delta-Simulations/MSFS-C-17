import { Button } from '@mui/material';
import React, { FC, useState } from 'react';

interface BookmarksProps {
	pages: Array<number>;
	navigateTo: any;
}

const Bookmarks: FC<BookmarksProps> = (props: any): JSX.Element => {
	const [bookmarkMenu, setBookmarkMenu] = useState(false);
	return (
		<div style={{ position: 'absolute', top: '30%' }}>
			<Button>Bookmarks</Button>
			<div className={`dropdown ${bookmarkMenu ? 'shown' : 'hidden'}`}>
				<ul>
					{props.pages.map((pages, index) => (
						<li onClick={() => props.navigateTo(pages)} key={index}>
							{pages}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Bookmarks;
