class NGSimRDR2000 extends BaseGPS {
    /* Based on the WXR from the open-source GNS530 mod available on GitHub.
        Acknowledgements to the respective author(s) and contributor(s). */
    constructor() {
        super();
        this.mode = "OFF";
        this.isWxAMode = false;
        this.flashWXAlertMode = false;
        this.isTestMode = false;
        this.isMapMode = false;
        this.isNavMode = false;
        this.initDone = false;
        this.wxrHorizontalMode = true;
    }
    get templateID() { return "EMB110_RDR2000"; }
    connectedCallback() {
        super.connectedCallback();
        this.wxrMapInstrumentElement = new RDR2000MapInstrumentElement(this);
        this.addIndependentElementContainer(new NavSystemElementContainer("RDR2000", "WXRadarBase", this.wxrMapInstrumentElement));
        this.wxrMapInstrumentElement.wxrGainValue = this.getRadarGain();
    }
    onUpdate(_deltaTime) {
        if(!this.isElectricityAvailable()) {
            if (this.wxrMapInstrumentElement && this.wxrMapInstrumentElement.currentMode != "OFF")
                this.wxrMapInstrumentElement.setWeather("OFF");
            return;
        } else {
            if (this.isStarted && !this.initDone) {
                this.startInitScreen();
            }
            if (this.isWxAMode) {
                this.flashWXAlertMode = (Math.ceil(this.getSimulationTime()) % 2 == 0);
            } else {
                this.flashWXAlertMode = false;
                this.wxrMapInstrumentElement._initializedWxrColors = false;
            }
        }
    }
    startInitScreen() {
        this.initDone = false;
        this.doInit();
    }
    doInit() {
        this.reset();
        this.wxrMapInstrumentElement.setWeather(this.mode);
        this.updateWxDisplayMode();
        this.initDone = true;
    }
    reset() {
        this.wxrMapInstrumentElement.setRanges([5, 10, 20, 40, 80, 160, 240, 480]);
        this.wxrMapInstrumentElement.setRangeIndex(3);
        this.wxrHorizontalMode = true;
        this.isWxAMode = false;
        this.isMapMode = false;
        this.isNavMode = false;
    }
    onEvent(_event) {
        switch (_event) {
            case "SetModeOFF":
                {
                    if (this.initDone) {
                        this.reset();
                        this.initDone = false;
                        this.mode = "OFF";
                    }
                    break;
                }
            case "SetModeSTBY":
                {
                    this.mode = "STANDBY";
                    if (!this.initDone) {
                        this.startInitScreen();
                    } else {
                        this.wxrMapInstrumentElement.setWeather(this.mode);
                        this.wxrMapInstrumentElement.updateWeather();
                    }
                    break;
                }
            case "SetModeTEST":
                {
                    this.mode = "TEST";
                    this.wxrMapInstrumentElement.setWeather(this.mode);
                    this.wxrMapInstrumentElement.updateWeather();
                    break;
                }
            case "SetModeON":
                {
                    if (!this.wxrHorizontalMode)
                            this.wxrHorizontalMode = true;

                    this.mode = "ON";
                    this.wxrMapInstrumentElement.setWeather(this.mode);
                    this.wxrMapInstrumentElement.updateWeather();
                    break;
                }
            case "SetModeLOG":
                {
                    if (!this.wxrHorizontalMode)
                            this.wxrHorizontalMode = true;

                    this.mode = "LOG";
                    this.wxrMapInstrumentElement.setWeather(this.mode);
                    this.wxrMapInstrumentElement.updateWeather();
                    break;
                }
            case "ToggleWxAMode":
                {
                    this.isWxAMode = !this.isWxAMode;
                    SimVar.SetSimVarValue("L:XMLVAR_RDR2000_IsWxAEnabled", "boolean", this.isWxAMode);
                    this.wxrMapInstrumentElement.updateWeather();
                    break;
                }
            case "ToggleVerticalProfileMode":
                {
                    this.wxrHorizontalMode = !this.wxrHorizontalMode;
                    if (this.getWXRModeSwitchPosition() == 3) {
                        if (!this.wxrHorizontalMode) {
                            this.wxrMapInstrumentElement.setWeather("VERTICAL");
                            this.wxrMapInstrumentElement.updateWeather();
                        } else {
                            this.wxrMapInstrumentElement.setWeather("HORIZONTAL");
                            this.wxrMapInstrumentElement.updateWeather();
                        }
                    }
                    break;
                }
            case "ToggleMapMode":
                {
                    this.isMapMode = !this.isMapMode;
                    this.wxrMapInstrumentElement.updateWeather();
                    break;
                }
            case "ToggleNavMode":
                {
                    this.isNavMode = !this.isNavMode;
                    this.wxrMapInstrumentElement.updateWeather();
                    break;
                }
            case "RangeIncrease":
                {
                    var currentIndex = this.wxrMapInstrumentElement.getRangeIndex();
                    if (this.wxrMapInstrumentElement.getRangeIndex() < 6)
                        this.wxrMapInstrumentElement.setRangeIndex(currentIndex + 1);
                    else
                        this.wxrMapInstrumentElement.setRangeIndex(6);

                    break;
                }
            case "RangeDecrease":
                {
                    var currentIndex = this.wxrMapInstrumentElement.getRangeIndex();
                    if (this.wxrMapInstrumentElement.getRangeIndex() > 1)
                        this.wxrMapInstrumentElement.setRangeIndex(currentIndex - 1);
                    else
                        this.wxrMapInstrumentElement.setRangeIndex(1);

                    break;
                }
            case "TRKLeft":
                {
                    break;
                }
            case "TRKRight":
                {
                    break;
                }
            case "UpdateGainSetting":
                {
                    this.wxrMapInstrumentElement.wxrGainValue = this.getRadarGain();
                    this.wxrMapInstrumentElement.updateWeatherRadarColors();
                    this.wxrMapInstrumentElement.updateWeather();
                    break;
                }
            case "UpdateTiltSetting":
                {
                    this.wxrMapInstrumentElement.wxrTiltSetting = this.getRadarTilt();
                    this.wxrMapInstrumentElement.updateWeather();
                    break;
                }
        }
    }
    getSimulationTime() {
        return SimVar.GetSimVarValue("E:SIMULATION TIME", "seconds");
    }
    getWXRModeSwitchPosition() {
        return Math.ceil(SimVar.GetSimVarValue("L:XMLVAR_RDR2000_SelectedMode", "number"));
    }
    getRadarTilt() {
        return SimVar.GetSimVarValue("L:XMLVAR_RDR2000_Tilt", "number");
    }
    getRadarGain() {
        return SimVar.GetSimVarValue("L:XMLVAR_RDR2000_Gain", "number");
    }
    updateWxDisplayMode() {
        var currentWxMode = "";
        if (this.mode == "HORIZONTAL" || this.mode == "VERTICAL") {
            if (this.isMapMode && this.wxrHorizontalMode) {
                currentWxMode = "MAP";
            }
            else if (this.wxrHorizontalMode) {
                if (this.isWxAMode)
                    currentWxMode = "WxA";
                else
                    currentWxMode = "Wx";

                if (this.isNavMode)
                    currentWxMode += " NAV";
            }
        } else if (this.mode == "STANDBY") {
            currentWxMode = "STBY";
        } else if (this.mode == "TEST") {
            currentWxMode = "TEST";
        }

        this.wxrMapInstrumentElement.wxDisplayMode = currentWxMode;
    }
}

// Map instrument extended for weather radar
class RDR2000MapInstrumentElement extends MapInstrumentElement {
    constructor(_gps) {
        super(...arguments);
        this.gps = _gps;
        this.currentMode = "ON";
        this.wxDisplayMode = "";
        this.wxrTiltSetting = 0.0;
        this.wxrGainValue = 0.0;
        this.bingMode = EWeatherRadar.OFF;
        this._initializedWxrColors = false;
        this.weatherAltTexts = [];
        this.weatherTexts = [];
    }
    onUpdate(_deltaTime) {
        if (this.instrumentLoaded) {
            this.instrument.update(_deltaTime);
            this.initializeWeatherRadarColors();

            if (this.gps.isWxAMode)
                this.updateWeatherRadarColors();

            let range = this.instrument.getWeatherRange();
            if (this.weatherTexts) {
                let ratio = 1.0 / this.weatherTexts.length;
                for (let i = 0; i < this.weatherTexts.length; i++) {
                    var computedRange = range * ratio * (i + 1);
                    if (range == 10) {
                        if (i == 0)
                            this.weatherTexts[i].textContent = fastToFixed(2.5, 1);
                        else if (i == 1)
                            this.weatherTexts[i].textContent = fastToFixed(5, 0);
                        else if (i == 2)
                            this.weatherTexts[i].textContent = fastToFixed(7.5, 1);
                        else if (i == 3)
                            this.weatherTexts[i].textContent = fastToFixed(10, 0);
                    } else {
                        this.weatherTexts[i].textContent = fastToFixed(computedRange, 0);
                    }
                }
            }
            if (this.weatherAltTexts && this.weatherAltTexts.length >= 2) {
                this.weatherAltTexts[0].textContent = "+" + fastToFixed(range * 800 / 1000, 0);
                this.weatherAltTexts[1].textContent = "-" + fastToFixed(range * 800 / 1000, 0);
            }
        }
    }
    initializeWeatherRadarColors() {
        if (!this._initializedWxrColors) {
            if (this.instrument.bingMap && this.instrument.bingMap.m_listenerBinded && this.instrument.bingMap.m_listenerUId != -1) {
                var wx0Color = 0;               // rgba(0, 0, 0, 0) - Transparent
                var wx1Color = 4283866402;      // rgba(34, 157, 86, 255) - Green
                var wx2Color = 4278245887;      // rgba(255, 217, 0, 255) - Amber
                var wx3Color = 4281671884;      // rgba(204, 32, 53, 255) - Red
                var wx4Color = 4285071570;      // rgba(210, 0, 105, 255) - Magenta
                var wxRateGreen = 1.0 - (this.wxrGainValue * 0.025);
                var wxRateYellow = 4.0 - (this.wxrGainValue * 0.05);
                var wxRateRed = 12.0 - (this.wxrGainValue * 0.1);

                let wxrColorsArray = [wx0Color, wx1Color, wx2Color, wx3Color, wx4Color];
                let wxrRatesArray = [0.1, wxRateGreen, wxRateYellow, wxRateRed, 50.0];
                Coherent.call('SET_MAP_WEATHER_RADAR_COLORS', this.instrument.bingMap.m_listenerUId, wxrColorsArray, wxrRatesArray);

                this.instrument.bingMap.updateWeather();
                this._initializedWxrColors = true;
            }
        }
    }
    updateWeatherRadarColors() {
        if (this.currentMode != "OFF") {
            if (this.instrument.bingMap && this.instrument.bingMap.m_listenerBinded && this.instrument.bingMap.m_listenerUId != -1) {
                var wx0Color = 0;
                var wx1Color = 4283866402;
                var wx2Color = 4278245887;
                var wx3Color = 4281671884;
                var wx4Color = (this.gps.isWxAMode == true && this.gps.flashWXAlertMode == true) ? 0 : 4285071570;
                var wxRateGreen = 1.0 - (this.wxrGainValue * 0.025);
                var wxRateYellow = 4.0 - (this.wxrGainValue * 0.05);
                var wxRateRed = 12.0 - (this.wxrGainValue * 0.1);

                let wxrColorsArray = [wx0Color, wx1Color, wx2Color, wx3Color, wx4Color];
                let wxrRatesArray = [0.1, wxRateGreen, wxRateYellow, wxRateRed, 50.0];
                Coherent.call('SET_MAP_WEATHER_RADAR_COLORS', this.instrument.bingMap.m_listenerUId, wxrColorsArray, wxrRatesArray);
                
                this.instrument.refreshDisplay();
            }
        }
    }
    updateWeather() {
        this.setWeather(this.currentMode);
    }
    showWeather(_mode) {
        if (_mode == this.currentMode)
            return;

        if (_mode == "ON")
            _mode = ((!this.gps.wxrHorizontalMode) ? "VERTICAL" : "HORIZONTAL");
        
        this.currentMode = _mode;
        this.gps.mode = _mode;
        this.instrument.showBingMap = false;
        this.instrument.bShowAirplaneOnWeather = false;
        this.instrument.weatherHideGPS = true;
        this.bingMode = EWeatherRadar.OFF;
        let cone = 0;

        if (this.currentMode == "HORIZONTAL") {
            cone = (2 * Math.PI / 3);
            this.instrument.showBingMap = true;
            this.bingMode = EWeatherRadar.HORIZONTAL;
            this.instrument.bingMap.showWeather(EWeatherRadar.HORIZONTAL, cone);
            this.instrument.bingMap.setVisible(true);
        } else if (this.currentMode == "VERTICAL") {
            cone = (Math.PI / 3);
            this.instrument.showBingMap = true;
            this.bingMode = EWeatherRadar.VERTICAL;
            this.instrument.bingMap.showWeather(EWeatherRadar.VERTICAL, cone);
            this.instrument.bingMap.setVisible(true);
        } else if (this.currentMode == "OFF" || this.currentMode == "LOG"  || this.currentMode == "STANDBY"  || this.currentMode == "TEST") {
            this.instrument.showBingMap = false;
            this.bingMode = EWeatherRadar.OFF;
            this.instrument.bingMap.showWeather(EWeatherRadar.OFF, 0);
            this.instrument.bingMap.setVisible(false);
        }

        if (this.currentMode == "OFF") {
            if (this.instrument.weatherSVG)
                Utils.RemoveAllChildren(this.instrument.weatherSVG);
        }

        if (!this.instrument.isDisplayingWeatherRadar())
            this.instrument.updateBingMapSize();

        this.instrument.refreshDisplay();
        this.gps.updateWxDisplayMode();
    }
    setRanges(ranges) {
        this.instrument._ranges = ranges;
    }
    setRangeIndex(index) {
        this.instrument.rangeIndex = index;
    }
    getRangeIndex() {
        return this.instrument.rangeIndex;
    }
    setWeather(_mode) {
        this.showWeather(_mode);
        let svgRoot = this.instrument.weatherSVG;
        if (svgRoot) {
            Utils.RemoveAllChildren(svgRoot);
            this.weatherTexts = null;
            var defs = document.createElementNS(Avionics.SVG.NS, "defs");
            var style = document.createElementNS(Avionics.SVG.NS, "style");
            style.setAttribute("type", "text/css");
            style.textContent = "@font-face { font-family: GlassGauge; src: url('/Pages/VCockpit/Instruments/NextGenSim/EMB110/Shared/Fonts/GlassGauge-Regular.ttf') format('truetype'); }";
            style.textContent += " @font-face { font-family: GlassGauge-Condensed; src: url('/Pages/VCockpit/Instruments/NextGenSim/EMB110/Shared/Fonts/glassga.ttf') format('truetype'); }";
            defs.appendChild(style);
            svgRoot.appendChild(defs);
            if (this.currentMode == "HORIZONTAL" || this.currentMode == "VERTICAL" || this.currentMode == "STANDBY" || this.currentMode == "TEST") {
                var circleRadius = 575;
                var dashNbRect = 10;
                var dashWidth = 8;
                var dashHeight = 6;
                if (this.currentMode == "HORIZONTAL" || (this.currentMode == "STANDBY" && this.gps.wxrHorizontalMode) || this.currentMode == "TEST") {
                    this.instrument.setBingMapStyle("2%", "-26%", "152%", "196.25%");
                    var coneAngle = 120;
                    svgRoot.setAttribute("viewBox", "0 0 400 400");
                    var trsGroup = document.createElementNS(Avionics.SVG.NS, "g");
                    trsGroup.setAttribute("transform", "translate(-207.5, -7.5) scale(2.0375)");
                    svgRoot.appendChild(trsGroup);
                    let viewBox = document.createElementNS(Avionics.SVG.NS, "svg");
                    viewBox.setAttribute("viewBox", "-600 -600 1200 1200");
                    trsGroup.appendChild(viewBox);
                    var circleGroup = document.createElementNS(Avionics.SVG.NS, "g");
                    circleGroup.setAttribute("id", "Circles");
                    viewBox.appendChild(circleGroup);
                    {
                        let rads = [0.25, 0.50, 0.75, 1.0];
                        for (let r = 0; r < rads.length; r++) {
                            let rad = circleRadius * rads[r];
                            let startDegrees = -coneAngle * 0.5;
                            let endDegrees = coneAngle * 0.5;
                            let arcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let arcData = this.buildArcPathData(0, 0, rad, startDegrees, endDegrees);
                            arcPath.setAttribute("d", arcData);
                            arcPath.setAttribute("fill", "none");
                            arcPath.setAttribute("stroke", "rgb(69, 170, 217)");
                            arcPath.setAttribute("stroke-width", "4");
                            arcPath.setAttribute("stroke-linecap", "round");
                            arcPath.setAttribute("stroke-dasharray", "1,29,1,29");
                            circleGroup.appendChild(arcPath);
                        }
                    }
                    var lineGroup = document.createElementNS(Avionics.SVG.NS, "g");
                    lineGroup.setAttribute("id", "DottedLines");
                    viewBox.appendChild(lineGroup);
                    {
                        var coneMidLine = document.createElementNS(Avionics.SVG.NS, "line");
                        coneMidLine.setAttribute("x1", "0");
                        coneMidLine.setAttribute("y1", (-circleRadius).toString());
                        coneMidLine.setAttribute("x2", "0");
                        coneMidLine.setAttribute("y2", (-circleRadius * 0.25).toString());
                        coneMidLine.setAttribute("stroke", "rgb(69, 170, 217)");
                        coneMidLine.setAttribute("stroke-width", "4");
                        coneMidLine.setAttribute("stroke-linecap", "round");
                        coneMidLine.setAttribute("stroke-dasharray", "1,39,1,39");
                        lineGroup.appendChild(coneMidLine);
                    }
                    if (this.currentMode == "TEST") {
                        var testArcsGroup = document.createElementNS(Avionics.SVG.NS, "g");
                        testArcsGroup.setAttribute("id", "TestModeArcs");
                        viewBox.appendChild(testArcsGroup);
                        {
                            // Black - No returns
                            let blackArcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let blackArcRadius = circleRadius * 0.125;
                            let blackArcStartDeg = -coneAngle * 0.5;
                            let blackArcEndDeg = coneAngle * 0.5;
                            var blackArcPathData = this.buildArcPathData(0, 0, blackArcRadius, blackArcStartDeg, blackArcEndDeg);
                            blackArcPath.setAttribute("d", blackArcPathData);
                            blackArcPath.setAttribute("fill", "rgba(0, 0, 0, 0)");
                            blackArcPath.setAttribute("stroke-width", "0");
                            testArcsGroup.appendChild(blackArcPath);
                            // Green - Weak returns
                            let greenArcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let greenArcRadius = circleRadius * 0.25;
                            let greenArcStartDeg = -coneAngle * 0.5;
                            let greenArcEndDeg = coneAngle * 0.5;
                            var greenArcPathData = this.buildTestRingPiePathData(0, 0, greenArcRadius, circleRadius * 0.125, greenArcStartDeg, greenArcEndDeg);
                            greenArcPath.setAttribute("d", greenArcPathData);
                            greenArcPath.setAttribute("fill", "rgb(34, 157, 86)");
                            greenArcPath.setAttribute("stroke-width", "0");
                            testArcsGroup.appendChild(greenArcPath);
                            // Yellow - Moderate returns
                            let yellowArcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let yellowArcRadius = circleRadius * 0.375;
                            let yellowArcStartDeg = -coneAngle * 0.5;
                            let yellowArcEndDeg = coneAngle * 0.5;
                            var yellowArcPathData = this.buildTestRingPiePathData(0, 0, yellowArcRadius, circleRadius * 0.25, yellowArcStartDeg, yellowArcEndDeg);
                            yellowArcPath.setAttribute("d", yellowArcPathData);
                            yellowArcPath.setAttribute("fill", "rgb(255, 217, 0)");
                            yellowArcPath.setAttribute("stroke-width", "0");
                            testArcsGroup.appendChild(yellowArcPath);
                            // Red - Severe returns
                            let redArcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let redArcRadius = circleRadius * 0.5;
                            let redArcStartDeg = -coneAngle * 0.5;
                            let redArcEndDeg = coneAngle * 0.5;
                            var redArcPathData = this.buildTestRingPiePathData(0, 0, redArcRadius, circleRadius * 0.375, redArcStartDeg, redArcEndDeg);
                            redArcPath.setAttribute("d", redArcPathData);
                            redArcPath.setAttribute("fill", "rgb(204, 32, 53)");
                            redArcPath.setAttribute("stroke-width", "0");
                            testArcsGroup.appendChild(redArcPath);
                            // Magenta - Extreme returns
                            let magentaArcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let magentaArcRadius = circleRadius * 0.625;
                            let magentaArcStartDeg = -coneAngle * 0.5;
                            let magentaArcEndDeg = coneAngle * 0.5;
                            var magentaArcPathData = this.buildTestRingPiePathData(0, 0, magentaArcRadius, circleRadius * 0.5, magentaArcStartDeg, magentaArcEndDeg);
                            magentaArcPath.setAttribute("d", magentaArcPathData);
                            magentaArcPath.setAttribute("fill", "rgb(210, 0, 105)");
                            magentaArcPath.setAttribute("stroke-width", "0");
                            testArcsGroup.appendChild(magentaArcPath);
                            // Black Extreme (wxa) - Extreme returns
                            let wxaArcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let wxaArcRadius = circleRadius * 0.75;
                            let wxaArcStartDeg = -coneAngle * 0.5;
                            let wxaArcEndDeg = coneAngle * 0.5;
                            var wxaArcPathData = this.buildTestRingPiePathData(0, 0, wxaArcRadius, circleRadius * 0.625, wxaArcStartDeg, wxaArcEndDeg);
                            wxaArcPath.setAttribute("d", wxaArcPathData);
                            wxaArcPath.setAttribute("fill", "rgba(0, 0, 0, 0)");
                            wxaArcPath.setAttribute("stroke-width", "0");
                            testArcsGroup.appendChild(wxaArcPath);
                        }
                    }
                    var textGroup = document.createElementNS(Avionics.SVG.NS, "g");
                    textGroup.setAttribute("id", "Texts");
                    viewBox.appendChild(textGroup);
                    {
                        this.weatherTexts = [];
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        var rect = document.createElementNS(Avionics.SVG.NS, "rect");
                        text.setAttribute("x", "140");
                        text.setAttribute("y", "-60");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge-Condensed");
                        text.setAttribute("font-size", "36");
                        rect.setAttribute("x", "130");
                        rect.setAttribute("y", "-90");
                        rect.setAttribute("width", "64");
                        rect.setAttribute("height", "36");
                        rect.setAttribute("fill", "#010101");
                        textGroup.appendChild(rect);
                        textGroup.appendChild(text);
                        this.weatherTexts.push(text);
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        var rect = document.createElementNS(Avionics.SVG.NS, "rect");
                        text.setAttribute("x", "260");
                        text.setAttribute("y", "-130");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge-Condensed");
                        text.setAttribute("font-size", "36");
                        rect.setAttribute("x", "255");
                        rect.setAttribute("y", "-160");
                        rect.setAttribute("width", "64");
                        rect.setAttribute("height", "36");
                        rect.setAttribute("fill", "#010101");
                        textGroup.appendChild(rect);
                        textGroup.appendChild(text);
                        this.weatherTexts.push(text);
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        var rect = document.createElementNS(Avionics.SVG.NS, "rect");
                        text.setAttribute("x", "330");
                        text.setAttribute("y", "-285");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge-Condensed");
                        text.setAttribute("font-size", "36");
                        rect.setAttribute("x", "325");
                        rect.setAttribute("y", "-315");
                        rect.setAttribute("width", "64");
                        rect.setAttribute("height", "36");
                        rect.setAttribute("fill", "#010101");
                        textGroup.appendChild(rect);
                        textGroup.appendChild(text);
                        this.weatherTexts.push(text);
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        var rect = document.createElementNS(Avionics.SVG.NS, "rect");
                        text.setAttribute("x", "330");
                        text.setAttribute("y", "-482");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge-Condensed");
                        text.setAttribute("font-size", "36");
                        rect.setAttribute("x", "325");
                        rect.setAttribute("y", "-512");
                        rect.setAttribute("width", "64");
                        rect.setAttribute("height", "36");
                        rect.setAttribute("fill", "#010101");
                        textGroup.appendChild(rect);
                        textGroup.appendChild(text);
                        this.weatherTexts.push(text);
                        // Fixed STAB ON text
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        text.setAttribute("x", "-360");
                        text.setAttribute("y", "-482");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge");
                        text.setAttribute("font-weight", "bold");
                        text.setAttribute("font-size", "36");
                        textGroup.appendChild(text);
                        text.textContent = "STAB ON";
                        // Render current WX mode
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        text.setAttribute("x", "-360");
                        text.setAttribute("y", "-130");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge");
                        text.setAttribute("font-weight", "bold");
                        text.setAttribute("font-size", "36");
                        textGroup.appendChild(text);
                        text.textContent = this.wxDisplayMode;
                        // Render TILT
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        text.setAttribute("x", "275");
                        text.setAttribute("y", "-520");
                        text.setAttribute("fill", "rgb(252, 215, 3)");
                        text.setAttribute("font-family", "GlassGauge-Condensed");
                        text.setAttribute("font-size", "36");
                        textGroup.appendChild(text);
                        text.textContent = (this.wxrTiltSetting >= 0 ? "UP " : "DN ") + Math.abs(this.wxrTiltSetting).toFixed(1);
                    }
                }
                else if (this.currentMode == "VERTICAL") {
                    this.instrument.setBingMapStyle("-75%", "-88%", "201%", "250%");
                    var coneAngle = 60;
                    svgRoot.setAttribute("viewBox", "0 0 400 400");
                    var trsGroup = document.createElementNS(Avionics.SVG.NS, "g");
                    trsGroup.setAttribute("transform", "translate(396, -190) scale(1.95) rotate(90)");
                    svgRoot.appendChild(trsGroup);
                    let viewBox = document.createElementNS(Avionics.SVG.NS, "svg");
                    viewBox.setAttribute("viewBox", "-600 -600 1200 1200");
                    trsGroup.appendChild(viewBox);
                    var circleGroup = document.createElementNS(Avionics.SVG.NS, "g");
                    circleGroup.setAttribute("id", "Circles");
                    circleGroup.setAttribute("transform", "rotate(90)");
                    viewBox.appendChild(circleGroup);
                    {
                        let rads = [0.25, 0.50, 0.75, 1.0];
                        for (let r = 0; r < rads.length; r++) {
                            let rad = circleRadius * rads[r];
                            let startDegrees = -coneAngle * 0.5;
                            let endDegrees = coneAngle * 0.5;
                            let arcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let arcData = this.buildArcPathDataV(0, 0, rad, startDegrees, endDegrees);
                            arcPath.setAttribute("d", arcData);
                            arcPath.setAttribute("fill", "none");
                            arcPath.setAttribute("stroke", "rgb(69, 170, 217)");
                            arcPath.setAttribute("stroke-width", "4");
                            arcPath.setAttribute("stroke-linecap", "round");
                            arcPath.setAttribute("stroke-dasharray", "1,29,1,29");
                            circleGroup.appendChild(arcPath);
                        }
                    }
                    var limitGroup = document.createElementNS(Avionics.SVG.NS, "g");
                    limitGroup.setAttribute("id", "Limits");
                    viewBox.appendChild(limitGroup);
                    {
                        let endPosY = circleRadius + 25;
                        let posX = -130;
                        let posY = 150;
                        let lineUpper = document.createElementNS(Avionics.SVG.NS, "line");
                        lineUpper.setAttribute("x1", posX.toString());
                        lineUpper.setAttribute("y1", (-posY).toString());
                        lineUpper.setAttribute("x2", posX.toString());
                        lineUpper.setAttribute("y2", (-endPosY).toString());
                        lineUpper.setAttribute("stroke", "rgb(69, 170, 217)");
                        lineUpper.setAttribute("stroke-width", "4");
                        lineUpper.setAttribute("stroke-linecap", "round");
                        lineUpper.setAttribute("stroke-dasharray", "1,19,1,19");
                        limitGroup.appendChild(lineUpper);

                        posX = 133;
                        posY = 150;
                        let lineLower = document.createElementNS(Avionics.SVG.NS, "line");
                        lineLower.setAttribute("x1", posX.toString());
                        lineLower.setAttribute("y1", (-posY).toString());
                        lineLower.setAttribute("x2", posX.toString());
                        lineLower.setAttribute("y2", (-endPosY).toString());
                        lineLower.setAttribute("stroke", "rgb(69, 170, 217)");
                        lineLower.setAttribute("stroke-width", "4");
                        lineLower.setAttribute("stroke-linecap", "round");
                        lineLower.setAttribute("stroke-dasharray", "1,19,1,19");
                        limitGroup.appendChild(lineLower);

                        posX = 0;
                        posY = 144;
                        endPosY = circleRadius;
                        let lineMiddle = document.createElementNS(Avionics.SVG.NS, "line");
                        lineMiddle.setAttribute("x1", posX.toString());
                        lineMiddle.setAttribute("y1", (-posY).toString());
                        lineMiddle.setAttribute("x2", posX.toString());
                        lineMiddle.setAttribute("y2", (-endPosY).toString());
                        lineMiddle.setAttribute("stroke", "rgb(69, 170, 217)");
                        lineMiddle.setAttribute("stroke-width", "4");
                        lineMiddle.setAttribute("stroke-linecap", "round");
                        lineMiddle.setAttribute("stroke-dasharray", "1,19,1,19");
                        limitGroup.appendChild(lineMiddle);
                    }
                    var planeGroup = document.createElementNS(Avionics.SVG.NS, "g");
                    planeGroup.setAttribute("id", "Plane");
                    planeGroup.setAttribute("transform", "translate(-20, 80) rotate(-90)");
                    viewBox.appendChild(planeGroup);
                    {
                        let planePath = document.createElementNS(Avionics.SVG.NS, "path");
                        planePath.setAttribute("d", "m 0 0 l 5 0 l 10 10 l 50 0 l 2 0.5 l 1 0.5 l 4.5 3 l 7 4 l 0.5 1 l -0.5 1 L 10 20 L 5 10 L 0 0 Z");
                        planePath.setAttribute("fill", "rgb(252, 215, 3)");
                        planePath.setAttribute("width", "40");
                        planePath.setAttribute("height", "20");
                        planeGroup.appendChild(planePath);
                    }
                    if (this.currentMode == "TEST") {
                        var testArcsGroup = document.createElementNS(Avionics.SVG.NS, "g");
                        testArcsGroup.setAttribute("id", "TestModeArcs");
                        testArcsGroup.setAttribute("transform", "rotate(90)");
                        viewBox.appendChild(testArcsGroup);
                        {
                            // Black - No returns
                            let blackArcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let blackArcRadius = circleRadius * 0.125;
                            let blackArcStartDeg = -coneAngle * 0.5;
                            let blackArcEndDeg = coneAngle * 0.5;
                            var blackArcPathData = this.buildArcPathDataV(0, 0, blackArcRadius, blackArcStartDeg, blackArcEndDeg);
                            blackArcPath.setAttribute("d", blackArcPathData);
                            blackArcPath.setAttribute("fill", "rgba(0, 0, 0, 0)");
                            blackArcPath.setAttribute("stroke-width", "0");
                            testArcsGroup.appendChild(blackArcPath);
                            // Green - Weak returns
                            let greenArcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let greenArcRadius = circleRadius * 0.25;
                            let greenArcStartDeg = -coneAngle * 0.5;
                            let greenArcEndDeg = coneAngle * 0.5;
                            var greenArcPathData = this.buildTestRingPiePathDataV(0, 0, greenArcRadius, circleRadius * 0.125, greenArcStartDeg, greenArcEndDeg);
                            greenArcPath.setAttribute("d", greenArcPathData);
                            greenArcPath.setAttribute("fill", "rgb(34, 157, 86)");
                            greenArcPath.setAttribute("stroke-width", "0");
                            testArcsGroup.appendChild(greenArcPath);
                            // Yellow - Moderate returns
                            let yellowArcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let yellowArcRadius = circleRadius * 0.375;
                            let yellowArcStartDeg = -coneAngle * 0.5;
                            let yellowArcEndDeg = coneAngle * 0.5;
                            var yellowArcPathData = this.buildTestRingPiePathDataV(0, 0, yellowArcRadius, circleRadius * 0.25, yellowArcStartDeg, yellowArcEndDeg);
                            yellowArcPath.setAttribute("d", yellowArcPathData);
                            yellowArcPath.setAttribute("fill", "rgb(255, 217, 0)");
                            yellowArcPath.setAttribute("stroke-width", "0");
                            testArcsGroup.appendChild(yellowArcPath);
                            // Red - Severe returns
                            let redArcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let redArcRadius = circleRadius * 0.5;
                            let redArcStartDeg = -coneAngle * 0.5;
                            let redArcEndDeg = coneAngle * 0.5;
                            var redArcPathData = this.buildTestRingPiePathDataV(0, 0, redArcRadius, circleRadius * 0.375, redArcStartDeg, redArcEndDeg);
                            redArcPath.setAttribute("d", redArcPathData);
                            redArcPath.setAttribute("fill", "rgb(204, 32, 53)");
                            redArcPath.setAttribute("stroke-width", "0");
                            testArcsGroup.appendChild(redArcPath);
                            // Magenta - Extreme returns
                            let magentaArcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let magentaArcRadius = circleRadius * 0.625;
                            let magentaArcStartDeg = -coneAngle * 0.5;
                            let magentaArcEndDeg = coneAngle * 0.5;
                            var magentaArcPathData = this.buildTestRingPiePathDataV(0, 0, magentaArcRadius, circleRadius * 0.5, magentaArcStartDeg, magentaArcEndDeg);
                            magentaArcPath.setAttribute("d", magentaArcPathData);
                            magentaArcPath.setAttribute("fill", "rgb(210, 0, 105)");
                            magentaArcPath.setAttribute("stroke-width", "0");
                            testArcsGroup.appendChild(magentaArcPath);
                            // Black Extreme (wxa) - Extreme returns
                            let wxaArcPath = document.createElementNS(Avionics.SVG.NS, "path");
                            let wxaArcRadius = circleRadius * 0.75;
                            let wxaArcStartDeg = -coneAngle * 0.5;
                            let wxaArcEndDeg = coneAngle * 0.5;
                            var wxaArcPathData = this.buildTestRingPiePathDataV(0, 0, wxaArcRadius, circleRadius * 0.625, wxaArcStartDeg, wxaArcEndDeg);
                            wxaArcPath.setAttribute("d", wxaArcPathData);
                            wxaArcPath.setAttribute("fill", "rgba(0, 0, 0, 0)");
                            wxaArcPath.setAttribute("stroke-width", "0");
                            testArcsGroup.appendChild(wxaArcPath);
                        }
                    }
                    var textGroup = document.createElementNS(Avionics.SVG.NS, "g");
                    textGroup.setAttribute("id", "Texts");
                    viewBox.appendChild(textGroup);
                    {
                        this.weatherAltTexts = [];
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        text.textContent = "+60000FT";
                        text.setAttribute("x", "100");
                        text.setAttribute("y", "-125");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge");
                        text.setAttribute("font-size", "24");
                        text.setAttribute("transform", "rotate(-90)");
                        textGroup.appendChild(text);
                        this.weatherAltTexts.push(text);
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        text.textContent = "-60000FT";
                        text.setAttribute("x", "100");
                        text.setAttribute("y", "140");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge");
                        text.setAttribute("font-size", "24");
                        text.setAttribute("transform", "rotate(-90)");
                        textGroup.appendChild(text);
                        this.weatherAltTexts.push(text);
                        this.weatherTexts = [];
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        text.setAttribute("x", "95");
                        text.setAttribute("y", "105");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge-Condensed");
                        text.setAttribute("font-size", "36");
                        text.setAttribute("transform", "rotate(-90)");
                        textGroup.appendChild(text);
                        this.weatherTexts.push(text);
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        text.setAttribute("x", "235");
                        text.setAttribute("y", "170");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge-Condensed");
                        text.setAttribute("font-size", "36");
                        text.setAttribute("transform", "rotate(-90)");
                        textGroup.appendChild(text);
                        this.weatherTexts.push(text);
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        text.setAttribute("x", "350");
                        text.setAttribute("y", "225");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge-Condensed");
                        text.setAttribute("font-size", "36");
                        text.setAttribute("transform", "rotate(-90)");
                        textGroup.appendChild(text);
                        this.weatherTexts.push(text);
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        text.setAttribute("x", "480");
                        text.setAttribute("y", "290");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge-Condensed");
                        text.setAttribute("font-size", "36");
                        text.setAttribute("transform", "rotate(-90)");
                        textGroup.appendChild(text);
                        this.weatherTexts.push(text);
                        // Fixed PROFILE text
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        text.setAttribute("x", "-75");
                        text.setAttribute("y", "-225");
                        text.setAttribute("transform", "rotate(-90)");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge");
                        text.setAttribute("font-weight", "bold");
                        text.setAttribute("font-size", "36");
                        textGroup.appendChild(text);
                        text.textContent = "PROFILE";
                        // Render current WX mode
                        var text = document.createElementNS(Avionics.SVG.NS, "text");
                        text.setAttribute("x", "-50");
                        text.setAttribute("y", "170");
                        text.setAttribute("transform", "rotate(-90)");
                        text.setAttribute("fill", "rgb(69, 170, 217)");
                        text.setAttribute("font-family", "GlassGauge");
                        text.setAttribute("font-weight", "bold");
                        text.setAttribute("font-size", "36");
                        textGroup.appendChild(text);
                        text.textContent = this.wxDisplayMode;
                    }
                }
            } else if (this.currentMode == "LOG") {
                svgRoot.setAttribute("viewBox", "0 0 400 400");
                var trsGroup = document.createElementNS(Avionics.SVG.NS, "g");
                trsGroup.setAttribute("transform", "translate(-207.5, -7.5) scale(2.0375)");
                svgRoot.appendChild(trsGroup);
                let viewBox = document.createElementNS(Avionics.SVG.NS, "svg");
                viewBox.setAttribute("viewBox", "-600 -600 1200 1200");
                trsGroup.appendChild(viewBox);
                var textGroup = document.createElementNS(Avionics.SVG.NS, "g");
                textGroup.setAttribute("id", "LogText");
                viewBox.appendChild(textGroup);
                var text = document.createElementNS(Avionics.SVG.NS, "text");
                text.setAttribute("x", "0");
                text.setAttribute("y", "-460");
                text.setAttribute("fill", "rgb(255, 255, 255)");
                text.setAttribute("font-family", "GlassGauge");
                text.setAttribute("font-size", "48");
                var logLine1 = document.createElementNS(Avionics.SVG.NS, "tspan");
                logLine1.setAttribute("x", "-220");
                logLine1.setAttribute("dy", "1.2em");
                logLine1.textContent = "EMB-110 Bandeirante";
                var logLine2 = document.createElementNS(Avionics.SVG.NS, "tspan");
                logLine2.setAttribute("x", "-220");
                logLine2.setAttribute("dy", "1.2em");
                logLine2.textContent = "NextGen Simulations";
                var logLine3 = document.createElementNS(Avionics.SVG.NS, "tspan");
                logLine3.setAttribute("x", "-220");
                logLine3.setAttribute("dy", "1.2em");
                logLine3.textContent = "v1.6.3.2412";
                var logLineBR = document.createElementNS(Avionics.SVG.NS, "tspan");
                logLineBR.setAttribute("x", "-220");
                logLineBR.setAttribute("dy", "1.2em");
                logLineBR.textContent = " ";
                var logLine4 = document.createElementNS(Avionics.SVG.NS, "tspan");
                logLine4.setAttribute("x", "-220");
                logLine4.setAttribute("dy", "1.2em");
                logLine4.textContent = `Copyright ${String.fromCharCode(169)} ${new Date().getFullYear()}`;
                textGroup.appendChild(text);
                text.appendChild(logLine1);
                text.appendChild(logLine2);
                text.appendChild(logLine3);
                text.appendChild(logLineBR);
                text.appendChild(logLine4);
            }
        }
    }
    fromPolarToCartesian(centerX, centerY, radius, angleInDeg) {
        var angleInRad = (angleInDeg - 90) * (Math.PI / 180.0);
        return { x: centerX + (radius * Math.cos(angleInRad)), y: centerY + (radius * Math.sin(angleInRad)) };
    }
    fromPolarToCartesianV(centerX, centerY, radius, angleInDeg) {
        var angleInRad = (angleInDeg - 180) * (Math.PI / 180.0);
        return { x: centerX + (radius * Math.cos(angleInRad)), y: centerY + (radius * Math.sin(angleInRad)) };
    }
    buildArcPathData(x, y, radius, startAngle, endAngle) {
        var startPoint = this.fromPolarToCartesian(x, y, radius, endAngle);
        var endPoint = this.fromPolarToCartesian(x, y, radius, startAngle);
        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
        var d = ["M", startPoint.x, startPoint.y, "A", radius, radius, 0, arcSweep, 0, endPoint.x, endPoint.y];
        return d.join(" ");
    }
    buildArcPathDataV(x, y, radius, startAngle, endAngle) {
        var startPoint = this.fromPolarToCartesianV(x, y, radius, endAngle);
        var endPoint = this.fromPolarToCartesianV(x, y, radius, startAngle);
        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
        var d = ["M", startPoint.x, startPoint.y, "A", radius, radius, 0, arcSweep, 0, endPoint.x, endPoint.y];
        return d.join(" ");
    }
    buildTestRingPiePathData(x, y, radius1, radius2, startAngle, endAngle) {
        var startPoint1 = this.fromPolarToCartesian(x, y, radius1, endAngle);
        var endPoint1 = this.fromPolarToCartesian(x, y, radius1, startAngle);
        var startPoint2 = this.fromPolarToCartesian(x, y, radius2, endAngle);
        var endPoint2 = this.fromPolarToCartesian(x, y, radius2, startAngle);
        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
        var d = ["M", startPoint1.x, startPoint1.y, "A", radius1, radius1, 0, arcSweep, 0, endPoint1.x, endPoint1.y, "L", endPoint2.x, endPoint2.y, "A", radius2, radius2, 0, arcSweep, 1, startPoint2.x, startPoint2.y, "Z"];
        return d.join(" ");
    }
    buildTestRingPiePathDataV(x, y, radius1, radius2, startAngle, endAngle) {
        var startPoint1 = this.fromPolarToCartesianV(x, y, radius1, endAngle);
        var endPoint1 = this.fromPolarToCartesianV(x, y, radius1, startAngle);
        var startPoint2 = this.fromPolarToCartesianV(x, y, radius2, endAngle);
        var endPoint2 = this.fromPolarToCartesianV(x, y, radius2, startAngle);
        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
        var d = ["M", startPoint1.x, startPoint1.y, "A", radius1, radius1, 0, arcSweep, 0, endPoint1.x, endPoint1.y, "L", endPoint2.x, endPoint2.y, "A", radius2, radius2, 0, arcSweep, 1, startPoint2.x, startPoint2.y, "Z"];
        return d.join(" ");
    }
}

registerInstrument("ngs-rdr2000-element", NGSimRDR2000);
