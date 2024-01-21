class FMCApproachPage {
    static ShowPage1(fmc) {
        fmc.clearDisplay();
        let landingWeightCell = "";
        let flaps25Cell = "";
        let flaps30Cell = "";
        let flaps25VRefCell = "";
        let flaps30VRefCell = "";
        let landingWeight = fmc.getWeight(true);
        if (isFinite(landingWeight)) {
            landingWeightCell = fastToFixed(landingWeight, 1);
            flaps25Cell = "25°";
            flaps30Cell = "30°";
            let flaps25Speed = fmc.getSlatApproachSpeed(true);
            if (isFinite(flaps25Speed)) {
                flaps25VRefCell = fastToFixed(flaps25Speed, 0) + "KT";
                fmc.onRightInput[0] = () => {
                    fmc.inOut = "25/" + fastToFixed(flaps25Speed, 0);
                };
            }
            let flaps30Speed = fmc.getFlapApproachSpeed(true);
            if (isFinite(flaps30Speed)) {
                flaps30VRefCell = fastToFixed(flaps30Speed, 0) + "KT";
                fmc.onRightInput[1] = () => {
                    fmc.inOut = "30/" + fastToFixed(flaps30Speed, 0);
                };
            }
        }
        let finalCell = "-----";
        let runwayLengthCell = "---";
        let approach = fmc.flightPlanManager.getApproach();
        if (approach && approach.name) {
            finalCell = Avionics.Utils.formatRunway(approach.name);
            let approachRunway = fmc.flightPlanManager.getApproachRunway();
            if (approachRunway) {
                runwayLengthCell = fastToFixed(approachRunway.length, 0) + "M";
            }
        }
        let selectedFlapSpeedCell = "";
        if (isFinite(fmc.selectedApproachFlap)) {
            selectedFlapSpeedCell = fastToFixed(fmc.selectedApproachFlap, 0) + "°";
        }
        else {
            selectedFlapSpeedCell = "---";
        }
        selectedFlapSpeedCell += "/ ";
        if (isFinite(fmc.selectedApproachSpeed)) {
            selectedFlapSpeedCell += fastToFixed(fmc.selectedApproachSpeed, 0) + "KT";
        }
        else {
            selectedFlapSpeedCell += "---";
        }
        fmc.onRightInput[3] = () => {
            let value = fmc.inOut;
            fmc.clearUserInput();
            if (fmc.setSelectedApproachFlapSpeed(value)) {
                FMCApproachPage.ShowPage1(fmc);
            }
        };
        fmc.setTemplate([
            ["APPROACH REF"],
            ["GROSS WT", "VREF", "FLAPS"],
            [landingWeightCell, flaps25VRefCell, flaps25Cell],
            [""],
            ["", flaps30VRefCell, flaps30Cell],
            ["QNH LANDING"],
            [""],
            [finalCell, "FLAP/SPD"],
            [runwayLengthCell, selectedFlapSpeedCell],
            [""],
            [""],
            ["__FMCSEPARATOR"],
            ["\<INDEX", "THRUST LIM>"]
        ]);
        fmc.onLeftInput[5] = () => { B747_8_FMC_InitRefIndexPage.ShowPage1(fmc); };
        fmc.onRightInput[5] = () => { FMCThrustLimPage.ShowPage1(fmc); };
    }
}
//# sourceMappingURL=B747_8_FMC_ApproachPage.js.map