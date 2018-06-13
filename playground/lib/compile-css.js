/* eslint-disable no-param-reassign, valid-jsdoc */
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import autoprefixer from 'autoprefixer';
import pMap from 'p-map';
import pify from 'pify';
import postcss from 'postcss';
import tailwind from 'tailwindcss';
const readFile = pify(fs.readFile);

function getTailwindConfigKey(filePath) {
  const dirname = path.dirname(filePath);
  return `${dirname}/tailwind.config.js`;
}

async function compileWithPostCss(files, filePath) {
  // Finding tailwind config
  const tailwindConfigKey = getTailwindConfigKey(filePath);
  const tailwindConfigPath = files[tailwindConfigKey]
    ? `./playground/src/${tailwindConfigKey}`
    : './tailwind.config.js';

  // Finding content
  const fileContent = files[filePath].contents.toString('utf-8');
  const baseContent = await readFile('./playground/src/style.css');
  const isInRoot = !_.includes(filePath, '/');
  const content = isInRoot ? fileContent : `${baseContent}\n${fileContent}`;

  // Processing it
  const processor = postcss([tailwind(tailwindConfigPath), autoprefixer]);
  const compiledContent = await processor.process(content, {
    from: filePath,
    to: filePath,
  });

  return compiledContent.css;
}

function removeTailwindConfig(files, filePath) {
  delete files[getTailwindConfigKey(filePath)];
}

/**
 * Compile CSS through postCSS and Tailwind
 **/
function plugin() {
  return async function compileCSS(files, pipeline, next) {
    const cssFiles = _.filter(_.keys(files), filePath =>
      _.endsWith(filePath, 'style.css')
    );

    if (_.isEmpty(cssFiles)) {
      next();
      return;
    }

    await pMap(cssFiles, async filePath => {
      const content = await compileWithPostCss(files, filePath);

      removeTailwindConfig(files, filePath);

      files[filePath].contents = new Buffer(content);
    });

    next();
  };
}

export default plugin;
