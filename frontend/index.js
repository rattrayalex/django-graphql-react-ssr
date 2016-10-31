require('babel-register')({
  presets: ['eslatest-node6', 'react'],
})
require('babel-polyfill')
require('isomorphic-fetch')  // polyfill for apollo
require('./server')
