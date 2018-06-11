/* eslint-disable no-param-reassign, valid-jsdoc */
import _ from 'lodash';
import metalsmithLayouts from 'metalsmith-layouts';
import metalsmithInPlace from 'metalsmith-in-place';
import pify from 'pify';

const pugOptions = {
  pretty: true,
  basedir: './playground/',
};

const inPlace = pify(
  metalsmithInPlace({
    pattern: '**/*.pug',
    engineOptions: pugOptions,
  })
);
const layouts = pify(
  metalsmithLayouts({
    directory: './playground/layouts',
    default: 'search.pug',
    pattern: '**/*.html',
    engineOptions: pugOptions,
  })
);

function addMissingLayoutSuffix(files) {
  _.each(files, (data, path) => {
    const layout = _.get(data, 'layout');
    if (!layout) {
      return;
    }

    if (!_.endsWith(layout, '.pug')) {
      files[path].layout = `${layout}.pug`;
    }
  });
}

/**
 * Transforms all markdown files into HTML with wrapping layout
 **/
function plugin() {
  return async function createHtml(files, pipeline, next) {
    // Convert all .pug content to HTML
    await inPlace(files, pipeline);

    // Add layout around HTML pages
    addMissingLayoutSuffix(files);
    await layouts(files, pipeline);

    next();
  };
}

export default plugin;
