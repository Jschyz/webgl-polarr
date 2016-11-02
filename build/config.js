const path = require('path')
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const package = require('../package.json')

const name = package.name
const entryPath = path.resolve(__dirname, '../src/index.js')
const banner =
  '/*!\n' +
  ' * ' + name + ' v' + package.version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' ' + package.author + '\n' +
  ' * Released under the MIT License.\n' +
  ' */'

const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-dev': {
    entry: entryPath,
    dest: path.resolve(__dirname, `../dist/${name}.common.js`),
    format: 'cjs',
    banner
  },
  // Minified runtime, only for filze size monitoring
  'web-runtime-prod': {
    entry: entryPath,
    dest: path.resolve(__dirname, `../dist/${name}.common.min.js`),
    format: 'umd',
    env: 'production',
    banner
  },
  // Runtime+compiler standalone development build.
  'web-standalone-dev': {
    entry: entryPath,
    dest: path.resolve(__dirname, `../dist/${name}.js`),
    format: 'umd',
    env: 'development',
    banner
  },
  // Runtime+compiler standalone production build.
  'web-standalone-prod': {
    entry: entryPath,
    dest: path.resolve(__dirname, `../dist/${name}.min.js`),
    format: 'umd',
    env: 'production',
    banner
  }
}

function genConfig(opts) {
  const config = {
    entry: opts.entry,
    dest: opts.dest,
    external: opts.external,
    format: opts.format,
    banner: opts.banner,
    moduleName: 'GL',
    plugins: [
      babel({})
    ]
  }

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  exports.getBuild = name => genConfig(builds[name])
  exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]))
}
