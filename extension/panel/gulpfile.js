/*eslint-env node*/
'use strict';

var common = require('gulp-capacitorjs-common');
common.config.src.out = 'panel.js';
common.config.src.main = 'src/panel.js';
common.registerCommon();
