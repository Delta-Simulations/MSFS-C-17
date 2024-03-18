import React, { FC } from 'react';
import './pdf.scss';

interface getImageFromPDFProps {
	page: number;
	invertColors: boolean;
}

const GetImageFromPDF: FC<getImageFromPDFProps> = (props: any): JSX.Element => {
	let page1Src = `/Images/FM/DeltaSim C17 MASTER_page-00${String(props.page).padStart(2, '0')}.jpg`;
	let page2Src = `/Images/FM/DeltaSim C17 MASTER_page-00${String(
		props.page + 1
	).padStart(2, '0')}.jpg`;

	return (
		<div style={{ paddingTop: '30px', display: 'flex' }}>
			<div style={{ flex: 1 }}>
				<img
					className={`${props.invertColors ? 'invert' : ''}`}
					src={page1Src}
					alt={`Page ${props.page}`}
					style={{ maxWidth: '100%' }}
				/>
			</div>
			<div style={{ flex: 1 }}>
				<img
					className={`${props.invertColors ? 'invert' : ''}`}
					src={page2Src}
					alt={`Page ${props.page + 1}`}
					style={{ maxWidth: '100%' }}
				/>
			</div>
		</div>
	);
};
export default GetImageFromPDF;
