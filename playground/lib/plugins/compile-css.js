/* eslint-disable no-param-reassign, valid-jsdoc */
import autoprefixer from 'autoprefixer';
import pMap from 'p-map';
import pify from 'pify';
import postcss from 'postcss';
import tailwind from 'tailwindcss';
import _ from 'lodash';

/**
 * Compile CSS through postCSS
 **/
function plugin() {
  return async function compileCSS(files, pipeline, next) {
    const cssFiles = _.filter(_.keys(files), path => _.endsWith(path, '.css'));

    if (_.isEmpty(cssFiles)) {
      next();
      return;
    }

    const processor = postcss([
      tailwind('./playground/lib/tailwind.config.js'),
      autoprefixer,
    ]);

    await pMap(cssFiles, async path => {
      const file = files[path];
      const rawContent = file.contents.toString('utf-8');

      const compiledContent = await processor.process(rawContent, {
        from: path,
        to: './playground/dist/compiled.css',
      });

      files[path].contents = new Buffer(compiledContent.css);
    });

    next();
  };
}

export default plugin;
