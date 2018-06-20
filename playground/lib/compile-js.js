/* eslint-disable no-param-reassign, valid-jsdoc */
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import jsonfile from 'jsonfile';
import pify from 'pify';
import * as babel from 'babel-core';
import pMap from 'p-map';
const readJson = pify(jsonfile.readFile);
const readFile = pify(fs.readFile);

// Include JavaScript templates
async function includeTemplates(initialContent) {
  const lines = _.split(initialContent, '\n');

  const newContent = await pMap(lines, async line => {
    // Skip lines without a template
    if (!_.startsWith(line, '// include: ')) {
      return line;
    }

    const filename = line.split(': ')[1];
    const templateContent = await readFile(`./playground/includes/${filename}`);

    return templateContent;
  });

  return newContent.join('\n');
}

// This will replace {{apiKey}} and {{indexName}} with their real values
function interpolateVariables(initialContent, files, filePath) {
  const dirname = path.dirname(filePath);
  const metadata = files[`${dirname}/index.html`];
  let newContent = initialContent;
  newContent = newContent.replace('{{apiKey}}', metadata.apiKey);
  newContent = newContent.replace('{{indexName}}', metadata.indexName);
  newContent = newContent.replace(
    '{{inputPlaceholder}}',
    metadata.inputPlaceholder
  );

  return newContent;
}

async function compileWithBabel(content, pipeline, filePath) {
  const babelConfigPath = path.resolve('.babelrc');
  const babelConfig = await readJson(babelConfigPath);
  const fullPath = path.join(pipeline.directory(), pipeline.source(), filePath);
  const babelOptions = {
    ...babelConfig,
    filename: fullPath,
    filenameRelative: filePath,
    sourceMapTarget: filePath,
  };
  const result = babel.transform(content, babelOptions);
  return result.code;
}

/**
 * Compile JS through Babel
 **/
function plugin() {
  return async function compileJs(files, pipeline, next) {
    const jsFiles = _.filter(_.keys(files), filePath =>
      _.endsWith(filePath, '/search.js')
    );

    if (_.isEmpty(jsFiles)) {
      next();
      return;
    }

    await pMap(jsFiles, async filePath => {
      let content = files[filePath].contents.toString('utf-8');

      // We first include all the templates
      content = await includeTemplates(content);

      // We then update the placeholders
      content = interpolateVariables(content, files, filePath);

      // We finally compile trough Babel
      content = await compileWithBabel(content, pipeline, filePath);

      // We update the file
      files[filePath].contents = new Buffer(content);
    });

    next();
  };
}

export default plugin;
