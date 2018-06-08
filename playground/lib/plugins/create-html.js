/* eslint-disable no-param-reassign */
import _ from 'lodash';
import metalsmithMarkdown from 'metalsmith-markdown';
import metalsmithLayouts from 'metalsmith-layouts';
import metalsmithIgnore from 'metalsmith-ignore';
import metalsmithPaths from 'metalsmith-paths';
import pify from 'pify';

const markdown = pify(metalsmithMarkdown());
const layouts = pify(
  metalsmithLayouts({
    directory: './playground/src/_layouts',
    pattern: '**/*.html',
    default: 'index.pug',
  })
);
const ignoreLayouts = pify(metalsmithIgnore('_layouts/*'));
const addPathData = pify(metalsmithPaths());

function plugin() {
  return async function createHtml(files, pipeline, next) {
    await markdown(files, pipeline);
    await addPathData(files, pipeline);
    await layouts(files, pipeline);
    await ignoreLayouts(files, pipeline);
    next();
  };
}

export default plugin;
