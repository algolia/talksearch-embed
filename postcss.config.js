/* eslint-disable import/no-commonjs */
const _ = require('lodash');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const filterRules = require('postcss-filter-rules');
const cleancss = require('postcss-clean');
const shouldMinify = process.env.MINIFY;

const tailwindConfig = './tailwind.config.js';
const filterOptions = {
  filter(selector) {
    return _.startsWith(selector, '.ais-') || _.startsWith(selector, '.ats-');
  },
};
const cleanCssOptions = {
  level: {
    1: {
      specialComments: false,
    },
  },
};

const pluginList = [
  tailwind(tailwindConfig), // Load tailwind utilities
  filterRules(filterOptions), // Keep only .ais-* classes
  autoprefixer, // Crossbrowser compat
];

if (shouldMinify) {
  pluginList.push(cleancss(cleanCssOptions));
}

module.exports = {
  plugins: pluginList,
};
