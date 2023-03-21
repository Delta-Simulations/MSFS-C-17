'use strict';

/* global BaseInstrument */
/* global registerInstrument */

// eslint-disable-next-line camelcase
class EFB_Logic extends BaseInstrument {
    constructor() {
        super();
        // eslint-disable-next-line no-underscore-dangle
        let lastTime = this._lastTime;
        this.getDeltaTime = () => {
            const nowTime = Date.now();
            const deltaTime = nowTime - lastTime;
            lastTime = nowTime;

            return deltaTime;
        };
        window.instrument = this;
    }

    get templateID() {
        return 'EFB_TEMPLATE';
    }

    get isInteractive() {
        // eslint-disable-next-line
        return true;
    }

    get IsGlassCockpit() {
        return true;
    }

    connectedCallback() {
        super.connectedCallback();

        // This is big hack, see `template.html`.
        {
            const code = document.getElementById('EFB_BUNDLED_STYLE').innerHTML;
            const style = document.createElement('style');
            style.innerHTML = code;
            document.head.appendChild(style);
        }
        {
            const code = document.getElementById('EFB_BUNDLED_LOGIC').innerHTML;
            const script = document.createElement('script');
            script.innerHTML = code;
            document.body.appendChild(script);
        }
    }

    Update() {
        super.Update();
        this.dispatchEvent(new CustomEvent('update', { detail: this.getDeltaTime() }));
    }

    onInteractionEvent(event) {
        const eventName = String(event);
        this.dispatchEvent(new CustomEvent(eventName));
        this.dispatchEvent(new CustomEvent('*', { detail: eventName }));
    }
}

registerInstrument('efb-element', EFB_Logic);
