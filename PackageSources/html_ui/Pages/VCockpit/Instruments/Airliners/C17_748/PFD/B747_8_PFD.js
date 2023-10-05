class B747_8_PFD extends BaseAirliners {
    constructor() {
        super();
        this.initDuration = 7000;
    }
    get templateID() { return "B747_8_PFD"; }
    get IsGlassCockpit() { return true; }
    connectedCallback() {
        super.connectedCallback();
        this.pageGroups = [
            new NavSystemPageGroup("Main", this, [
                new B747_8_PFD_MainPage()
            ]),
        ];
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    onUpdate(_deltaTime) {
        super.onUpdate(_deltaTime);
    }
}
class B747_8_PFD_MainElement extends NavSystemElement {
    init(root) {
    }
    onEnter() {
    }
    onUpdate(_deltaTime) {
    }
    onExit() {
    }
    onEvent(_event) {
    }
}
class B747_8_PFD_MainPage extends NavSystemPage {
    constructor() {
        super("Main", "Mainframe", new B747_8_PFD_MainElement());
        this.element = new NavSystemElementGroup([
            new B747_8_PFD_Attitude(),
            new B747_8_PFD_VSpeed(),
            new B747_8_PFD_Airspeed(),
            new B747_8_PFD_Altimeter(),
            new B747_8_PFD_Compass(),
            new B747_8_PFD_ILS(),
            new B747_8_PFD_FMA()
        ]);
    }
    init() {
        super.init();
    }
    onEvent(_event) {
        super.onEvent(_event);
    }
}
class B747_8_PFD_VSpeed extends NavSystemElement {
    init(root) {
        this.vsi = this.gps.getChildById("VSpeed");
        this.vsi.aircraft = Aircraft.B747_8;
        this.vsi.gps = this.gps;
    }
    onEnter() {
    }
    onUpdate(_deltaTime) {
        var vSpeed = Math.round(Simplane.getVerticalSpeed());
        diffAndSetAttribute(this.vsi, "vspeed", vSpeed + '');
        if (Simplane.getAutoPilotVerticalSpeedHoldActive()) {
            var selVSpeed = Math.round(Simplane.getAutoPilotVerticalSpeedHoldValue());
            diffAndSetAttribute(this.vsi, "selected_vspeed", selVSpeed + '');
            diffAndSetAttribute(this.vsi, "selected_vspeed_active", "true");
        }
        else {
            diffAndSetAttribute(this.vsi, "selected_vspeed_active", "false");
        }
    }
    onExit() {
    }
    onEvent(_event) {
    }
}
class B747_8_PFD_Airspeed extends NavSystemElement {
    constructor() {
        super();
    }
    init(root) {
        this.airspeed = this.gps.getChildById("Airspeed");
        this.airspeed.aircraft = Aircraft.B747_8;
        this.airspeed.gps = this.gps;
    }
    onEnter() {
    }
    onUpdate(_deltaTime) {
        this.airspeed.update(_deltaTime);
    }
    onExit() {
    }
    onEvent(_event) {
    }
}
class B747_8_PFD_Altimeter extends NavSystemElement {
    constructor() {
        super();
        this.isMTRSActive = false;
        this.lastTimeKnobUsed = 0;
        this.lastTimeKnobUsedHits = 0;
        this.resetState = false;
    }
    init(root) {
        this.altimeter = this.gps.getChildById("Altimeter");
        this.altimeter.aircraft = Aircraft.B747_8;
        this.altimeter.gps = this.gps;
    }
    onEnter() {
    }
    onUpdate(_deltaTime) {
        this.altimeter.update(_deltaTime);
    }
    onExit() {
    }
    onEvent(_event) {
        let increment = 1;
        if (Date.now() - this.lastTimeKnobUsed < 300) {
            if (this.lastTimeKnobUsedHits > 3) {
                increment = 10;
            }
            this.lastTimeKnobUsedHits++;
        }
        else {
            increment = 1;
            this.lastTimeKnobUsedHits = 0;
        }
        this.lastTimeKnobUsed = Date.now();
        const decisionHeightMode = Simplane.getMinimumReferenceMode();
        switch (_event) {
            case "BARO_INC":
                SimVar.SetSimVarValue("K:KOHLSMAN_INC", "number", 1);
                break;
            case "BARO_DEC":
                SimVar.SetSimVarValue("K:KOHLSMAN_DEC", "number", 1);
                break;
            case "MTRS":
                this.isMTRSActive = !this.isMTRSActive;
                this.altimeter.showMTRS(this.isMTRSActive);
                break;
            case "Mins_INC":
                if (decisionHeightMode === MinimumReferenceMode.BARO) {
                    SimVar.SetSimVarValue("K:INCREASE_DECISION_ALTITUDE_MSL", "number", increment);
                    this.altimeter.setMinimumBaroVisibility(true);
                }
                else {
                    SimVar.SetSimVarValue("K:INCREASE_DECISION_HEIGHT", "number", increment);
                }
                break;
            case "Mins_DEC":
                if (decisionHeightMode === MinimumReferenceMode.BARO) {
                    SimVar.SetSimVarValue("K:DECREASE_DECISION_ALTITUDE_MSL", "number", increment);
                    this.altimeter.setMinimumBaroVisibility(true);
                }
                else {
                    SimVar.SetSimVarValue("K:DECREASE_DECISION_HEIGHT", "number", increment);
                }
                break;
            case "Mins_Press":
                if (decisionHeightMode === MinimumReferenceMode.BARO) {
                    SimVar.SetSimVarValue("K:SET_DECISION_ALTITUDE_MSL", "number", this.altimeter.minimumResetValue);
                    this.altimeter.setMinimumBaroVisibility(this.resetState);
                    this.resetState = !this.resetState;
                }
                else {
                    SimVar.SetSimVarValue("K:SET_DECISION_HEIGHT", "number", this.altimeter.minimumResetValue);
                }
                break;
        }
    }
}
class B747_8_PFD_Attitude extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.isFPVActive = false;
    }
    init(root) {
        this.hsi = this.gps.getChildById("Horizon");
        this.hsi.aircraft = Aircraft.B747_8;
        this.hsi.gps = this.gps;
    }
    onEnter() {
    }
    onUpdate(_deltaTime) {
        if (this.hsi) {
            this.hsi.update(_deltaTime);
            var xyz = Simplane.getOrientationAxis();
            if (xyz) {
                diffAndSetAttribute(this.hsi, "pitch", (xyz.pitch / Math.PI * 180) + '');
                diffAndSetAttribute(this.hsi, "bank", (xyz.bank / Math.PI * 180) + '');
            }
            diffAndSetAttribute(this.hsi, "slip_skid", Simplane.getInclinometer() + '');
            diffAndSetAttribute(this.hsi, "radio_altitude", Simplane.getAltitudeAboveGround() + '');
            diffAndSetAttribute(this.hsi, "radio_decision_height", this.gps.radioNav.getRadioDecisionHeight() + '');
        }
    }
    onExit() {
    }
    onEvent(_event) {
        switch (_event) {
            case "FPV":
                this.isFPVActive = !this.isFPVActive;
                this.hsi.showFPV(this.isFPVActive);
                break;
        }
    }
}
class B747_8_PFD_Compass extends NavSystemElement {
    init(root) {
        this.svg = this.gps.getChildById("Compass");
        this.svg.aircraft = Aircraft.B747_8;
        this.svg.gps = this.gps;
    }
    onEnter() {
    }
    onUpdate(_deltaTime) {
        this.svg.update(_deltaTime);
    }
    onExit() {
    }
    onEvent(_event) {
    }
    showILS(_val) {
        if (this.svg) {
            this.svg.showILS(_val);
        }
    }
}
class B747_8_PFD_FMA extends NavSystemElement {
    init(root) {
        this.fma = this.gps.querySelector("boeing-fma");
        this.fma.aircraft = Aircraft.B747_8;
        this.fma.gps = this.gps;
        this.isInitialized = true;
    }
    onEnter() {
    }
    onUpdate(_deltaTime) {
        if (this.fma != null) {
            this.fma.update(_deltaTime);
        }
    }
    onExit() {
    }
    onEvent(_event) {
    }
}
class B747_8_PFD_ILS extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.altWentAbove500 = false;
    }
    init(root) {
        this.ils = this.gps.getChildById("ILS");
        this.ils.aircraft = Aircraft.B747_8;
        this.ils.gps = this.gps;
        this.ils.showNavInfo(true);
    }
    onEnter() {
    }
    onUpdate(_deltaTime) {
        if (!this.altWentAbove500) {
            let altitude = Simplane.getAltitudeAboveGround();
            if (altitude >= 500)
                this.altWentAbove500 = true;
        }
        if (this.ils) {
            let showIls = false;
            let localizer = this.gps.radioNav.getBestILSBeacon(UseNavSource.YES_FALLBACK);
            if ((localizer.id != 0 && this.altWentAbove500) || (this.gps.currFlightPlanManager.isActiveApproach() && Simplane.getAutoPilotApproachType() == ApproachType.APPROACH_TYPE_RNAV)) {
                showIls = true;
            }
            this.ils.showLocalizer(showIls);
            this.ils.showGlideslope(showIls);
            this.ils.update(_deltaTime);
        }
    }
    onExit() {
    }
    onEvent(_event) {
    }
}
registerInstrument("b747-8-pfd-element", B747_8_PFD);
//# sourceMappingURL=B747_8_PFD.js.map