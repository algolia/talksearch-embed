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
    directory: './playground/layouts',
    default: 'index.pug',
    pattern: '**/*.html',
  })
);
const ignoreLayouts = pify(metalsmithIgnore('_layouts/*'));
const addPathData = pify(metalsmithPaths());

function plugin() {
  return async function createHtml(files, pipeline, next) {
    try {
      await markdown(files, pipeline);
      await addPathData(files, pipeline);
      await layouts(files, pipeline);
      // await ignoreLayouts(files, pipeline);
    } catch(err) {
      console.info(err);
    }
    next();
  };
}

export default plugin;
