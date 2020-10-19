const bytenode = require('bytenode');
const fs = require('fs');
const v8 = require('v8');

v8.setFlagsFromString('--no-lazy');

const file = '/electron_dop.jsc'

if (!fs.existsSync(__dirname + file)) {

  bytenode.compileFile(__dirname + '/electron.js',  __dirname + file);
}

require('./electron.jsc');