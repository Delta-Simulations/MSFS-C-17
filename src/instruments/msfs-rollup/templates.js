/*
 * MIT License
 *
 * Copyright (c) 2021 FlyByWire Simulations
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

const { paramCase } = require('change-case');

const html = (name, outputDir, imports, css, js) => `
<script type="text/html" id="${name}_TEMPLATE">
    <div id="MSFS_REACT_MOUNT">
        <h1>If you're seeing this, React didn't load.</h1>
    </div>

    <script id="${name}_BUNDLED_LOGIC">
        // Although this is a script tag, because it is a child of a custom element,
        // it will not execute. Inside \`template.js\`, we read the contents of this script
        // element, then create a new script element and append it to the document body.
        // We embed it into this file, even though it is useless, because this file can
        // be hot-reloaded, but \`template.js\` cannot.
        /* eslint-disable */
        ${js}
    </script>
    <style id="${name}_BUNDLED_STYLE">
        /* same deal as above */
        ${css}
    </style>
</script>

${imports.map(i => 
    `<script type="text/html" import-script="${i}" import-async="false"></script>\n`
)}
<script type="text/html" import-script="/Pages/VCockpit/Instruments/${outputDir}/template.js" import-async="false"></script>
`;

const js = (name, isInteractive, elementName) => `
'use strict';

/* global BaseInstrument */
/* global registerInstrument */

// eslint-disable-next-line camelcase
class ${name}_Logic extends BaseInstrument {
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
        return '${name}_TEMPLATE';
    }

    get isInteractive() {
        // eslint-disable-next-line
        return ${isInteractive};
    }

    get IsGlassCockpit() {
        return true;
    }

    connectedCallback() {
        super.connectedCallback();

        // This is big hack, see \`template.html\`.
        {
            const code = document.getElementById('${name}_BUNDLED_STYLE').innerHTML;
            const style = document.createElement('style');
            style.innerHTML = code;
            document.head.appendChild(style);
        }
        {
            const code = document.getElementById('${name}_BUNDLED_LOGIC').innerHTML;
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

registerInstrument('${elementName || paramCase(name)}-element', ${name}_Logic);
`;

module.exports = [html, js];
