/* eslint-disable no-param-reassign, valid-jsdoc */
import metalsmithMarkdown from 'metalsmith-markdown';
import metalsmithLayouts from 'metalsmith-layouts';
import metalsmithPaths from 'metalsmith-paths';
import pify from 'pify';

const markdown = pify(metalsmithMarkdown());
const layouts = pify(
  metalsmithLayouts({
    directory: './playground/layouts',
    default: 'index.pug',
    pattern: '**/*.html',
    engineOptions: {
      pretty: true,
    },
  })
);
const addPathData = pify(metalsmithPaths());

/**
 * Transforms all markdown files into HTML with wrapping layout
 **/
function plugin() {
  return async function createHtml(files, pipeline, next) {
    await markdown(files, pipeline);
    await addPathData(files, pipeline);
    await layouts(files, pipeline);
    next();
  };
}

export default plugin;
