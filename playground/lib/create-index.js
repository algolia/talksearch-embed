/* eslint-disable no-param-reassign, valid-jsdoc */
import _ from 'lodash';
import path from 'path';
import helper from './helper';

/**
 * Create a main file with links to all demos
 **/
function plugin() {
  return async function createIndex(files, pipeline, next) {
    const indexPug = files['index.pug'];

    const demoFiles = helper.filterFiles(files, filePath =>
      _.endsWith(filePath, '.html')
    );

    const demos = _.map(demoFiles, demoKey => {
      const demo = files[demoKey];
      const name = demo.conferenceName;
      const url = demo.path.dhref;
      const logo = path.join(url, demo.logoSmallPath);
      return { name, url, logo };
    });

    const pugContent = await helper.readFile('./playground/src/index.pug');
    const htmlContent = helper.pugToHtml(pugContent, { demos });

    files['index.html'] = {
      ...indexPug,
      contents: new Buffer(htmlContent),
    };
    delete files['index.pug'];

    next();
  };
}

export default plugin;
