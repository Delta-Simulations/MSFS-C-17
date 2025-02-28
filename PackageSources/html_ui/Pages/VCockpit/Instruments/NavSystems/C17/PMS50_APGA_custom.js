// This file contains the custom version of your APGA gauge for your aircraft autopilot.
// Usually, this is not necessary to customize it (except parameters) but some autopilots may require some specific logic.

// The APGA code is open source.
// You can use it, modify it and deliver it in your aircraft package without any authorization from PMS50.
// However, PMS50 will not provide any support if you modify the source code (except parameters).


// Update this class if you want to change the default APGA behavior
class MY_APGA extends PMS50_APGA {
    constructor() {
        super();
        // Updated parameters
        this.altPreselMode = altPreselMode.manual;
        this.altModeUpDownIncrementValue = 10;  // Up/Down increment when in ALT mode
    }
    connectedCallback() {
        // Called when the instrument is connected
        super.connectedCallback();
    }
    init() {
        super.init();
    }
    onUpdate(_deltaTime) {
        super.onUpdate(_deltaTime);
    }

    onEvent(_event) {
        super.onEvent(_event);
    }

    // Events
    onEventAP() {
        super.onEventAP();
    }
    onEventFD() {
        super.onEventFD();
    }
    onEventYD() {
        super.onEventYD();
    }
    onEventHDG() {
        super.onEventHDG();
    }
    onEventNAV() {
        super.onEventNAV();
    }
    onEventAPR() {
        super.onEventAPR();
    }
    onEventREV() {
        super.onEventREV();
    }
    onEventALT() {
        super.onEventALT();
    }
    onEventVS() {
        super.onEventVS();
    }
    onEventFLC() {
        super.onEventFLC();
    }
    onEventLVL() {
        super.onEventLVL();
    }
    onEventCGA() {
        super.onEventCGA();
    }
    onEventCLVL() {
        super.onEventCLVL();
    }
    onEventARM() {
        super.onEventARM();
    }
    onEventARM_PRESEL() {
        super.onEventARM_PRESEL();
    }
    onEventUP() {
        super.onEventUP();
    }
    onEventDOWN() {
        super.onEventDOWN();
    }
    onEventSEL_ALT_SMALL_INC() {
        super.onEventSEL_ALT_SMALL_INC();
    }
    onEventSEL_ALT_LARGE_INC() {
        super.onEventSEL_ALT_LARGE_INC();
    }
    onEventSEL_ALT_VERY_LARGE_INC() {
        super.onEventSEL_ALT_VERY_LARGE_INC();
    }
    onEventSEL_ALT_SMALL_DEC() {
        super.onEventSEL_ALT_SMALL_DEC();
    }
    onEventSEL_ALT_LARGE_DEC() {
        super.onEventSEL_ALT_LARGE_DEC();
    }
    onEventSEL_ALT_VERY_LARGE_DEC() {
        super.onEventSEL_ALT_VERY_LARGE_DEC();
    }
    onEventSEL_VS_SMALL_INC() {
        super.onEventSEL_VS_SMALL_INC();
    }
    onEventSEL_VS_SMALL_DEC() {
        super.onEventSEL_VS_SMALL_DEC();
    }
    onEventSEL_VS_LARGE_INC() {
        super.onEventSEL_VS_LARGE_INC();
    }
    onEventSEL_VS_LARGE_DEC() {
        super.onEventSEL_VS_LARGE_DEC();
    }

    // Update the current lateral mode
    updateActiveLateralMode() {
        super.updateActiveLateralMode();
    }

    // Update the current vertical mode
    updateActiveVerticalMode() {
        super.updateActiveVerticalMode();
    }

    // Update the armed lateral mode
    updateArmedLateralMode() {
        super.updateArmedLateralMode();
    }

    // Update the armed vertical modes (global, altitude and approach)
    updateArmedVerticalModes() {
        super.updateArmedVerticalModes();
    }

    // Update the selected altitude phase
    updateSelectedAltitudePhase() {
        super.updateSelectedAltitudePhase();
    }

    // set the target selected altitude
    setSelectedAltitude(_value) {
        super.setSelectedAltitude(_value);
    }

    // Send the selected altitude to the sim
    setSimSelectedAltitude(_value, _blockUpdate = false) {
        super.setSimSelectedAltitude(_value, _blockUpdate);
    }

    // Enable / disable combined mode (CLVL, CGA)
    enableCombinedMode(mode, enable) {
        super.enableCombinedMode(mode, enable);
    }

    // Engage or disengage VS mode
    setVsVerticalMode(enable) {
        super.setVsVerticalMode(enable);
    }

    // Check and update the combined level mode
    checkUpdateLevelMode() {
        super.checkUpdateLevelMode();
    }

    // Disable any combined mode (CLVL, CGA)
    disableAnyCombinedMode() {
        super.disableAnyCombinedMode();
    }

    // Set LVars for reporting the gauge state
    setLvars() {
        super.setLvars();
    }
}

registerInstrument('pms50-autopilot', MY_APGA);

