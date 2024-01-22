class B747_8_FMC_LegsPage {
    static ShowPage1(fmc, currentPage = 1, step = 0) {
        fmc.clearDisplay();
        fmc.refreshPageCallback = () => {
            B747_8_FMC_LegsPage.ShowPage1(fmc, currentPage, step);
        };
        let pageCount = 1;
        let rows = [
            [""],
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
        let offset = Math.floor((currentPage - 1) * 5);
        let activeWaypoint = 0;
        let flightPlanManagerWaypoints = fmc.flightPlanManager.getWaypoints();
        if (flightPlanManagerWaypoints) {
            let waypoints = [...fmc.flightPlanManager.getWaypoints()];
            if (waypoints.length >= 2) {
                if (fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1) {
                    activeWaypoint = 1;
                }
                else {
                    activeWaypoint = fmc.flightPlanManager.getActiveWaypointIndex();
                }
                waypoints.pop();
                let firstApproachWaypointIndex = waypoints.length;
                let approachWaypoints = fmc.flightPlanManager.getApproachWaypoints();
                if (fmc.flightPlanManager.isActiveApproach()) {
                    activeWaypoint += waypoints.length;
                    firstApproachWaypointIndex = 0;
                }
                for (let i = 0; i < approachWaypoints.length; i++) {
                    waypoints.push(approachWaypoints[i]);
                }
                waypoints.splice(0, activeWaypoint);
                pageCount = Math.floor((waypoints.length - 1) / 5) + 1;
                for (let i = 0; i < 5; i++) {
                    let waypointFPIndex = i + offset + 1;
                    let waypoint = waypoints[i + offset];
                    if (waypoint) {
                        let prevWaypoint = fmc.flightPlanManager.getWaypoint(waypointFPIndex - 1, undefined, true);
                        let nextWaypoint = fmc.flightPlanManager.getWaypoint(waypointFPIndex + 1, undefined, true);
                        let isEnRouteWaypoint = false;
                        let isDepartureWaypoint = false;
                        let isLastDepartureWaypoint = false;
                        let isArrivalWaypoint = false;
                        let isFirstArrivalWaypoint = false;
                        let isApproachWaypoint = false;
                        if (i + offset >= fmc.flightPlanManager.getDepartureWaypointsCount() - activeWaypoint) {
                            if (i + offset < fmc.flightPlanManager.getEnRouteWaypointsLastIndex() - activeWaypoint) {
                                isEnRouteWaypoint = true;
                            }
                            else {
                                if (i + offset < firstApproachWaypointIndex) {
                                    if (waypointFPIndex === fmc.flightPlanManager.getEnRouteWaypointsLastIndex() + 1 - activeWaypoint) {
                                        isFirstArrivalWaypoint = true;
                                    }
                                    isArrivalWaypoint = true;
                                }
                                else {
                                    isApproachWaypoint = true;
                                }
                            }
                        }
                        else {
                            if (waypointFPIndex === fmc.flightPlanManager.getDepartureWaypointsCount() - activeWaypoint) {
                                isLastDepartureWaypoint = true;
                            }
                            isDepartureWaypoint = true;
                        }
                        let bearing = isFinite(waypoint.bearingInFP) ? fastToFixed(waypoint.bearingInFP, 0) + "°" : "";
                        let distance = isFinite(waypoint.cumulativeDistanceInFP) ? fastToFixed(waypoint.cumulativeDistanceInFP, 0) + "NM" : "";
                        rows[2 * i] = [bearing, distance];
                        rows[2 * i + 1] = [waypoint.ident != "" ? waypoint.ident : "USR"];
                        let ii = i;
                        fmc.onLeftInput[i] = () => {
                            let value = fmc.inOut;
                            if (value === "DELETE") {
                                fmc.inOut = "";
                                fmc.removeWaypoint(waypointFPIndex, () => {
                                    B747_8_FMC_LegsPage.ShowPage1(fmc, currentPage);
                                });
                            }
                            else if (value.length > 0) {
                                fmc.clearUserInput();
                                fmc.setBoeingDirectTo(value, ii + 1, (result) => {
                                    if (result) {
                                        fmc.activateRoute();
                                        B747_8_FMC_LegsPage.ShowPage1(fmc);
                                    }
                                    else {
                                        fmc.insertWaypoint(value, ii + 1, () => {
                                            B747_8_FMC_LegsPage.ShowPage1(fmc, currentPage);
                                        });
                                    }
                                });
                            }
                            else {
                                fmc.inOut = waypoint.ident;
                            }
                        };
                        if (B747_8_FMC_LegsPage.DEBUG_SHOW_WAYPOINT_PHASE) {
                            if (isDepartureWaypoint) {
                                rows[2 * i + 1][0] += " [DP]";
                                if (isLastDepartureWaypoint) {
                                    rows[2 * i + 1][0] += "*";
                                }
                            }
                            else if (isEnRouteWaypoint) {
                                rows[2 * i + 1][0] += " [ER]";
                            }
                            else if (isArrivalWaypoint) {
                                rows[2 * i + 1][0] += " [AR]";
                                if (isFirstArrivalWaypoint) {
                                    rows[2 * i + 1][0] += "*";
                                }
                            }
                            else if (isApproachWaypoint) {
                                rows[2 * i + 1][0] += " [AP]";
                            }
                        }
                        if (isEnRouteWaypoint) {
                            rows[2 * i + 1][1] = Math.round(fmc.getCrzManagedSpeed(true)) + "/ FL" + fmc.cruiseFlightLevel;
                        }
                        else {
                            let speedConstraint = "---";
                            if (waypoint.speedConstraint > 0) {
                                speedConstraint = fastToFixed(waypoint.speedConstraint, 0);
                            }
                            else {
                                if (isLastDepartureWaypoint || isArrivalWaypoint) {
                                    speedConstraint = fastToFixed(fmc.getCrzManagedSpeed(), 0);
                                }
                                else if (isDepartureWaypoint) {
                                    let d = (waypointFPIndex - 1) / (fmc.flightPlanManager.getDepartureWaypointsCount() - 1 - activeWaypoint);
                                    speedConstraint = fastToFixed((fmc.v2Speed * (1 - d) + fmc.getCrzManagedSpeed() * d), 0);
                                }
                                else if (isApproachWaypoint) {
                                    let predictedFlapsIndex = i + offset - (waypoints.length - 1) + 2;
                                    predictedFlapsIndex = Math.max(0, predictedFlapsIndex);
                                    console.log(waypoint.ident + " " + predictedFlapsIndex);
                                    speedConstraint = fastToFixed(fmc.getManagedApproachSpeed(predictedFlapsIndex), 0);
                                }
                            }
                            let altitudeConstraint = "-----";
                            if (waypoint.legAltitudeDescription !== 0) {
                                if (waypoint.legAltitudeDescription !== 0) {
                                    if (waypoint.legAltitudeDescription === 1) {
                                        altitudeConstraint = waypoint.getLegAltitude1Text();
                                    }
                                    if (waypoint.legAltitudeDescription === 2) {
                                        altitudeConstraint = waypoint.getLegAltitude1Text() + "A";
                                    }
                                    if (waypoint.legAltitudeDescription === 3) {
                                        altitudeConstraint = waypoint.getLegAltitude1Text() + "B";
                                    }
                                    else if (waypoint.legAltitudeDescription === 4) {
                                        altitudeConstraint = "*" + waypoint.getLegAltitude1Text() + "B";
                                    }
                                }
                            }
                            else if (isDepartureWaypoint) {
                                if (isLastDepartureWaypoint) {
                                    altitudeConstraint = "FL" + fmc.cruiseFlightLevel;
                                }
                                else {
                                    altitudeConstraint = fastToFixed(Math.floor(waypoint.cumulativeDistanceInFP * 0.14 * 6076.118 / 10), 0) + "0";
                                }
                            }
                            else {
                                if (isLastDepartureWaypoint || isFirstArrivalWaypoint) {
                                    altitudeConstraint = "FL" + fmc.cruiseFlightLevel;
                                }
                            }
                            rows[2 * i + 1][1] = speedConstraint + "/ " + altitudeConstraint;
                        }
                    }
                    else if (i + offset === waypoints.length) {
                        rows[2 * i] = ["-----"];
                        fmc.onLeftInput[i] = async () => {
                            let value = fmc.inOut;
                            if (value.length > 0) {
                                fmc.clearUserInput();
                                fmc.insertWaypoint(value, fmc.flightPlanManager.getEnRouteWaypointsLastIndex() + 1, () => {
                                    B747_8_FMC_LegsPage.ShowPage1(fmc, currentPage);
                                });
                            }
                        };
                    }
                }
            }
        }
        fmc.currentFlightPlanWaypointIndex = activeWaypoint + offset + step;
        let activateCell = "";
        if (fmc.flightPlanManager.getCurrentFlightPlanIndex() === 1 && !fmc.getIsRouteActivated()) {
            activateCell = "ACTIVATE>";
            fmc.onRightInput[5] = () => {
                fmc.activateRoute();
                B747_8_FMC_LegsPage.ShowPage1(fmc, currentPage);
            };
        }
        else {
            let isMapModePlan = SimVar.GetSimVarValue("L:B747_MAP_MODE", "number") === 3;
            if (isMapModePlan) {
                activateCell = "STEP>";
                if (rows[2 * step + 1][0] != "") {
                    if (!rows[2 * step + 1][1]) {
                        rows[2 * step + 1][1] = "";
                    }
                    rows[2 * step + 1][2] = "<CTR>";
                }
                else {
                    if (step != 0) {
                        return B747_8_FMC_LegsPage.ShowPage1(fmc, 1, 0);
                    }
                }
                fmc.onRightInput[5] = () => {
                    let newStep = step + 1;
                    let newPage = currentPage;
                    if (newStep > 4) {
                        newStep = 0;
                        newPage++;
                    }
                    if (newPage > pageCount) {
                        newPage = 1;
                    }
                    B747_8_FMC_LegsPage.ShowPage1(fmc, newPage, newStep);
                };
            }
            else {
                activateCell = "RTE DATA>";
                fmc.onRightInput[5] = () => {
                    FMCRoutePage.ShowPage2(fmc);
                };
            }
        }
        fmc.setTemplate([
            [(fmc.getIsRouteActivated() ? "MOD" : "ACT") + " RTE 1 LEGS", fastToFixed(currentPage, 0), fastToFixed(pageCount, 0)],
            ...rows,
            ["__FMCSEPARATOR"],
            ["\<RTE 2 LEGS", activateCell]
        ]);
        fmc.onPrevPage = () => {
            if (currentPage > 1) {
                B747_8_FMC_LegsPage.ShowPage1(fmc, currentPage - 1);
            }
        };
        fmc.onNextPage = () => {
            if (currentPage < pageCount) {
                B747_8_FMC_LegsPage.ShowPage1(fmc, currentPage + 1);
            }
        };
    }
}
B747_8_FMC_LegsPage.DEBUG_SHOW_WAYPOINT_PHASE = false;
//# sourceMappingURL=B747_8_FMC_LegsPage.js.map