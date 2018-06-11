/* eslint-disable import/no-commonjs */
import _ from 'lodash';
import defaultConfig from '../tailwind.config.js';

module.exports = _.merge(defaultConfig, {
  colors: {
    purple: '#2a255a',
    red: '#e4504b',
  },
});
