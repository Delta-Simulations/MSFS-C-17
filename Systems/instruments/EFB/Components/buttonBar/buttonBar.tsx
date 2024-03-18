import React from 'react';
import { AppBar, Tab, Tabs, Divider, ThemeProvider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { ButtonColour } from '../ThemesEFB';

export const ButtonBar = () => {
  const location = useLocation();

  const tabs = [
    { label: 'Aircraft', path: '/' },
    // { label: 'Cargo', path: '/Cargo' },
    { label: 'Manual', path: '/PDF' },
    { label: 'Browser', path: '/Browser' },
    { label: 'Settings', path: '/Settings' },
  ];

  const currentTab = tabs.findIndex((tab) => tab.path === location.pathname);

  return (
    <AppBar position="absolute" sx={{ borderRadius:1, top: 'auto', bottom: -2, backgroundColor: '#343a40' }}>
      <ThemeProvider theme={ButtonColour}>
  <Tabs
    value={currentTab}
    centered
    sx={{ indicator: { display: 'none' } }} // Hide the indicator
  >
        {tabs.map((tab, index) => (
          <React.Fragment key={index}>
            <Tab
			
              label={tab.label}
              component={Link}
              to={tab.path}
              disableRipple
              sx={{
                color: index === currentTab ? '#ffaa00' : 'inherit', // Change the text color for the selected tab
				fontSize: index === currentTab ? '17px' : '16px', // Adjust the font size for the selected tab
				boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.699)',

				fontWeight: index === currentTab ? 'bold' : 'normal',
              }}
            />
            {index < tabs.length - 1 && <Divider orientation="vertical" flexItem />}
          </React.Fragment>
        ))}
      </Tabs></ThemeProvider>
    </AppBar>
  );
};

export default ButtonBar;