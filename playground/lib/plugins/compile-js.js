/* eslint-disable no-param-reassign, valid-jsdoc */
import _ from 'lodash';
import path from 'path';
import jsonfile from 'jsonfile';
import pify from 'pify';
import * as babel from 'babel-core';
const readJson = pify(jsonfile.readFile);

/**
 * Compile JS through Babel
 **/
function plugin() {
  return async function compileJs(files, pipeline, next) {
    const babelConfigPath = path.normalize(`${__dirname}/../../../.babelrc`);
    const babelConfig = await readJson(babelConfigPath);

    const jsFiles = _.filter(_.keys(files), filePath =>
      _.endsWith(filePath, '.js')
    );

    if (_.isEmpty(jsFiles)) {
      next();
      return;
    }

    _.each(jsFiles, filePath => {
      const content = files[filePath].contents.toString('utf-8');
      const fullPath = path.join(
        pipeline.directory(),
        pipeline.source(),
        filePath
      );
      const babelOptions = {
        ...babelConfig,
        filename: fullPath,
        filenameRelative: filePath,
        sourceMapTarget: filePath,
      };
      const result = babel.transform(content, babelOptions);

      files[filePath].contents = new Buffer(result.code);
    });

    next();
  };
}

export default plugin;
