/*eslint-env node*/
'use strict';

var common = require('gulp-capacitorjs-common');
var initialConfig = {
  src: {
    out: 'injected.js',
    main: 'src/injected.js'
  }
};
var config = common.config(initialConfig);
config.webpack.output.libraryTarget = 'var';
common.registerCommon(config);

