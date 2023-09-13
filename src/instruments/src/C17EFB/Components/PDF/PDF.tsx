import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '../aircraft/aircraft.scss';

export const MANUAL = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 68; // Total number of images

  const navigateToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderImages = () => {
    const page1Src = `/Images/FM/DeltaSim C17 FLIGHT MANUAL-${String(currentPage).padStart(2, '0')}.png`;
    const page2Src = `/Images/FM/DeltaSim C17 FLIGHT MANUAL-${String(currentPage + 1).padStart(2, '0')}.png`;

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <img
            src={page1Src}
            alt={`Page ${currentPage}`}
            style={{ maxWidth: '100%' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <img
            src={page2Src}
            alt={`Page ${currentPage + 1}`}
            style={{ maxWidth: '100%' }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="PDFContainer" >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigateToPage(currentPage - 2)}>Previous</button>
        <span>Page {currentPage} and {currentPage + 1} of {totalPages}</span>
        <button onClick={() => navigateToPage(currentPage + 2)}>Next</button>
      </div>

      <div>
        {renderImages()}
      </div>
    </div>
  );
};