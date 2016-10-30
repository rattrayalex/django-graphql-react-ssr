require('babel-register')({
  presets: ['eslatest-node6', 'react'],
});
require("babel-polyfill");
require('./server');
