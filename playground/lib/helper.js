import _ from 'lodash';
import pug from 'pug';
import fs from 'fs';
import path from 'path';
import $glob from 'glob';
import pify from 'pify';
const readFile = pify(fs.readFile);
const glob = pify($glob);

const helper = {
  glob,
  readFile,

  // Given a files list as given by metalsmith, will only return the path
  // matching the check method
  filterFiles(files, check) {
    return _.filter(_.keys(files), check);
  },

  pugToHtml(pugContent, data) {
    const pugOptions = {
      basedir: './playground/',
      ...data,
    };

    const content = pug.render(pugContent, pugOptions);

    return content;
  },

  // Find a file matching a specific pattern that is in the same folder and
  // returns its relative path
  async findSiblingFile(inputFile, pattern) {
    const dirname = _.get(inputFile, 'path.dir');
    const basedir = `./playground/src/${dirname}`;

    const matches = await glob(`${basedir}/${pattern}`);
    if (_.isEmpty(matches)) {
      return null;
    }
    const basename = path.basename(_.first(matches));
    return `./${basename}`;
  },
};

export default helper;
