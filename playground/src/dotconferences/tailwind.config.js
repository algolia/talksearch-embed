/* eslint-disable import/no-commonjs */
import _ from 'lodash';
import defaultConfig from '../tailwind.config.js';

module.exports = _.merge(defaultConfig, {
  colors: {
    gray: '#1f1f1f',
    yellow: '#fadf1d',
  },
});
