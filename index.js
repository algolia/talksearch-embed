/* eslint-disable import/no-commonjs */
// We use the require() syntax and not import, because we need to use
// module.exports for the actual export (which does not work with a import).
// We need to use the module.exports syntax so talksearch is available as
// a global variable in the browser window.
const talksearch = require('./src/index.js');

module.exports = talksearch.default;
