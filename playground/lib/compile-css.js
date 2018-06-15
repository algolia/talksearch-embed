/* eslint-disable no-param-reassign, valid-jsdoc */
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import autoprefixer from 'autoprefixer';
import pMap from 'p-map';
import pify from 'pify';
import $glob from 'glob';
import postcss from 'postcss';
import tailwind from 'tailwindcss';
const readFile = pify(fs.readFile);
const glob = pify($glob);

// Find local tailwind config file
function getTailwindConfigKey(filePath) {
  const dirname = path.dirname(filePath);
  return `${dirname}/tailwind.config.js`;
}

async function getFontDeclarations(filePath) {
  const dirname = path.dirname(filePath);
  const fontDir = path.resolve('./playground/src/', dirname, 'fonts');
  const fontFiles = await glob(`${fontDir}/*.woff`);
  if (_.isEmpty(fontFiles)) {
    return '';
  }

  const pathPattern = /^(.*)-(.*)\.woff/i;
  const weightValues = {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  };
  const fonts = [];
  const cssFontDeclarations = _.map(fontFiles, fontPath => {
    const basename = path.basename(fontPath);

    const [, fontName, fontWeightName] = basename.match(pathPattern);
    fonts.push(fontName);
    const fontWeight = weightValues[_.toLower(fontWeightName)];
    const declaration = `
      @font-face {
        font-family: ${fontName};
        font-style: normal;
        font-weight: ${fontWeight};
        src: url("./fonts/${basename}");
      }
    `;

    return declaration;
  });

  // Adding a classname to apply this font
  _.each(_.uniq(fonts), fontName => {
    const className = _.toLower(_.kebabCase(fontName));
    cssFontDeclarations.push(`.${className} { font-family: ${fontName} }`);
  });

  return cssFontDeclarations.join('\n');
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
  const fontContent = await getFontDeclarations(filePath);
  const isInRoot = !_.includes(filePath, '/');
  const content = isInRoot
    ? fileContent
    : `${baseContent}\n${fontContent}\n${fileContent}`;

  // Should purgecss to keep only what is really used by the page
  // Should add on top all the .ais- .ats-
  // And fonts

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
      try {
        const content = await compileWithPostCss(files, filePath);
        removeTailwindConfig(files, filePath);

        files[filePath].contents = new Buffer(content);
      } catch (err) {
        console.info(err.reason);
      }
    });

    next();
  };
}

export default plugin;
