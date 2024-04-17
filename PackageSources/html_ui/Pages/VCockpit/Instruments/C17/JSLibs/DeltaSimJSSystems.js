
class DeltaSimJSSystems extends BaseInstrument {
    constructor() {
        
        const SelImageNum = Math.floor(Math.random() * 16) + 1;

        Coherent.trigger("SET_BACKGROUND_IMAGE", "coui://html_ui/Images/Loading/Loading-"+SelImageNum+".jpg");
        super();
        
        
    }
    get templateID() { return "DeltaSimJSSystems"; }
    setConfigFile(_file) { }
    onInteractionEvent(_args) { }
    get isInteractive() { return false; }
    get isGlassCockpit() { return false; }
    get instrumentIdentifier() { return "delta-root-div"; }
    connectedCallback() {
        this.loadCheck = function () {
            let attr = undefined;
            if (document.body.hasAttribute("gamestate"))
                attr = document.body.getAttribute("gamestate");
            else if (window.parent && window.parent.document.body.hasAttribute("gamestate"))
                attr = window.parent.document.body.getAttribute("gamestate");
            if (attr != undefined && attr != "loading") {
                Coherent.trigger("SET_BACKGROUND_IMAGE", null);
            } else {
                setTimeout(this.loadCheck, 1000);
            }
        }
        this.loadCheck();

        var guid = this.getAttribute("Guid");
        if (guid != undefined) {
            LaunchFlowEvent("ON_VCOCKPIT_INSTRUMENT_INITIALIZED", guid, this.instrumentIdentifier, this.isInteractive, this.IsGlassCockpit);
        }
    }


}
registerInstrument('delta-root-div', DeltaSimJSSystems);

