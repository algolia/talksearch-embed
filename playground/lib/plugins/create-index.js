/* eslint-disable no-param-reassign, valid-jsdoc */
import _ from 'lodash';

/**
 * Create an index file with links to all demos
 **/
function plugin() {
  return function createIndex(files, pipeline, next) {
    // Find all demos
    const demos = _.filter(files, (value, path) =>
      _.endsWith(path, '/index.pug')
    );
    // Find the index main page
    const index = files['index.pug'];

    index.conferenceList = _.map(demos, demo => ({
      url: demo.path.dhref,
      name: demo.conferenceName,
    }));

    next();
  };
}

export default plugin;
