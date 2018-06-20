/* eslint-disable import/no-commonjs */
const prodBuildConfig = require('./webpack.prod.build.js');
const config = prodBuildConfig;
config.watch = true;
config.devtool = 'inline-source-map';

module.exports = config;
