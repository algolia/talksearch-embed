/* eslint-disable no-param-reassign, valid-jsdoc */
import autoprefixer from 'autoprefixer';
import pMap from 'p-map';
import postcss from 'postcss';
import tailwind from 'tailwindcss';
import _ from 'lodash';

const tailwindInitContent = `
@tailwind preflight; 
@tailwind utilities;

.debug, .debug * { outline: 1px solid gold; }
`;

/**
 * Compile CSS through postCSS and Tailwind
 **/
function plugin() {
  return async function compileCSS(files, pipeline, next) {
    const tailwindConfigs = _.filter(_.keys(files), path =>
      _.endsWith(path, 'tailwind.config.js')
    );

    if (_.isEmpty(tailwindConfigs)) {
      next();
      return;
    }

    await pMap(tailwindConfigs, async path => {
      const file = files[path];
      const outputPath = _.join(_.compact([file.path.dir, 'style.css']), '/');
      const processor = postcss([
        tailwind(`./playground/src/${path}`),
        autoprefixer,
      ]);

      const compiledContent = await processor.process(tailwindInitContent, {
        from: outputPath,
        to: outputPath,
      });

      // Remove the config from the list and set the css instead
      delete files[path];
      const newFile = file;
      newFile.contents = new Buffer(compiledContent.css);
      files[outputPath] = newFile;
    });

    next();
  };
}

export default plugin;
