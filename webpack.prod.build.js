/* eslint-disable import/no-commonjs */
/**
 * Our code will be transpiled to ES2015 through Babel. babel-plugin-lodash and
 * lodash-webpack-plugin will remove all lodash methods not used, while still
 * allowing us to globally import lodash as _
 **/
const path = require('path');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: {
    talksearch: [path.resolve(__dirname, 'index.js')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: { loader: 'babel-loader' },
      },
    ],
  },
  plugins: [
    new LodashWebpackPlugin({
      shorthands: true,
      collections: true,
      paths: true,
    }),
  ],
};
