import React from 'react';
import './style.scss';
import { render } from '../Hooks';
import { Home } from './Components/home/home';
import { MemoryRouter, Route, Routes } from 'react-router';
import { ButtonBar } from './Components/buttonBar/buttonBar';
import { Map } from './Components/map/map';
import { Airctaft } from './Components/aircraft/aircraft';

import { Checklist } from './Components/Checklist/checklist';
import { Traditional } from './Components/Checklist/traditional/traditional';
import { Emergency } from './Components/Checklist/emergency/emergency';
import { BrowserRouter } from 'react-router-dom';
import {
	BeforeLanding,
	BeforeStart,
	BeforeTakeoff,
	BeforeTaxi,
	CockpitCheck,
	EngineRunup,
	EngineStart,
	Shutdown,
} from './Components/Checklist/traditional/traditionalChecklists/traditionalChecklist';
import { Browser } from './Components/browser/browser';
import { EfbPower } from '../Common/circuit';
import { Settings } from './Components/settings/settings';
const C17EFB = () => {
	return (
		<MemoryRouter>
			<EfbPower localVar="EFB_MOVE">
				<div className="EFBContainer">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/checklist" element={<Checklist />}>
							<Route path="traditional" element={<Traditional />}>
								<Route path="BeforeStart" element={<BeforeStart />} />
								<Route path="CockpitCheck" element={<CockpitCheck />} />
								<Route path="EngineStart" element={<EngineStart />} />
								<Route path="EngineRunup" element={<EngineRunup />} />
								<Route path="BeforeTaxi" element={<BeforeTaxi />} />
								<Route
									path="BeforeTakeoff"
									element={<BeforeTakeoff />}
								/>
								<Route
									path="BeforeLanding"
									element={<BeforeLanding />}
								/>
								<Route path="Shutdown" element={<Shutdown />} />
							</Route>
							<Route path="emergency" element={<Emergency />} />
						</Route>
						<Route path="/Aircraft" element={<Airctaft />} />
						<Route path="/Browser" element={<Browser />} />
						<Route path="/Map" element={<Map />} />
						<Route path="/Settings" element={<Settings />} />
					</Routes>
					<ButtonBar />
				</div>
			</EfbPower>
		</MemoryRouter>
	);
};
render(<C17EFB />);
