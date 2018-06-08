import _ from 'lodash';
import chalk from 'chalk';
import stringify from 'json-stable-stringify';

function plugin() {
  return function debug(files, pipeline, next) {
    _.each(files, (rawData, path) => {
      console.info(chalk.yellow(path));
      const contents = rawData.contents.toString('utf-8');
      const metadata = {
        ...rawData,
        contents,
      };
      delete metadata.stats;

      const content = stringify(metadata, { space: 2 });
      console.info(content);
    });
    next();
  };
}

export default plugin;
