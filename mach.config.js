const imageInline = require('esbuild-plugin-inline-image')
const postCssPlugin = require('esbuild-style-plugin')
const postCssColorFunctionalNotation = require('postcss-color-functional-notation')
const postCssInset = require('postcss-inset')
const { sassPlugin } = require('esbuild-sass-plugin')
const envFilePlugin = require('esbuild-envfile-plugin')

/** @type { import('@synaptic-simulations/mach').MachConfig } */
module.exports = {
  packageName: 'c-17',
  packageDir: 'PackageSources',
  plugins: [
    envFilePlugin,
    imageInline({ limit: -1 }),
    postCssPlugin({
      extract: true,
      postcss: {
        plugins: [postCssColorFunctionalNotation(), postCssInset()]
      }
    }),
    sassPlugin()
  ],
  instruments: [
    reactInstrument('EFB', null, true),
    reactInstrument('Systems', null, false),
    reactInstrument('READOUT', null, false),
    reactInstrument('HUD', null, false),
    reactInstrument('MFD', null, false)
  ]
}

function reactInstrument(name, additionalImports, isInteractive) {
  return {
    name,
    index: `Systems/instruments/${name}/index.tsx`,
    simulatorPackage: {
      type: 'react',
      isInteractive: isInteractive ?? false,
      fileName: name.toLowerCase(),
      imports: ['/JS/dataStorage.js', ...(additionalImports ?? [])]
    }
  }
}

function msfsAvionicsInstrument(name, folder = name) {
  return {
    name,
    index: `Systems/instruments/${folder}/instrument.tsx`,
    simulatorPackage: {
      type: 'baseInstrument',
      templateId: `C17_${name}`,
      mountElementId: `${name}_CONTENT`,
      fileName: name.toLowerCase(),
      imports: []
    }
  }
}
