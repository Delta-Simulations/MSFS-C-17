// PMS50 Autopilot management hidden gauge (APGA)
// The APGA code is open source.
// You can use it, modify it and deliver it in your aircraft package without any authorization from PMS50.
// However, PMS50 will not provide any support if you modify the source code (except parameters).

// DO NOT MODIFY THIS FILE PLEASE BUT ONLY THE PMS50_APGA_custom.js file IF REQUIRED

// Altitude preselection modes
var altPreselMode = {
    none: 0,
    auto: 1,
    manual: 2
};

// VS engage modes
var vsEngageMode = {
    none: 0,
    reset: 1,
    default: 2,
    current: 3
};

// Lateral modes
var lateralMode = {
    none: 0,
    roll: 1,
    hdg: 2,
    gps: 3,
    vor: 4,
    loc: 5,
    bc: 6,
    aprgps: 7,
    aprvor: 8,
    aprloc: 9,
    lvl: 10,
    cga: 11,
    clvl: 12
};

// Vertical modes
var verticalMode = {
    none: 0,
    pitch: 1,
    vs: 2,
    alt: 3,
    gs: 4,
    gp: 5,
    flc: 6,
    vnav: 7,
    cga: 8,
    clvl: 9
};

// Combined modes
var combinedMode = {
    none: 0,
    cga: 1,
    clvl: 2
};

// Target altitude phases
var selectedAltitudePhase = {
    none: 0,    // No ALTS
    engaged: 1, // Altitude diff is greater than alert threshold.
    alert: 2,   // Altitude diff is between alert and near thresholds.
    near: 3,    // Altitude diff is less than near threshold.
    ready: 4,   // Vertical mode is ALT and Altitude diff greater than the reached threshold.
    reached: 5  // Vertical mode is ALT and Altitude diff is less than reached threshold. Phase returns to none after a time out.
};

// Fp approach type
var approachType = {
    none: 0,
    gps: 1,
    vor: 2,
    ndb: 3,
    ils: 4,
    loc: 5,
    sdf: 6,
    lda: 7,
    vordme: 8,
    ndbdme: 9,
    rnav: 10,
    bc: 11
};

// APGA class
// Thank you to not modify this class code
// Customize only the MY_APGA class
class PMS50_APGA extends NavSystem {
    get templateID() { return "PMS50_APGA"; }  // ID if the instrument in HTML
    get manageFlightPlan() { return false; }
    constructor() {
        super();
        // Version and provider
        this.version = "1.0.11";     // Change that if you have modified this file
        this.provider = "PMS50";    // Change that if you have modified this file

        // Parameters
        // You can modify these parameters to suit your needs in the MY_APGA. Check the APGA documentation.
        this.updateFrequency = 10;  // Min 1, Max 10
        this.highAltPrecision = false;
        this.altPreselMode = altPreselMode.auto;
        this.noUpdatableAltitudeSelector = false;  // Set it to true if mechanical selector that can't be updated from APGA
        this.vsEngageMode = vsEngageMode.current;
        this.vsEngageModeDefaultValue = 500;
        this.gaVsValue = 700;  // Vs value in feet/mn for ga mode
        this.defaultLateralMode = lateralMode.roll;  // Default lateral mode
        this.manualArmDefaultVerticalMode = verticalMode.vs; // Default vertical mode to engage when arming in manual arm mode (none, vs, flc)
        this.useVsForArmedVerticalCheck = true;  // Use the current vertical speed to check the arming to the selected altitude
        this.vsThresholdForArmedVerticalCheck = 50;  // Vs threshold to use when this.useVsForArmedVerticalCheck is true. Keep it between 10 and 50.
        this.targetAltitudeAlertThreshold = 1000;   // Target altitude alert phase threshold
        this.targetAltitudeNearThreshold = 300;   // Target altitude near phase threshold
        this.targetAltitudeReachedThreshold = 20;   // Target altitude reached phase threshold
        this.targetAltitudeReachedTimeOut = 5;  // Target altitude reached phase timeout in seconds
        this.unarmedAltituteLockValue = 99000;  // Altitude locked value for unarmed state when in manual arm mode
        this.altModeUpDownIncrementValue = 20;  // Up/Down increment when in ALT mode

        // Internal state
        this.neededTrim = 0; // needed trim value
        this.lateralMode = lateralMode.none;  // Current lateral mode
        this.armedLateralMode = lateralMode.none;  // Armed lateral mode
        this.verticalMode = verticalMode.none;    // Current vertical mode
        this.armedVerticalMode = verticalMode.none;  // Armed vertical mode
        this.armedAltitudeMode = verticalMode.none;  // Used to distinguish 2 armed modes
        this.armedApproachMode = verticalMode.none;  // Used to distinguish 2 armed modes
        this.capturedAltitude = -1; // Captured altitude in Alt mode (-1 if not in ALT mode)
        this.internalSelectedAltitude = 0; // Internal selected altitude. Used in manual arm mode only
        this.internalArmed = false; // Internal arming mode. Used in manual arm mode only
        this.cgaMode = false; // Go around mode (internal management)
        this.clvlMode = false; // LVL combined mode (internal management)
        this.checkUpdateCombinedMode = false; // Use to check the change of combined mode
        this.lvarValues = {}; // Used for optimizing performance in writting Lvars
        this.updateSimAltitudeLockVar = true; // Allow to block the altitude lock var reset to this.unarmedAltituteLockValue in manual arm mode
        this.selectedAltitudePhase = selectedAltitudePhase.none;    // Current selected altitude phase
        this.fPApproachType = approachType.none; // Current approach type
        this.isVloc = false; // true if in VLOC mode
        this.WTT = false;   // WTT detected
        this.WTTManageManualArming = false;   // true if the WTT module can manage the manual arming (just for compatibility)
    }
    connectedCallback() {
        // Called when the instrument is connected
        super.connectedCallback();
        this.init();
        // Tells the world that we are here
        SimVar.SetSimVarValue("L:PMS50_APGA_RUNNING", "boolean", true);
        SimVar.SetSimVarValue("L:PMS50_APGA_ALTSEL_NOT_UPDATABLE", "boolean", this.noUpdatableAltitudeSelector);
        // Check if WTT module is loaded
        setTimeout(()=>{
            this.WTT = SimVar.GetSimVarValue("L:PMS50_AUTOPILOT_INSTALLED", "bool");
            if(this.WTT)
                this.WTTManageManualArming = SimVar.GetSimVarValue("L:PMS50_AUTOPILOT_MANAGE_MANUAL_ARMING", "bool");
        }, 2000);
    }
    init() {
        // Check update frequence max and min ranges
        if(this.updateFrequency > 10)
            this.updateFrequency = 10;
        if(this.updateFrequency < 1)
            this.updateFrequency = 1;
        this._t_update = 0;
    }
    onUpdate(_deltaTime) {
        super.onUpdate(_deltaTime);

        // Check update frequency
        if(this.updateFrequency < 10) {
            this._t_update++;
            if(this._t_update % (11 - this.updateFrequency) != 0)
                return;
            this._t_update = 0;
        }

        // Update internal arm in manual arm mode
        if(this.altPreselMode == altPreselMode.manual) {
            // We reset the manual arm if not in VS or FLC mode
            if(this.verticalMode != verticalMode.vs && this.verticalMode != verticalMode.flc)
                this.internalArmed = false;
        }
        else {
            // No internal arming mode for other preselection modes 
            this.internalArmed = false;
        }

        // Update approachType
        this.fPApproachType = SimVar.GetSimVarValue("GPS APPROACH APPROACH TYPE", "number");

        // Update gps/vloc
        this.isVloc = !SimVar.GetSimVarValue("GPS DRIVES NAV1", "bool");

        // Update the current lateral mode
        this.updateActiveLateralMode();

        // Update the current vertical mode
        this.updateActiveVerticalMode();

        // Update the armed lateral mode
        this.updateArmedLateralMode();

        // Update the armed vertical modes (global, altitude and approach)
        this.updateArmedVerticalModes();

        // Update the target altitude phase
        this.updateSelectedAltitudePhase();

        // Update level mode
        this.checkUpdateLevelMode();

        // Update the captured altitude
        if(this.WTTManageManualArming)
            this.capturedAltitude = this.verticalMode == verticalMode.alt ? 10 * Math.round(SimVar.GetSimVarValue("L:PMS50_AUTOPILOT_CAPTURED_ALTITUDE", "feet") / 10) : -1;
        else
            this.capturedAltitude = this.verticalMode == verticalMode.alt ? 10 * Math.round(SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR:" + Simplane.getAutoPilotAltitudeSlotIndex(), "feet") / 10) : -1;

        // Update the selected altitude from selector if not updatable
        if(this.noUpdatableAltitudeSelector && this.altPreselMode != altPreselMode.none)
            this.setSelectedAltitude(this.getLvar("ALTITUDE_PRESEL_VALUE", "feet"));

        // Set the optional Lvars
        this.setLvars();

        // Manage manual arming
        if(this.WTTManageManualArming) {
            // WT mode can work without setting a high value to AUTOPILOT ALTITUDE LOCK VAR
            if((this.altPreselMode == altPreselMode.none || this.altPreselMode == altPreselMode.manual && !this.internalArmed) && (this.verticalMode == verticalMode.vs || this.verticalMode == verticalMode.flc || this.verticalMode == verticalMode.pitch )) {
                if(SimVar.GetSimVarValue("L:PMS50_AUTOPILOT_ALT_ARMING", "Bool"))
                    SimVar.SetSimVarValue("H:PMS50_AUTOPILOT_ALT_ARMING_OFF", "number", 1);
            }
            else {
                if(!SimVar.GetSimVarValue("L:PMS50_AUTOPILOT_ALT_ARMING", "Bool"))
                    SimVar.SetSimVarValue("H:PMS50_AUTOPILOT_ALT_ARMING_ON", "number", 1);
            }
        }
        else {
            // Set a high value (with correct sign following VS) to AUTOPILOT ALTITUDE LOCK VAR if no alt preselect mode or manual arm mode
            // And if we are not armed and not in alt mode
            if(this.altPreselMode == altPreselMode.none || (this.updateSimAltitudeLockVar && this.altPreselMode == altPreselMode.manual)) {
                if(!this.internalArmed && this.verticalMode != verticalMode.alt)
                    this.setSimSelectedAltitude(SimVar.GetSimVarValue("VERTICAL SPEED", "feet per minute") >= 0 ? this.unarmedAltituteLockValue : -this.unarmedAltituteLockValue);
            }
        }

        // Always limit the selected altitude to positive values
        if(this.internalSelectedAltitude < 0)
            this.setSelectedAltitude(0);

        // If we are in ALT mode and wing leveler mode
        // We probably come from a combined mode
        // Restore to default mode (usually ROLL)
        if(this.verticalMode == verticalMode.alt && this.lateralMode == lateralMode.lvl && this.defaultLateralMode != lateralMode.lvl) {
            if(this.defaultLateralMode == lateralMode.roll)
                SimVar.SetSimVarValue("K:AP_BANK_HOLD_ON", "number", 0);
        }
    }

    onEvent(_event) {
        
        switch (_event) {
            // Alt select knob events (toolbar panel only)
            case "SEL_ALT_SMALL_INC":
                this.onEventSEL_ALT_SMALL_INC();
                break;
            case "SEL_ALT_SMALL_DEC":
                this.onEventSEL_ALT_SMALL_DEC();
                break;
            case "SEL_ALT_LARGE_INC":
                this.onEventSEL_ALT_LARGE_INC();
                break;
            case "SEL_ALT_LARGE_DEC":
                this.onEventSEL_ALT_LARGE_DEC();
                break;
            case "SEL_ALT_VERY_LARGE_INC":
                this.onEventSEL_ALT_VERY_LARGE_INC();
                break;
            case "SEL_ALT_VERY_LARGE_DEC":
                this.onEventSEL_ALT_VERY_LARGE_DEC();
                break;

            // VS knob events
            case "SEL_VS_SMALL_INC":
                this.onEventSEL_VS_SMALL_INC();
                break;
            case "SEL_VS_SMALL_DEC":
                this.onEventSEL_VS_SMALL_DEC();
                break;
            case "SEL_VS_LARGE_INC":
                this.onEventSEL_VS_LARGE_INC();
                break;
            case "SEL_VS_LARGE_DEC":
                this.onEventSEL_VS_LARGE_DEC();
                break;
                
            // Autopilot button events
            case "AP_AP":
                this.onEventAP();
                break;
            case "AP_FD":
                this.onEventFD();
                break;
            case "AP_YD":
                this.onEventYD();
                break;
            case "AP_HDG":
                this.onEventHDG();
                break;
            case "AP_LVL":
                this.onEventLVL();
                break;
            case "AP_NAV":
                this.onEventNAV();
                break;
            case "AP_APR":
                this.onEventAPR();
                break;
            case "AP_REV":
                this.onEventREV();
                break;
            case "AP_ALT":
                this.onEventALT();
                break;
            case "AP_VS":
                this.onEventVS();
                break;
            case "AP_FLC":
                this.onEventFLC();
                break;
            case "AP_CGA":
                this.onEventCGA();
                break;
            case "AP_CLVL":
                this.onEventCLVL();
                break;
            case "AP_ARM":
                this.onEventARM();
                break;
            case "AP_ARM_PRESEL":
                this.onEventARM_PRESEL();
                break;
                
            // Up / Down buttons (disabled if not in VS or FLC mode)
            case "AP_UP":
                this.onEventUP();
                break;
            case "AP_DOWN":
                this.onEventDOWN();
                break;

            // Special events not public (used for GTN750)
            case "AP_ALT_SELECT":
                // Get the entered value and set it as target altitude
                // Use a time out to be sure that the sim variable is ready
                setTimeout(()=>{
                    this.setSelectedAltitude(this.getLvar("ALTITUDE_PRESEL_VALUE", "feet"));
                }, 500);
                break;
            case "ALT_PRESEL":
                // Altitude selection change (called from the autopilot menu)
                // Use a time out to be sure that the sim variable is ready
                setTimeout(()=>{
                    this.altPreselMode = this.getLvar("ALTITUDE_PRESEL_MODE", "number");
                    if(this.altPreselMode > altPreselMode.manual)
                        this.altPreselMode = altPreselMode.none;

                    // resets internal arming in any case when we change the mode
                    this.internalArmed = false;
                    let indicateAltitude = 10 * Math.round(SimVar.GetSimVarValue("INDICATED ALTITUDE", "feet") / 10);
                    indicateAltitude = this.getAltitudeWithPrecision(indicateAltitude);
            
                    if(this.altPreselMode == altPreselMode.none) {
                        // No alt select

                        // Reset FLC mode to ALT mode
                        if(this.verticalMode == verticalMode.flc) {
                            SimVar.SetSimVarValue("K:AP_ALT_HOLD", "number", 0);
                            SimVar.SetSimVarValue("AUTOPILOT VERTICAL HOLD VAR", "feet/minute", 0);
                        }
                    }
                    else if(this.altPreselMode == altPreselMode.auto) {
                        // Alt select with auto arm
                        // Reset the sim selected altitude to the current one
                        this.setSimSelectedAltitude(this.getAltitudeWithPrecision(indicateAltitude));
                    }
                    else {
                        // Alt select with manual arm

                        // Internal selected altitude is the current altitude
                        this.internalSelectedAltitude = indicateAltitude;
                    }
                }, 500);
                break;
            case "PRECISION":
                // Use a time out to be sure that the sim variable is ready
                setTimeout(()=>{
                    this.highAltPrecision = this.getLvar("PRECISION");
                }, 500);
                break;
        }
    }

    // Events
    onEventAP() {
        // Send the K event. The sim is doing the job behind.
        SimVar.SetSimVarValue("K:AP_MASTER", "number", 0);
    }
    onEventFD() {
        // Disable GA or LVL combined modes
        this.disableAnyCombinedMode();
        setTimeout(()=>{
            // Send the K event. The sim is doing the job behind.
            SimVar.SetSimVarValue("K:TOGGLE_FLIGHT_DIRECTOR", "number", 0);
        }, 500);
    }
    onEventYD() {
        // Send the K event. The sim is doing the job behind.
        SimVar.SetSimVarValue("K:YAW_DAMPER_TOGGLE", "number", 0);
    }
    onEventHDG() {
        // Disable GA or LVL combined modes
        this.disableAnyCombinedMode();
        // Send the K event. The sim is doing the job behind.
        if (this.lateralMode == lateralMode.hdg) {
            SimVar.SetSimVarValue("K:AP_HDG_HOLD_OFF", "number", 0);
        }
        else {
            SimVar.SetSimVarValue("K:AP_HDG_HOLD_ON", "number", 0);
        }
    }
    onEventNAV() {
        // Disable GA or LVL combined modes
        this.disableAnyCombinedMode();
        // Send the K event. The sim is doing the job behind.
        SimVar.SetSimVarValue("K:AP_NAV1_HOLD", "number", 0);
    }
    onEventAPR() {
        if(!this.isAutopilotEngaged())
            return;
        // Disable GA or LVL combined modes
        this.disableAnyCombinedMode();
        // Send the K event. The sim is doing the job behind.
        SimVar.SetSimVarValue("K:AP_APR_HOLD", "number", 0);
    }
    onEventREV() {
        if(!this.isAutopilotEngaged())
            return;
        // Disable GA or LVL combined modes
        this.disableAnyCombinedMode();
        // Send the K event. The sim is doing the job behind.
        SimVar.SetSimVarValue("K:AP_BC_HOLD", "number", 0);
    }
    onEventALT() {
        if(!this.isAutopilotEngaged())
            return;
        // Disable GA or LVL combined modes
        this.disableAnyCombinedMode();
        // Send the K event. The sim is doing the job behind.
        let currentVerticalMode = this.verticalMode;
        SimVar.SetSimVarValue("K:AP_ALT_HOLD", "number", 0);
        if(currentVerticalMode != verticalMode.alt) {
            // When entering the alt mode, we reset the VS sim variable to 0
            // and the altitude lock var to the current altitude
            SimVar.SetSimVarValue("AUTOPILOT VERTICAL HOLD VAR", "feet/minute", 0);
            let indicateAltitude = 10 * Math.round(SimVar.GetSimVarValue("INDICATED ALTITUDE", "feet") / 10);
            indicateAltitude = this.getAltitudeWithPrecision(indicateAltitude);
            this.setSimSelectedAltitude(indicateAltitude, true);
            // The internal selected altitude is also set to locked one (used in manual arm mode only)
            this.internalSelectedAltitude = indicateAltitude;
        }
        else {
            // Leaving ALT mode
            // Reset hold altitude to the big value
            if(!this.WTTManageManualArming && (this.altPreselMode == altPreselMode.none || this.altPreselMode == altPreselMode.manual))
                 this.setSimSelectedAltitude(this.unarmedAltituteLockValue);
        }
    }
    onEventVS() {
        // Disable GA or LVL combined modes
        this.disableAnyCombinedMode();
        this.setVsVerticalMode(this.verticalMode != verticalMode.vs);
    }
    onEventFLC() {
        // Disable GA or LVL combined modes
        this.disableAnyCombinedMode();
        // Disable ALT mode if set (for stock AP manager)
        if(this.verticalMode == verticalMode.alt) {
            SimVar.SetSimVarValue("K:AP_ALT_HOLD", "number", 0);
            if(!this.WTTManageManualArming && (this.altPreselMode == altPreselMode.none || this.altPreselMode == altPreselMode.manual))
                this.setSimSelectedAltitude(this.unarmedAltituteLockValue);
        }
        // Send the K event. The sim is doing the job behind.
        if(this.verticalMode != verticalMode.flc) {
            // We engage FLC mode
            // We must set the current airspeed as hold value (necessary for stock sim)
            SimVar.SetSimVarValue("K:AP_SPD_VAR_SET", "number", SimVar.GetSimVarValue("AIRSPEED INDICATED", "knots"));
        }
        SimVar.SetSimVarValue("K:FLIGHT_LEVEL_CHANGE", "number", 0);
    }
    onEventLVL() {
        // Disable GA or LVL combined modes
        this.disableAnyCombinedMode();
        // Send the K event. The sim is doing the job behind.
        SimVar.SetSimVarValue("K:AP_WING_LEVELER", "number", 0);
    }
    onEventCGA() {
        // armedCombinedMode is use for display purpose
        // It blocks some LVars to a 0 value to get a clean display transition
        this.armedCombinedMode = true;
        setTimeout(()=>{
            this.armedCombinedMode = false;
        }, 500);
        this.enableCombinedMode(combinedMode.cga, !this.cgaMode);
    }
    onEventCLVL() {
        // armedCombinedMode is use for display purpose
        // It blocks some LVars to a 0 value to get a clean display transition
        this.armedCombinedMode = true;
        setTimeout(()=>{
            this.armedCombinedMode = false;
        }, 500);
        this.enableCombinedMode(combinedMode.clvl, !this.clvlMode);
    }
    onEventARM() {
        // Do not arm if in clvl mode
        if(this.clvlMode)
            return;
        // No K event here. This is an internal management.
        // Toggle armed mode
        if(this.altPreselMode != altPreselMode.manual) {
            this.internalArmed = false;
            return;
        }
        if(this.internalArmed)
            this.internalArmed = false;
        else {
            // We are going to arm
            if(this.manualArmDefaultVerticalMode == verticalMode.none) {
                // Do nothing if not in the correct mode and not armed in this case
                if(this.verticalMode != verticalMode.vs && this.verticalMode != verticalMode.flc)
                    return;
            }
            // Set the sim selected altitude to the current one
            if(!this.WTTManageManualArming)
                this.setSimSelectedAltitude(this.getAltitudeWithPrecision(this.internalSelectedAltitude), true);
            if(this.manualArmDefaultVerticalMode == verticalMode.vs) {
                if(this.verticalMode == verticalMode.vs || this.verticalMode == verticalMode.flc) {
                    // VS or FLC already engaged, just arm
                    this.internalArmed = true;
                }
                else {
                    // Engage the vs mode
                    this.disableAnyCombinedMode();
                    this.setVsVerticalMode(true);
                    // Let time to vertical mode to engage before arming, otherwise, the arming mode will be reset
                    setTimeout(()=>{
                        this.internalArmed = true;
                    }, 500);
                }
            }
            else if (this.manualArmDefaultVerticalMode == verticalMode.flc) {
                // Engage the flc mode if not already engaged
                if(this.verticalMode == verticalMode.vs || this.verticalMode == verticalMode.flc) {
                    // VS or FLC already engaged, just arm
                    this.internalArmed = true;
                }
                else {
                    // Engage the flc mode
                    this.disableAnyCombinedMode();
                    // We must set the current airspeed as hold value (necessary for stock sim)
                    SimVar.SetSimVarValue("K:AP_SPD_VAR_SET", "number", SimVar.GetSimVarValue("AIRSPEED INDICATED", "knots"));
                    SimVar.SetSimVarValue("K:FLIGHT_LEVEL_CHANGE", "number", 0);
                    // Let time to vertical mode to engage before arming, otherwise, the arming mode will be reset
                    setTimeout(()=>{
                        this.internalArmed = true;
                    }, 500);
                }
            }
            else
                this.internalArmed = !this.internalArmed;
        }
    }
    onEventARM_PRESEL() {
        // Do not arm if in clvl mode
        if(this.clvlMode)
            return;
        // No K event here. This is an internal management.
        // Toggle armed mode
        if(this.altPreselMode != altPreselMode.manual) {
            this.internalArmed = false;
            return;
        }
        // Set the sim selected altitude to the one given by the sim variable PMS50_APGA_ALTITUDE_PRESEL_VALUE
        // Use a time out to be sure that the sim variable is ready
        if(this.internalArmed) {
            // We are armed so just send the ARM event to un-arm
            this.onEvent("AP_ARM");
        }
        else {
            // We are not armed
            // Read the arma value and then send the arm event
            setTimeout(()=>{
                this.setSelectedAltitude(this.getLvar("ALTITUDE_PRESEL_VALUE", "feet"));
                // Send the ARM event
                this.onEvent("AP_ARM");
            }, 500);
        }
    }
    onEventUP() {
        // Disable GA or LVL combined modes
        this.disableAnyCombinedMode();
        if(this.verticalMode == verticalMode.vs || this.verticalMode == verticalMode.flc || this.verticalMode == verticalMode.pitch) {
            // We send the K events to the sim.
            if(this.verticalMode == verticalMode.vs)
                SimVar.SetSimVarValue("K:AP_VS_VAR_INC", "number", 0);
            else if(this.verticalMode == verticalMode.flc)
                SimVar.SetSimVarValue("K:AP_SPD_VAR_DEC", "number", 0);
            else
                SimVar.SetSimVarValue("K:AP_PITCH_REF_INC_UP", "number", 0);
        }
        else if(this.verticalMode == verticalMode.alt) {
            if(this.WTTManageManualArming) {
                SimVar.SetSimVarValue("L:PMS50_AUTOPILOT_CAPTURED_ALTITUDE_SET", "feet", this.capturedAltitude + this.altModeUpDownIncrementValue);
                SimVar.SetSimVarValue("H:PMS50_AUTOPILOT_SYNC_CAPTURED_ALTITUDE", "number", 1);
            }
            else {
                SimVar.SetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR:" + Simplane.getAutoPilotAltitudeSlotIndex(), "feet", this.capturedAltitude + this.altModeUpDownIncrementValue);
                if(this.WTT)
                    SimVar.SetSimVarValue("H:PMS50_AUTOPILOT_SYNC_SEL_ALTITUDE", "number", 1);
            }
        }
    }
    onEventDOWN() {
        // Disable GA or LVL combined modes
        this.disableAnyCombinedMode();
        if(this.verticalMode == verticalMode.vs || this.verticalMode == verticalMode.flc || this.verticalMode == verticalMode.pitch) {
            // If already displayed, we send the K events to the sim.
            if(this.verticalMode == verticalMode.vs)
                SimVar.SetSimVarValue("K:AP_VS_VAR_DEC", "number", 0);
            else if(this.verticalMode == verticalMode.flc)
                SimVar.SetSimVarValue("K:AP_SPD_VAR_INC", "number", 0);
            else
                SimVar.SetSimVarValue("K:AP_PITCH_REF_INC_DN", "number", 0);
        }
        else if(this.verticalMode == verticalMode.alt) {
            if(this.WTTManageManualArming) {
                SimVar.SetSimVarValue("L:PMS50_AUTOPILOT_CAPTURED_ALTITUDE_SET", "feet", this.capturedAltitude - this.altModeUpDownIncrementValue);
                SimVar.SetSimVarValue("H:PMS50_AUTOPILOT_SYNC_CAPTURED_ALTITUDE", "number", 1);
            }
            else {
                SimVar.SetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR:" + Simplane.getAutoPilotAltitudeSlotIndex(), "feet", this.capturedAltitude - this.altModeUpDownIncrementValue);
                if(this.WTT)
                    SimVar.SetSimVarValue("H:PMS50_AUTOPILOT_SYNC_SEL_ALTITUDE", "number", 1);
            }
        }
    }
    onEventSEL_ALT_SMALL_INC() {
        let currentAltitudeForSelect = !this.WTTManageManualArming && this.altPreselMode == altPreselMode.manual ? this.internalSelectedAltitude : SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet");
        currentAltitudeForSelect = this.getAltitudeWithPrecision(currentAltitudeForSelect);
        this.setSelectedAltitude(currentAltitudeForSelect + (this.highAltPrecision ? 10 : 100));
    }
    onEventSEL_ALT_LARGE_INC() {
        let currentAltitudeForSelect = !this.WTTManageManualArming && this.altPreselMode == altPreselMode.manual ? this.internalSelectedAltitude : SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet");
        currentAltitudeForSelect = this.getAltitudeWithPrecision(currentAltitudeForSelect);
        this.setSelectedAltitude(currentAltitudeForSelect + (this.highAltPrecision ? 100 : 1000));
    }
    onEventSEL_ALT_VERY_LARGE_INC() {
        let currentAltitudeForSelect = !this.WTTManageManualArming && this.altPreselMode == altPreselMode.manual ? this.internalSelectedAltitude : SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet");
        currentAltitudeForSelect = this.getAltitudeWithPrecision(currentAltitudeForSelect);
        this.setSelectedAltitude(currentAltitudeForSelect + (this.highAltPrecision ? 1000 : 10000));
    }
    onEventSEL_ALT_SMALL_DEC() {
        let currentAltitudeForSelect = !this.WTTManageManualArming && this.altPreselMode == altPreselMode.manual ? this.internalSelectedAltitude : SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet");
        currentAltitudeForSelect = this.getAltitudeWithPrecision(currentAltitudeForSelect);
        this.setSelectedAltitude(currentAltitudeForSelect - (this.highAltPrecision ? 10 : 100));
    }
    onEventSEL_ALT_LARGE_DEC() {
        let currentAltitudeForSelect = !this.WTTManageManualArming && this.altPreselMode == altPreselMode.manual ? this.internalSelectedAltitude : SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet");
        currentAltitudeForSelect = this.getAltitudeWithPrecision(currentAltitudeForSelect);
        this.setSelectedAltitude(currentAltitudeForSelect - (this.highAltPrecision ? 100 : 1000));
    }
    onEventSEL_ALT_VERY_LARGE_DEC() {
        let currentAltitudeForSelect = !this.WTTManageManualArming && this.altPreselMode == altPreselMode.manual ? this.internalSelectedAltitude : SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet");
        currentAltitudeForSelect = this.getAltitudeWithPrecision(currentAltitudeForSelect);
        this.setSelectedAltitude(currentAltitudeForSelect - (this.highAltPrecision ? 1000 : 10000));
    }
    onEventSEL_VS_SMALL_INC() {
        // Send the K event. The sim is doing the job behind.
        SimVar.SetSimVarValue("K:AP_VS_VAR_INC", "number", 0);
    }
    onEventSEL_VS_SMALL_DEC() {
        // Send the K event. The sim is doing the job behind.
        SimVar.SetSimVarValue("K:AP_VS_VAR_DEC", "number", 0);
    }
    onEventSEL_VS_LARGE_INC() {
        // Send the K event.
        SimVar.SetSimVarValue("K:AP_VS_VAR_SET_ENGLISH", "feet/minute",  Math.round(SimVar.GetSimVarValue("AUTOPILOT VERTICAL HOLD VAR", "feet/minute")) + 1000, "feet/minute");
    }
    onEventSEL_VS_LARGE_DEC() {
        // Send the K event.
        SimVar.SetSimVarValue("K:AP_VS_VAR_SET_ENGLISH", "feet/minute",  Math.round(SimVar.GetSimVarValue("AUTOPILOT VERTICAL HOLD VAR", "feet/minute")) - 1000, "feet/minute");
    }

    // Check if the autopilot is engaged
    isAutopilotEngaged() {
        return SimVar.GetSimVarValue("AUTOPILOT MASTER", "Bool");
    }

    // Check if the flight director is engaged
    isFlightDirectorEngaged() {
        return SimVar.GetSimVarValue("AUTOPILOT FLIGHT DIRECTOR ACTIVE", "Bool");
    }

    // Update the current lateral mode
    updateActiveLateralMode() {
        if(!this.isAutopilotEngaged() && !this.isFlightDirectorEngaged())
            this.lateralMode = lateralMode.none;
        else if(this.cgaMode)
            this.lateralMode = lateralMode.cga;
        else if(this.clvlMode)
            this.lateralMode = lateralMode.clvl;
        else if (SimVar.GetSimVarValue("AUTOPILOT WING LEVELER", "Bool"))
            this.lateralMode = lateralMode.lvl;
        else if (SimVar.GetSimVarValue("AUTOPILOT BANK HOLD", "Bool"))
            this.lateralMode = lateralMode.roll;
        else if (SimVar.GetSimVarValue("AUTOPILOT HEADING LOCK", "Bool"))
            this.lateralMode = lateralMode.hdg;
        else if (SimVar.GetSimVarValue("AUTOPILOT BACKCOURSE HOLD", "Bool"))
            this.lateralMode = lateralMode.bc;
        else if (SimVar.GetSimVarValue("AUTOPILOT APPROACH HOLD", "Bool") || SimVar.GetSimVarValue("AUTOPILOT GLIDESLOPE HOLD", "Bool")) {
            if(this.isVloc)
                this.lateralMode = SimVar.GetSimVarValue("NAV HAS LOCALIZER:" + Simplane.getAutoPilotSelectedNav(), "Bool") ? lateralMode.aprloc : this.lateralMode = lateralMode.aprvor;
            else
                this.lateralMode = lateralMode.aprgps;
        }
        else if (SimVar.GetSimVarValue("AUTOPILOT NAV1 LOCK", "Bool")) {
            if(this.isVloc)
                this.lateralMode = SimVar.GetSimVarValue("NAV HAS LOCALIZER:" + Simplane.getAutoPilotSelectedNav(), "Bool") ? lateralMode.loc : lateralMode.vor;
            else
                this.lateralMode = lateralMode.gps;
        }
        else
            this.lateralMode = lateralMode.none;
    }

    // Update the current vertical mode
    updateActiveVerticalMode() {
        if(!this.isAutopilotEngaged() && !this.isFlightDirectorEngaged())
            this.verticalMode = verticalMode.none;
        else if(this.clvlMode)
            this.verticalMode = verticalMode.clvl;
        else if (SimVar.GetSimVarValue("AUTOPILOT APPROACH HOLD", "Bool") && this.isVloc && SimVar.GetSimVarValue("AUTOPILOT GLIDESLOPE ACTIVE", "Boolean"))
            this.verticalMode = verticalMode.gs;
        else if (SimVar.GetSimVarValue("AUTOPILOT APPROACH HOLD", "Bool") && !this.isVloc && this.fPApproachType == approachType.rnav && (SimVar.GetSimVarValue("AUTOPILOT GLIDESLOPE ACTIVE", "Boolean")))
            this.verticalMode = verticalMode.gp;
        else if (SimVar.GetSimVarValue("AUTOPILOT VERTICAL HOLD", "Bool"))
            this.verticalMode = verticalMode.vs;
        else if (SimVar.GetSimVarValue("AUTOPILOT FLIGHT LEVEL CHANGE", "Bool"))
            this.verticalMode = verticalMode.flc;
        else if (SimVar.GetSimVarValue("AUTOPILOT PITCH HOLD", "Bool"))
            this.verticalMode = verticalMode.pitch;
        else if (SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK", "Bool"))
            this.verticalMode = verticalMode.alt;
        else
            this.verticalMode = verticalMode.none;
        if(this.cgaMode && this.checkUpdateCombinedMode) {
            if(SimVar.GetSimVarValue("AUTOPILOT WING LEVELER", "Bool") && this.verticalMode == verticalMode.vs) {
                // Check if we are still in cga mode
                let currentHoldVs = Math.round(SimVar.GetSimVarValue("AUTOPILOT VERTICAL HOLD VAR", "feet/minute"));
                if(this.cgaMode && currentHoldVs == this.gaVsValue)
                    this.verticalMode = verticalMode.cga;
                else {
                    // Reset cga
                    this.cgaMode = false;
                    this.checkUpdateCombinedMode = false;
                }
            }
            else {
                // Reset cga
                this.cgaMode = false;
                this.checkUpdateCombinedMode = false;
            }
        }
    }

    // Update the armed lateral mode
    updateArmedLateralMode() {
        if(!this.isAutopilotEngaged() && !this.isFlightDirectorEngaged())
            this.armedLateralMode = lateralMode.none;
        else if(this.clvlMode)
            this.armedLateralMode = lateralMode.none;
        else if (!SimVar.GetSimVarValue("AUTOPILOT HEADING LOCK", "Bool") && !SimVar.GetSimVarValue("AUTOPILOT WING LEVELER", "Bool") && !SimVar.GetSimVarValue("AUTOPILOT BANK HOLD", "Bool"))
            this.armedLateralMode = lateralMode.none;
        else if (SimVar.GetSimVarValue("AUTOPILOT BACKCOURSE HOLD", "Bool"))
            this.armedLateralMode = lateralMode.bc;
        else if (SimVar.GetSimVarValue("AUTOPILOT APPROACH HOLD", "Bool") || SimVar.GetSimVarValue("AUTOPILOT GLIDESLOPE ARM", "Bool")) {
            if(this.isVloc)
                this.armedLateralMode = SimVar.GetSimVarValue("NAV HAS LOCALIZER:" + Simplane.getAutoPilotSelectedNav(), "Bool") ? lateralMode.aprloc : lateralMode.aprvor;
            else
                this.armedLateralMode = lateralMode.aprgps;
        }
        else if (SimVar.GetSimVarValue("AUTOPILOT NAV1 LOCK", "Bool")) {
            if(this.isVloc)
                this.armedLateralMode = SimVar.GetSimVarValue("NAV HAS LOCALIZER:" + Simplane.getAutoPilotSelectedNav(), "Bool") ? lateralMode.loc : lateralMode.vor;
            else
                this.armedLateralMode = lateralMode.gps;
        }
        else
            this.armedLateralMode = lateralMode.none;
    }

    // Update the armed vertical modes (global, altitude and approach)
    updateArmedVerticalModes() {
        if((!this.isAutopilotEngaged() && !this.isFlightDirectorEngaged()) || this.clvlMode) {
            this.armedVerticalMode = verticalMode.none;
            this.armedAltitudeMode = verticalMode.none;
            this.armedApproachMode = verticalMode.none;
            return;
        }
        // Separate armed modes for altitude and approach
        let GsArmed = SimVar.GetSimVarValue("AUTOPILOT GLIDESLOPE ARM", "Bool");
        if(GsArmed || SimVar.GetSimVarValue("AUTOPILOT APPROACH HOLD", "Bool")) {
            // We check also if not already active
            if(this.verticalMode != verticalMode.gs && this.verticalMode != verticalMode.gp) {
                if(this.isVloc)
                   this.armedApproachMode = GsArmed && SimVar.GetSimVarValue("NAV HAS LOCALIZER:" + Simplane.getAutoPilotSelectedNav(), "Bool") ? verticalMode.gs : verticalMode.none;
                else
                    this.armedApproachMode = this.fPApproachType == approachType.rnav ? verticalMode.gp : verticalMode.none;
            }
            else
                this.armedApproachMode = verticalMode.none;
        }
        else
            this.armedApproachMode = verticalMode.none;

        if((this.altPreselMode == altPreselMode.auto || (this.altPreselMode == altPreselMode.manual && this.internalArmed)) && (this.verticalMode == verticalMode.pitch || this.verticalMode == verticalMode.vs || this.verticalMode == verticalMode.flc || this.verticalMode == verticalMode.cga)) {
            // altitude arm mode
            if(this.useVsForArmedVerticalCheck) {
                // Check the arming mode following VS
                let vs = SimVar.GetSimVarValue("VERTICAL SPEED", "feet per second")*60;
                let currentAltitude = Math.round(SimVar.GetSimVarValue("INDICATED ALTITUDE", "feet"));
                let targetAltitude = SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet");
                let difference = Math.abs(targetAltitude - currentAltitude);
                if(vs > this.vsThresholdForArmedVerticalCheck && targetAltitude > currentAltitude && difference > this.targetAltitudeReachedThreshold) {
                    // Climb to target altitude
                    this.armedAltitudeMode = verticalMode.alt;
                }
                else if(vs < -this.vsThresholdForArmedVerticalCheck && targetAltitude < currentAltitude && difference > this.targetAltitudeReachedThreshold) {
                    // Descent to target altitude
                    this.armedAltitudeMode = verticalMode.alt;
                }
                else if(SimVar.GetSimVarValue("SIM ON GROUND", "bool") && targetAltitude > currentAltitude + this.targetAltitudeReachedThreshold) {
                    this.armedAltitudeMode = verticalMode.alt;
                }
                else
                    this.armedAltitudeMode = verticalMode.none;
            }
            else
                this.armedAltitudeMode = verticalMode.alt;
        }
        else
            this.armedAltitudeMode = verticalMode.none;

        // Set the global armed mode (priority is gs/alt/gp)
        if(this.armedApproachMode == verticalMode.gs)
            this.armedVerticalMode = verticalMode.gs;
        else if(this.armedAltitudeMode == verticalMode.alt)
            this.armedVerticalMode = verticalMode.alt;
        else if(this.armedApproachMode == verticalMode.gp)
            this.armedVerticalMode = verticalMode.gp;
        else
            this.armedVerticalMode = verticalMode.none;
    }

    updateSelectedAltitudePhase() {
        let vs = SimVar.GetSimVarValue("VERTICAL SPEED", "feet per second")*60;
        let currentAltitude = Math.round(SimVar.GetSimVarValue("INDICATED ALTITUDE", "feet"));
        let targetAltitude = SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet");
        if(!this.WTTManageManualArming && targetAltitude == this.unarmedAltituteLockValue && (this.altPreselMode == altPreselMode.none || this.altPreselMode == altPreselMode.manual)) {
            // We are not in ALTS in this case
            this.selectedAltitudePhase = selectedAltitudePhase.none;
            return;
        }
        let climbToTarget = false;
        let descentToTarget = false;
        if(this.useVsForArmedVerticalCheck && this.selectedAltitudePhase != selectedAltitudePhase.ready && this.selectedAltitudePhase != selectedAltitudePhase.reached) {
            if(vs > this.vsThresholdForArmedVerticalCheck && currentAltitude < targetAltitude + 5)
                climbToTarget = true;
            else if(vs < -this.vsThresholdForArmedVerticalCheck && currentAltitude > targetAltitude - 5)
                descentToTarget = true;
        }
        else {
            if(currentAltitude < targetAltitude + 5)
                climbToTarget = true;
            else if(currentAltitude > targetAltitude - 5)
                descentToTarget = true;
        }
        if(!climbToTarget && !descentToTarget) {
            // We are not climbing and not descending
            // So reset the phase to none
            this.selectedAltitudePhase = selectedAltitudePhase.none;
            return;
        }
        let currentPhase = this.selectedAltitudePhase;
        let difference = Math.abs(targetAltitude - currentAltitude);
        if(this.armedAltitudeMode == verticalMode.alt) {
            // We are armed
            if(difference > this.targetAltitudeAlertThreshold)
                this.selectedAltitudePhase = selectedAltitudePhase.engaged;
            else if(difference > this.targetAltitudeNearThreshold)
                this.selectedAltitudePhase = selectedAltitudePhase.alert;
            else
                this.selectedAltitudePhase = selectedAltitudePhase.near;
        }
        else if(this.verticalMode == verticalMode.alt) {
            // We are in alt mode, we always engage ready phase at least
            if(currentPhase == selectedAltitudePhase.alert || currentPhase == selectedAltitudePhase.near) {
                // Switch to ready
                this.selectedAltitudePhase = selectedAltitudePhase.ready;
            }
            else if(currentPhase == selectedAltitudePhase.ready) {
                // Switch to reached
                if(difference > 0 && difference < this.targetAltitudeReachedThreshold) {
                    this.selectedAltitudePhase = selectedAltitudePhase.reached;
                    // Set the reached timeout
                    setTimeout(()=>{
                        this.selectedAltitudePhase = selectedAltitudePhase.none;
                    }, this.targetAltitudeReachedTimeOut * 1000);
                }
            }
            else if(currentPhase != selectedAltitudePhase.reached)
                this.selectedAltitudePhase = selectedAltitudePhase.none;
        }
        else
            this.selectedAltitudePhase = selectedAltitudePhase.none;
    }


    // set the target selected altitude
    setSelectedAltitude(_value) {
        let value = this.getAltitudeWithPrecision(_value);
        // Limit the selected altitude to positive values
        if(value < 0)
            value = 0;
        if(this.altPreselMode == altPreselMode.manual) {
            // In manual arm mode, we set the internal selected altitude
            this.internalSelectedAltitude = value;
            // and the sim selected altitude if armed or for WTT mode
            if(this.internalArmed || this.WTTManageManualArming)
                this.setSimSelectedAltitude(value);
        }
        else if(this.altPreselMode == altPreselMode.auto) {
            // We set the sim selected altitude for the auto arm mode
            this.setSimSelectedAltitude(value);
        }
    }

    // Send the selected altitude to the sim
    // With a time out and a blocking update if the value is this.unarmedAltituteLockValue (this.unarmedAltituteLockValue is used for manual arm mode)
    setSimSelectedAltitude(_value, _blockUpdate = false) {
        if(_blockUpdate) {
            this.updateSimAltitudeLockVar = false;
            SimVar.SetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet", _value);
            setTimeout(()=>{
                this.updateSimAltitudeLockVar = true;
            }, 1000);
        }
        else
            SimVar.SetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet", _value);
    }

    // format an altitude by taking precision into account
    getAltitudeWithPrecision(_value) {
        let precision = this.highAltPrecision ? 10 : 100;
        return Math.round(_value / precision) * precision;
    }

    // Enable / disable combined mode (CLVL, CGA)
    enableCombinedMode(mode, enable) {
        if(mode == combinedMode.cga && this.cgaMode != enable) {
            if(enable) {
                // GA mode is a Wing leveler/VS combined mode with VS set to a predefined value
                // In real world we should use PITCH instead of VS but currently WT do not manage the PITCH HOLD K event
                if(this.altPreselMode == altPreselMode.none || this.altPreselMode == altPreselMode.manual) {
                    this.internalArmed = false;
                    if(!this.WTTManageManualArming)
                        this.setSimSelectedAltitude(this.unarmedAltituteLockValue);
                }
                SimVar.SetSimVarValue("K:AP_WING_LEVELER_ON", "number", 0);
                SimVar.SetSimVarValue("K:AP_PANEL_VS_ON", "number", 0);
                SimVar.SetSimVarValue("K:AP_NAV1_HOLD_OFF", "number", 0);
                SimVar.SetSimVarValue("K:AP_APR_HOLD_OFF", "number", 0);
                setTimeout(()=>{
                    SimVar.SetSimVarValue("K:AP_VS_VAR_SET_ENGLISH", "feet/minute", this.gaVsValue);
                }, 200);
                this.cgaMode = true;
                this.checkUpdateCombinedMode = false;
                setTimeout(()=>{
                    this.checkUpdateCombinedMode = true;
                }, 300);
            }
            else {
                // Release the VS mode and wing leveler
                SimVar.SetSimVarValue("K:AP_PANEL_VS_OFF", "number", 0);
                SimVar.SetSimVarValue("K:AP_WING_LEVELER_OFF", "number", 0);
                // Release the internal cga state when removing GA mode
                this.cgaMode = false;
                this.checkUpdateCombinedMode = false;
            }
            // Disable the clvlMode in any case here
            this.clvlMode = false;
        }
        if(mode == combinedMode.clvl && this.clvlMode != enable) {
            this.clvlMode = enable;
            if(this.clvlMode) {
                SimVar.SetSimVarValue("K:AP_NAV1_HOLD_OFF", "number", 0);
                SimVar.SetSimVarValue("K:AP_APR_HOLD_OFF", "number", 0);
                SimVar.SetSimVarValue("K:AP_WING_LEVELER_ON", "number", 0);
                SimVar.SetSimVarValue("K:AP_PANEL_VS_ON", "number", 0);
                setTimeout(()=>{
                    SimVar.SetSimVarValue("K:AP_VS_VAR_SET_ENGLISH", "feet/minute", 0);
                }, 200);
            }
            else {
                // Release the VS mode
                SimVar.SetSimVarValue("K:AP_PANEL_VS_OFF", "number", 0);
                SimVar.SetSimVarValue("K:AP_WING_LEVELER_OFF", "number", 0);
            }
            // Disable the cgalMode in any case here
            this.cgaMode = false;
        }
    }

    setVsVerticalMode(enable) {
        if (enable && this.verticalMode != verticalMode.vs) {
            // We are going to enter VS mode
            // Set the current hold VS value
            let vsValue = SimVar.GetSimVarValue("AUTOPILOT VERTICAL HOLD VAR", "feet/minute");
            let engageMode = this.vsEngageMode;
            // We force engage mode to current if default requested but no alt preselect
            // because we don't know if we have to climb or descent 
            if(this.altPreselMode == altPreselMode.none && engageMode == vsEngageMode.default)
                engageMode = vsEngageMode.current;
            if(engageMode == vsEngageMode.current) {
                vsValue = SimVar.GetSimVarValue("VERTICAL SPEED", "feet per second")*60;
                vsValue = 100 * Math.round(vsValue / 100);
            }
            else if(engageMode == vsEngageMode.reset) {
                vsValue = 0;
            }
            else if(engageMode == vsEngageMode.default) {
                // If we are here, we are armed to the selected altitude
                // We must check for climb or descent and adjust the default value sign accordingly
                vsValue = this.vsEngageModeDefaultValue;
                if(SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet") < SimVar.GetSimVarValue("INDICATED ALTITUDE", "feet"))
                    vsValue = -vsValue;
            }
            setTimeout(()=>{
                SimVar.SetSimVarValue("AUTOPILOT VERTICAL HOLD VAR", "feet/minute", vsValue);
            }, 500);
            // Send the K event. The sim is doing the job behind.
            SimVar.SetSimVarValue("K:AP_PANEL_VS_ON", "number", 0);
        }
        else if (!enable && this.verticalMode == verticalMode.vs){
            // Send the K event. The sim is doing the job behind.
            SimVar.SetSimVarValue("K:AP_PANEL_VS_OFF", "number", 0);
        }
    }

    // Check and update the combined level mode
    // this mode is a combination of wing leveler on (0 bank angle) and VS mode with VS = 0
    checkUpdateLevelMode() {
        if(this.clvlMode) {
            if(!SimVar.GetSimVarValue("AUTOPILOT WING LEVELER", "Bool") || !SimVar.GetSimVarValue("AUTOPILOT VERTICAL HOLD", "Bool")) {
                SimVar.SetSimVarValue("K:AP_WING_LEVELER_ON", "number", 0);
                SimVar.SetSimVarValue("K:AP_PANEL_VS_ON", "number", 0);
                setTimeout(()=>{
                    SimVar.SetSimVarValue("K:AP_VS_VAR_SET_ENGLISH", "feet/minute", 0);
                }, 200);
            }
            else if(SimVar.GetSimVarValue("VERTICAL SPEED", "feet per second")*60 != 0)
                SimVar.SetSimVarValue("K:AP_VS_VAR_SET_ENGLISH", "feet/minute", 0);
        }
    }

    // Disable any combined mode (CLVL, CGA)
    disableAnyCombinedMode() {
        if(this.cgaMode || this.clvlMode) {
            SimVar.SetSimVarValue("K:AP_PANEL_VS_OFF", "number", 0);
            SimVar.SetSimVarValue("K:AP_WING_LEVELER_OFF", "number", 0);
        }
        this.cgaMode = false;
        this.clvlMode = false;
    }

    // Set optional LVars for reporting the gauge state
    setLvars() {
        // Lvars are used to report the autopilot gauge state for display purpose

        // Modes
        this.setLvar("ALT_SEL_MODE", this.altPreselMode, "number");
        this.setLvar("HIGHT_ALT_PRECISION", this.highAltPrecision);

        // AP, FD and YD states
        this.setLvar("AP", this.isAutopilotEngaged());
        this.setLvar("FD", this.isFlightDirectorEngaged());
        this.setLvar("YD", SimVar.GetSimVarValue("AUTOPILOT YAW DAMPER", "Bool"));

        // Buttons state
        this.setLvar("AP_BUTTON_STATE", this.isAutopilotEngaged());
        this.setLvar("FD_BUTTON_STATE", this.isFlightDirectorEngaged());
        this.setLvar("YD_BUTTON_STATE", SimVar.GetSimVarValue("AUTOPILOT YAW DAMPER", "Bool"));
        this.setLvar("GA_BUTTON_STATE", this.cgaMode);
        this.setLvar("LVL_BUTTON_STATE", this.clvlMode);
        this.setLvar("HDG_BUTTON_STATE", this.lateralMode == lateralMode.hdg);
        this.setLvar("NAV_BUTTON_STATE", this.lateralMode == lateralMode.gps || this.lateralMode == lateralMode.vor || this.lateralMode == lateralMode.loc || this.armedLateralMode == lateralMode.gps || this.armedLateralMode == lateralMode.vor || this.armedLateralMode == lateralMode.loc);
        this.setLvar("APR_BUTTON_STATE", this.lateralMode == lateralMode.aprgps || this.lateralMode == lateralMode.aprvor || this.lateralMode == lateralMode.aprloc || this.armedLateralMode == lateralMode.aprgps || this.armedLateralMode == lateralMode.aprvor || this.armedLateralMode == lateralMode.aprloc);
        this.setLvar("REV_BUTTON_STATE", this.lateralMode == lateralMode.bc);
        this.setLvar("ALT_BUTTON_STATE", this.verticalMode == verticalMode.alt);
        this.setLvar("VS_BUTTON_STATE", this.verticalMode == verticalMode.vs && !this.cgaMode && !this.clvlMode);
        this.setLvar("FLC_BUTTON_STATE", this.verticalMode == verticalMode.flc);
        let armButtonState = this.altPreselMode == altPreselMode.manual && this.internalArmed;
        this.setLvar("ARM_BUTTON_STATE", this.altPreselMode == altPreselMode.manual && (this.verticalMode == verticalMode.vs || this.verticalMode == verticalMode.flc) ? armButtonState : false);

        // Can arm
        this.setLvar("CAN_ARM", (this.verticalMode == verticalMode.vs || this.verticalMode == verticalMode.flc || this.manualArmDefaultVerticalMode != verticalMode.none) && !this.clvlMode && this.altPreselMode == altPreselMode.manual);

        // Lateral and vertical modes
        this.setLvar("ACTIVE_LATERAL_MODE", this.armedCombinedMode ? 0 : this.lateralMode, "number");
        this.setLvar("ACTIVE_VERTICAL_MODE", this.armedCombinedMode ? 0 : this.verticalMode, "number");
        this.setLvar("ARMED_LATERAL_MODE", this.armedCombinedMode ? 0 : this.armedLateralMode, "number");
        this.setLvar("ARMED_VERTICAL_MODE", this.armedCombinedMode ? 0 : this.armedVerticalMode, "number");
        this.setLvar("ARMED_ALTITUDE_MODE", this.armedCombinedMode ? 0 : this.armedAltitudeMode, "number");
        this.setLvar("ARMED_APPROACH_MODE", this.armedCombinedMode ? 0 : this.armedApproachMode, "number");

        // Up down button validity
        this.setLvar("UP_DOWN_BUTTON_VALID", (this.verticalMode == verticalMode.alt && this.altModeUpDownIncrementValue > 0) || this.verticalMode == verticalMode.vs || this.verticalMode == verticalMode.flc || this.verticalMode == verticalMode.pitch);

        // Selected altitude, captured altitude, selected VS and selected airspeed
        // Sim value if auto arm and internal value for manual arm
        this.setLvar("SELECTED_ALTITUDE", this.getAltitudeWithPrecision(!this.WTTManageManualArming && this.altPreselMode == altPreselMode.manual ? this.internalSelectedAltitude : SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet")), "feet");
        if(this.WTTManageManualArming)
            this.setLvar("CAPTURED_ALTITUDE_VALID", this.capturedAltitude >= 0);
        else
            this.setLvar("CAPTURED_ALTITUDE_VALID", this.capturedAltitude >= 0 && this.capturedAltitude < this.unarmedAltituteLockValue);
        this.setLvar("CAPTURED_ALTITUDE", this.capturedAltitude >= 0 ? Math.round(this.capturedAltitude) : 0, "feet");
        this.setLvar("SELECTED_VS", Math.round(SimVar.GetSimVarValue("AUTOPILOT VERTICAL HOLD VAR", "feet/minute")), "feet/minute");
        this.setLvar("SELECTED_AIRSPEED", Math.round(SimVar.GetSimVarValue("AUTOPILOT AIRSPEED HOLD VAR", "knots")), "knots");

        // Altitude phase
        this.setLvar("SELECTED_ALTITUDE_PHASE", this.selectedAltitudePhase, "number");

        // Trim indicator
        let needTrimValue = SimVar.GetSimVarValue("VELOCITY WORLD Y", "feet per minute") - SimVar.GetSimVarValue("VELOCITY WORLD Y", "feet per minute");
        let neededTrimIndicator = (needTrimValue < -100 || needTrimValue > 100) && this.verticalMode != verticalMode.none && this.verticalMode != verticalMode.pitch;
        this.setLvar("NEED_TRIM_INDICATOR", neededTrimIndicator);
        this.setLvar("NEED_TRIM_UP_INDICATOR", neededTrimIndicator && needTrimValue < -100);
        this.setLvar("NEED_TRIM_DOWN_INDICATOR", neededTrimIndicator && needTrimValue > 100);
        this.setLvar("NEED_TRIM_VALUE", needTrimValue, "feet per minute");
    }

    // Set a single Lvar
    setLvar(name, value, type = "boolean") {
        // We don't publish the var if the value is the same as before
        if(!this.lvarValues[name] || this.lvarValues[name] != value) {
            SimVar.SetSimVarValue("L:PMS50_APGA_" + name, type, value);
            this.lvarValues[name] = value;
        }
    }

    // Get a single Lvar
    getLvar(name, type = "boolean") {
        return SimVar.GetSimVarValue("L:PMS50_APGA_" + name, type);
    }
}
