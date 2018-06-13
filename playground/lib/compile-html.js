/* eslint-disable no-param-reassign, valid-jsdoc */
import pug from 'pug';
import fs from 'fs';
import pMap from 'p-map';
import pify from 'pify';
import _ from 'lodash';
const readFile = pify(fs.readFile);

function setDefaultMetadata(inputFile) {
  // Add default metadata
  const defaultMetadata = {
    layout: 'search.pug',
    apiKey: 'YOUR_API_KEY',
    indexName: 'YOUR_INDEX_NAME',
    cssClasses: {
      header: {
        wrapper: null,
      },
    },
  };
  const newFile = _.merge(defaultMetadata, inputFile);

  // Add .pug layout
  const layout = newFile.layout;
  if (!_.endsWith(layout, '.pug')) {
    newFile.layout = `${layout}.pug`;
  }

  return newFile;
}

async function convertToHtml(inputFile) {
  const layoutPath = `./playground/layouts/${inputFile.layout}`;
  const layoutContent = await readFile(layoutPath);

  const pugOptions = {
    basedir: './playground/',
    ...inputFile,
  };

  const content = pug.render(layoutContent, pugOptions);

  const newFile = inputFile;
  newFile.contents = new Buffer(content);

  return newFile;
}

/**
 * Transforms all pug files into HTML with wrapping layout
 **/
function plugin() {
  return async function compileHtml(files, pipeline, next) {
    const pugFiles = _.filter(_.keys(files), filePath =>
      _.endsWith(filePath, '.pug')
    );

    if (_.isEmpty(pugFiles)) {
      next();
      return;
    }

    await pMap(pugFiles, async filePath => {
      let file = files[filePath];

      // We first set all the default metadata
      file = setDefaultMetadata(file);

      // We convert to html
      file = await convertToHtml(file);

      // Set it as html version
      delete files[filePath];
      const htmlPath = filePath.replace('.pug', '.html');
      files[htmlPath] = file;
    });

    next();
  };
}

export default plugin;
