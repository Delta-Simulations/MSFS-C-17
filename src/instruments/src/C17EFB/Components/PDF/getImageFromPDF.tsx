import React, { FC } from 'react';
import './pdf.scss';

interface getImageFromPDFProps {
	page: number;
	invertColors: boolean;
	FMMode: boolean;
}

const GetImageFromPDF: FC<getImageFromPDFProps> = (props: any): JSX.Element => {
	let page1Src;
	let page2Src;
	let pageSrc;
	if (props.FMMode === false) {
		page1Src = `/Images/FM/DeltaSim C17 MASTER_page-00${String(props.page).padStart(2, '0')}.jpg`;
		page2Src = `/Images/FM/DeltaSim C17 MASTER_page-00${String(
			props.page + 1
		).padStart(2, '0')}.jpg`;
	} else {

		pageSrc = `/Images/FM/C17_Checklist-images-${String(Math.floor(props.page / 2))}.jpg`;


	}

	return (
		<div>
			<div style={{visibility: props.FMMode ? 'visible' : 'hidden' }}>
				<img
					className={`${props.invertColors ? 'invert' : ''}`}
					src={pageSrc}
					alt={`Page ${props.page}`}
					style={{ maxWidth: '100%', marginTop: '20px' }}

				/>

			</div>
			<div style={{ paddingTop: '30px', display: 'flex', visibility: props.FMMode ? 'hidden' : 'visible' }}>
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
			<div>




			</div>

		</div>
	);
};
export default GetImageFromPDF;
