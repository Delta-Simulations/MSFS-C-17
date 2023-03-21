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

const fs = require('fs');
const { paramCase } = require('change-case');
const [html, js] = require('./templates.js');

const trim = (text) => `${text.trimStart().trimEnd()}\n`;

module.exports = ({ name, instrumentDir = name, elementName, config, imports = [], outputDir, getCssBundle }) => ({
    name: 'msfs',
    writeBundle(_config, bundle) {
        const { code: jsCode } = bundle['bundle.js'];
        const cssCode = getCssBundle();

        if (config.isInteractive === undefined) {
            console.warn('(rollup-plugin-msfs): config.isInteractive not provided, defaulting to false');
            config.isInteractive = false;
        }

        const processedHtml = html(name, instrumentDir, imports, cssCode, jsCode);
        const processedJs = js(name, config.isInteractive, elementName || paramCase(name));

        // Write output
        fs.mkdirSync(`${outputDir}/${instrumentDir}`, { recursive: true });
        fs.writeFileSync(`${outputDir}/${instrumentDir}/template.html`, trim(processedHtml));
        fs.writeFileSync(`${outputDir}/${instrumentDir}/template.js`, trim(processedJs));
    }
});
