#!/usr/bin/env node
'use strict';

var _execmd = require('./execmd.js');

var _execmd2 = _interopRequireDefault(_execmd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _argv = require('yargs').argv;

(0, _execmd2.default)(_argv);