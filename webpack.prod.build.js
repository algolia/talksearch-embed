/* eslint-disable import/no-commonjs */
const path = require('path');
const HappyPack = require('happypack');

const babelPlugin = new HappyPack({
  loaders: ['babel-loader'],
});

module.exports = {
  mode: 'production',
  entry: {
    talksearch: [path.resolve(__dirname, 'src/talksearch.js')],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
  },
  plugins: [babelPlugin],
};
