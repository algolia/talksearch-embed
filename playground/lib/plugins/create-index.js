/* eslint-disable no-param-reassign, valid-jsdoc */
import _ from 'lodash';
import metalsmithMarkdown from 'metalsmith-markdown';
import metalsmithLayouts from 'metalsmith-layouts';
import pify from 'pify';

const markdown = pify(metalsmithMarkdown());
const layouts = pify(
  metalsmithLayouts({
    directory: './playground/layouts',
    default: 'search.pug',
    pattern: '**/*.html',
    engineOptions: {
      pretty: true,
    },
  })
);

function addMissingLayoutSuffix(files) {
  _.each(files, (data, path) => {
    const layout = _.get(data, 'layout');
    if (!layout) {
      return;
    }

    if (!_.endsWith(layout, '.pug')) {
      files[path].layout = `${layout}.pug`;
    }
  });
}

/**
 * Create an index file with links to all demos
 **/
function plugin() {
  return async function createIndex(files, pipeline, next) {
    // Find all demos
    const demos = _.filter(files, (value, path) =>
      _.endsWith(path, '/index.md')
    );
    // Find the index main page
    const index = files['index.md'];

    index.conferenceList = _.map(demos, demo => ({
      url: demo.path.dhref,
      name: demo.conferenceName,
    }));

    next();
  };
}

export default plugin;
