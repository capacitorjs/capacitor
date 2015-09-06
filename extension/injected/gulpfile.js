/*eslint-env node*/
'use strict';

var common = require('gulp-capacitorjs-common');
common.config.src.out = 'injected.js';
common.config.src.main = 'src/injected.js';
common.registerCommon();
