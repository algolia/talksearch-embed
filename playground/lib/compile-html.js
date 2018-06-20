/* eslint-disable no-param-reassign, valid-jsdoc */
import _ from 'lodash';
import helper from './helper';
import fs from 'fs';
import pMap from 'p-map';
import pify from 'pify';
const readFile = pify(fs.readFile);

// Set all default metadata of the file, avoiding boilerplate
async function setDefaultMetadata(inputFile) {
  // Add default metadata
  const defaultMetadata = {
    apiKey: 'YOUR_API_KEY',
    indexName: 'YOUR_INDEX_NAME',
    inputPlaceholder: 'Search by topic, year, speaker or any sentence',
  };
  const newFile = _.merge(defaultMetadata, inputFile);

  // Find the path to the logos
  defaultMetadata.logoPath = await helper.findSiblingFile(inputFile, 'logo.*');
  defaultMetadata.logoSmallPath = await helper.findSiblingFile(
    inputFile,
    'logo-small.*'
  );

  // Add .pug layout
  const layout = newFile.layout;
  if (!_.endsWith(layout, '.pug')) {
    newFile.layout = `${layout}.pug`;
  }

  return newFile;
}

async function convertToHtml(inputFile) {
  const layoutPath = `./playground/layouts/search.pug`;
  const layoutContent = await readFile(layoutPath);

  const htmlContent = helper.pugToHtml(layoutContent, inputFile);

  const newFile = inputFile;
  newFile.contents = new Buffer(htmlContent);

  return newFile;
}

/**
 * Transforms all pug files into HTML with wrapping layout
 **/
function plugin() {
  return async function compileHtml(files, pipeline, next) {
    const pugFiles = helper.filterFiles(
      files,
      filePath => _.endsWith(filePath, '.pug') && _.includes(filePath, '/')
    );

    if (_.isEmpty(pugFiles)) {
      next();
      return;
    }

    await pMap(pugFiles, async filePath => {
      let file = files[filePath];

      // We first set all the default metadata
      file = await setDefaultMetadata(file, filePath);

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
