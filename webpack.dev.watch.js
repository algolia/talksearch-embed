/* eslint-disable import/no-commonjs */
const prodBuildConfig = require('./webpack.prod.build.js');
const config = prodBuildConfig;
config.watch = true;

module.exports = config;
