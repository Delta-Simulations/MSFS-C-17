class B747_8_FMC_DepArrIndexPage {
    static ShowPage1(fmc) {
        fmc.clearDisplay();
        let rowOrigin = [""];
        let origin = fmc.flightPlanManager.getOrigin();
        if (origin) {
            rowOrigin = ["\<DEP", "", origin.ident];
            fmc.onLeftInput[0] = () => {
                B747_8_FMC_DepArrIndexPage.ShowDeparturePage(fmc);
            };
        }
        let rowDestination = [""];
        let destination = fmc.flightPlanManager.getDestination();
        if (destination) {
            rowDestination = ["", "<ARR", destination.ident];
            fmc.onRightInput[1] = () => {
                B747_8_FMC_DepArrIndexPage.ShowArrivalPage(fmc);
            };
        }
        fmc.setTemplate([
            ["DEP/ARR INDEX"],
            ["", "", "ACT FPLN"],
            rowOrigin,
            [""],
            rowDestination,
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""]
        ]);
    }
    static ShowDeparturePage(fmc, currentPage = 1) {
        fmc.clearDisplay();
        let originIdent = "";
        let origin = fmc.flightPlanManager.getOrigin();
        if (origin) {
            originIdent = origin.ident;
        }
        let rows = [
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""]
        ];
        let runways = [];
        let displayableRunwaysCount = 0;
        let departures = [];
        let selectedDeparture;
        let displayableDeparturesCount = 0;
        let selectedRunway = fmc.flightPlanManager.getDepartureRunway();
        if (origin) {
            let airportInfo = origin.infos;
            if (airportInfo instanceof AirportInfo) {
                let departureRunway = fmc.flightPlanManager.getDepartureRunway();
                if (departureRunway) {
                    selectedRunway = departureRunway;
                }
                runways = airportInfo.oneWayRunways;
                selectedDeparture = airportInfo.departures[fmc.flightPlanManager.getDepartureProcIndex()];
                departures = airportInfo.departures;
            }
        }
        if (selectedRunway) {
            rows[0] = ["", "<SEL> " + Avionics.Utils.formatRunway(selectedRunway.designation)];
            fmc.onRightInput[0] = () => {
                fmc.setRunwayIndex(-1, (success) => {
                    fmc.activateRoute();
                    B747_8_FMC_DepArrIndexPage.ShowDeparturePage(fmc);
                });
            };
        }
        else {
            let i = 0;
            let rowIndex = -5 * (currentPage - 1);
            while (i < runways.length) {
                let runway = runways[i];
                let appendRow = false;
                let index = i;
                if (!selectedDeparture) {
                    appendRow = true;
                    displayableRunwaysCount++;
                }
                else {
                    for (let j = 0; j < selectedDeparture.runwayTransitions.length; j++) {
                        if (selectedDeparture.runwayTransitions[j].name.indexOf(runway.designation) !== -1) {
                            appendRow = true;
                            displayableRunwaysCount++;
                            index = j;
                            break;
                        }
                    }
                }
                if (appendRow) {
                    if (rowIndex >= 0 && rowIndex < 5) {
                        rows[2 * rowIndex] = ["", Avionics.Utils.formatRunway(runway.designation)];
                        fmc.onRightInput[rowIndex] = () => {
                            if (fmc.flightPlanManager.getDepartureProcIndex() === -1) {
                                fmc.setOriginRunwayIndex(index, () => {
                                    fmc.activateRoute();
                                    B747_8_FMC_DepArrIndexPage.ShowDeparturePage(fmc, undefined);
                                });
                            }
                            else {
                                fmc.setRunwayIndex(index, () => {
                                    fmc.activateRoute();
                                    B747_8_FMC_DepArrIndexPage.ShowDeparturePage(fmc, undefined);
                                });
                            }
                        };
                    }
                    rowIndex++;
                }
                i++;
            }
        }
        if (selectedDeparture) {
            rows[0][0] = selectedDeparture.name + " <SEL>";
            fmc.onLeftInput[0] = () => {
                fmc.setDepartureIndex(-1, () => {
                    fmc.activateRoute();
                    B747_8_FMC_DepArrIndexPage.ShowDeparturePage(fmc);
                });
            };
        }
        else {
            let i = 0;
            let rowIndex = -5 * (currentPage - 1);
            while (i < departures.length) {
                let departure = departures[i];
                let appendRow = false;
                if (!selectedRunway) {
                    appendRow = true;
                    displayableDeparturesCount++;
                }
                else {
                    for (let j = 0; j < departure.runwayTransitions.length; j++) {
                        if (departure.runwayTransitions[j].name.indexOf(selectedRunway.designation) !== -1) {
                            appendRow = true;
                            displayableDeparturesCount++;
                            break;
                        }
                    }
                }
                if (appendRow) {
                    if (rowIndex >= 0 && rowIndex < 5) {
                        let ii = i;
                        rows[2 * rowIndex][0] = departure.name;
                        fmc.onLeftInput[rowIndex] = () => {
                            fmc.setDepartureIndex(ii, () => {
                                fmc.activateRoute();
                                B747_8_FMC_DepArrIndexPage.ShowDeparturePage(fmc);
                            });
                        };
                    }
                    rowIndex++;
                }
                i++;
            }
        }
        let rowsCount = Math.max(displayableRunwaysCount, displayableDeparturesCount);
        let pageCount = Math.floor(rowsCount / 5) + 1;
        fmc.setTemplate([
            [originIdent + " DEPARTURES", fastToFixed(currentPage, 0), fastToFixed(pageCount, 0)],
            ["SIDS", "RUNWAYS", "RTE 1"],
            ...rows,
            ["__FMCSEPARATOR"],
            ["\<INDEX", "ROUTE>"]
        ]);
        fmc.onLeftInput[5] = () => { B747_8_FMC_DepArrIndexPage.ShowPage1(fmc); };
        fmc.onRightInput[5] = () => { FMCRoutePage.ShowPage1(fmc); };
        fmc.onPrevPage = () => {
            if (currentPage > 0) {
                B747_8_FMC_DepArrIndexPage.ShowDeparturePage(fmc, currentPage - 1);
            }
        };
        fmc.onNextPage = () => {
            if (currentPage < pageCount) {
                B747_8_FMC_DepArrIndexPage.ShowDeparturePage(fmc, currentPage + 1);
            }
        };
    }
    static ShowArrivalPage(fmc, currentPage = 1) {
        fmc.clearDisplay();
        let destinationIdent = "";
        let destination = fmc.flightPlanManager.getDestination();
        if (destination) {
            destinationIdent = destination.ident;
        }
        let rows = [
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""]
        ];
        let approaches = [];
        let selectedApproach;
        let displayableApproachesCount = 0;
        let arrivals = [];
        let selectedArrival;
        let displayableArrivalsCount = 0;
        if (destination) {
            let airportInfo = destination.infos;
            if (airportInfo instanceof AirportInfo) {
                selectedApproach = airportInfo.approaches[fmc.flightPlanManager.getApproachIndex()];
                approaches = airportInfo.approaches;
                selectedArrival = airportInfo.arrivals[fmc.flightPlanManager.getArrivalProcIndex()];
                arrivals = airportInfo.arrivals;
            }
        }
        if (selectedApproach) {
            rows[0] = ["", "<SEL> " + Avionics.Utils.formatRunway(selectedApproach.name)];
            fmc.onRightInput[0] = () => {
                fmc.setApproachIndex(-1, () => {
                    fmc.activateRoute();
                    B747_8_FMC_DepArrIndexPage.ShowArrivalPage(fmc);
                });
            };
            rows[1] = ["", "TRANS"];
            let selectedTransitionIndex = fmc.flightPlanManager.getApproachTransitionIndex();
            let selectedTransition = selectedApproach.transitions[selectedTransitionIndex];
            if (selectedTransition) {
                rows[2] = ["", "<SEL> " + selectedTransition.waypoints[0].infos.icao.substr(5)];
                fmc.onRightInput[1] = () => {
                    fmc.setApproachTransitionIndex(-1, () => {
                        fmc.activateRoute();
                        B747_8_FMC_DepArrIndexPage.ShowArrivalPage(fmc, currentPage);
                    });
                };
            }
            else {
                for (let i = 0; i < 4; i++) {
                    let index = i;
                    let transition = selectedApproach.transitions[index];
                    if (transition) {
                        let name = transition.waypoints[0].infos.icao.substr(5);
                        rows[2 * (i + 1)][1] = name;
                        fmc.onRightInput[i + 1] = () => {
                            fmc.setApproachTransitionIndex(index, () => {
                                fmc.activateRoute();
                                B747_8_FMC_DepArrIndexPage.ShowArrivalPage(fmc, currentPage);
                            });
                        };
                    }
                }
            }
        }
        else {
            let i = 0;
            let rowIndex = -5 * (currentPage - 1);
            while (i < approaches.length) {
                let approach = approaches[i];
                let appendRow = false;
                if (!selectedArrival) {
                    appendRow = true;
                    displayableApproachesCount++;
                }
                else {
                    for (let j = 0; j < selectedArrival.runwayTransitions.length; j++) {
                        if (selectedArrival.runwayTransitions[j].name.replace("RW", "") === approach.runway) {
                            appendRow = true;
                            displayableApproachesCount++;
                            break;
                        }
                    }
                    if (selectedArrival.runwayTransitions.length === 0) {
                        appendRow = true;
                        displayableApproachesCount++;
                    }
                }
                if (appendRow) {
                    if (rowIndex >= 0 && rowIndex < 5) {
                        let ii = i;
                        rows[2 * rowIndex] = ["", Avionics.Utils.formatRunway(approach.name)];
                        fmc.onRightInput[rowIndex] = () => {
                            fmc.setApproachIndex(ii, () => {
                                fmc.activateRoute();
                                B747_8_FMC_DepArrIndexPage.ShowArrivalPage(fmc);
                            });
                        };
                    }
                    rowIndex++;
                }
                i++;
            }
        }
        if (selectedArrival) {
            rows[0][0] = selectedArrival.name + " <SEL>";
            fmc.onLeftInput[0] = () => {
                fmc.setArrivalProcIndex(-1, () => {
                    fmc.activateRoute();
                    B747_8_FMC_DepArrIndexPage.ShowArrivalPage(fmc);
                });
            };
        }
        else {
            let i = 0;
            let rowIndex = -5 * (currentPage - 1);
            while (i < arrivals.length) {
                let arrival = arrivals[i];
                let appendRow = false;
                if (!selectedApproach) {
                    appendRow = true;
                    displayableArrivalsCount++;
                }
                else {
                    for (let j = 0; j < arrival.runwayTransitions.length; j++) {
                        if (arrival.runwayTransitions[j].name.replace("RW", "") === selectedApproach.runway) {
                            appendRow = true;
                            displayableArrivalsCount++;
                            break;
                        }
                    }
                    if (arrival.runwayTransitions.length === 0) {
                        appendRow = true;
                        displayableArrivalsCount++;
                    }
                }
                if (appendRow) {
                    if (rowIndex >= 0 && rowIndex < 5) {
                        let ii = i;
                        rows[2 * rowIndex][0] = arrival.name;
                        fmc.onLeftInput[rowIndex] = () => {
                            fmc.setArrivalProcIndex(ii, () => {
                                fmc.activateRoute();
                                B747_8_FMC_DepArrIndexPage.ShowArrivalPage(fmc);
                            });
                        };
                    }
                    rowIndex++;
                }
                i++;
            }
        }
        let rowsCount = Math.max(displayableApproachesCount, displayableArrivalsCount);
        let pageCount = Math.floor(rowsCount / 5) + 1;
        fmc.setTemplate([
            [destinationIdent + " ARRIVALS", fastToFixed(currentPage, 0), fastToFixed(pageCount, 0)],
            ["STAR", "APPROACH", "RTE 1"],
            ...rows,
            ["__FMCSEPARATOR"],
            ["\<INDEX", "ROUTE>"]
        ]);
        fmc.onLeftInput[5] = () => { B747_8_FMC_DepArrIndexPage.ShowPage1(fmc); };
        fmc.onRightInput[5] = () => { FMCRoutePage.ShowPage1(fmc); };
        fmc.onPrevPage = () => {
            if (currentPage > 0) {
                B747_8_FMC_DepArrIndexPage.ShowArrivalPage(fmc, currentPage - 1);
            }
        };
        fmc.onNextPage = () => {
            if (currentPage < pageCount) {
                B747_8_FMC_DepArrIndexPage.ShowArrivalPage(fmc, currentPage + 1);
            }
        };
    }
}
//# sourceMappingURL=B747_8_FMC_DepArrIndexPage.js.map